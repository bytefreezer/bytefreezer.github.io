# Architecture

bytefreezer is designed as a modular, scalable data pipeline for security data collection, storage, and analysis.

## Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│ Data Sources│ ──> │  bytefreezer │ ──> │ Your Storage│
│             │     │    Proxy     │     │   (S3)      │
└─────────────┘     └──────────────┘     └─────────────┘
                                                │
                    ┌───────────────────────────┼───────────────────────────┐
                    │                           │                           │
                    ▼                           ▼                           ▼
             ┌─────────────┐            ┌─────────────┐            ┌─────────────┐
             │  AI Agent   │            │  SQL Query  │            │    Data     │
             │   (BYOA)    │            │  (DuckDB)   │            │ Marketplace │
             └─────────────┘            └─────────────┘            └─────────────┘
```

## Components

### 1. bytefreezer Proxy

The proxy is the core data collection component.

**Responsibilities:**

- Accept data from multiple sources (syslog, NetFlow, Kafka, etc.)
- Parse and normalize incoming data
- Apply transformations and enrichments
- Compress data using ZSTD
- Write Parquet files to S3-compatible storage
- Maintain metadata catalog

**Deployment:**

- Docker container or Kubernetes pod
- Stateless design for horizontal scaling
- Local buffer for network resilience

### 2. Storage Layer (BYOB)

You provide and control the storage.

**Supported Providers:**

| Provider | Type | Notes |
|----------|------|-------|
| AWS S3 | Cloud | Best compatibility, global |
| MinIO | Self-hosted | Recommended for on-prem |
| Backblaze B2 | Cloud | S3-compatible, cost-effective |
| Cloudflare R2 | Cloud | Zero egress fees |
| Wasabi | Cloud | No egress fees |

**Data Format:**

- Apache Parquet (columnar)
- ZSTD compression
- Partitioned by date/hour
- Standard schema evolution

### 3. Metadata Catalog

Automatic schema and partition tracking.

- Schema detection and evolution
- Partition discovery
- Statistics collection
- Query optimization hints

### 4. Query Layer

Multiple options for data access.

**AI Agent (BYOA):**

- Natural language queries
- OpenAI, Claude, Gemini, or local LLMs
- Context-aware responses
- Timeline reconstruction

**SQL Query:**

- DuckDB: In-process, blazing fast
- ClickHouse: Real-time OLAP
- AWS Athena: Serverless
- Spark: Batch processing

**Integrations:**

- Grafana dashboards
- Jupyter notebooks
- Pandas/PyArrow
- Any Parquet-compatible tool

---

## Data Flow

### 1. Collection

Data arrives via configured sources:

```
Syslog (UDP/TCP 514)  ──┐
NetFlow (UDP 2055)    ──┼──> bytefreezer Proxy
Kafka (TCP 9092)      ──┤
HTTP Webhooks         ──┘
```

### 2. Processing

Proxy transforms incoming data:

1. **Parse:** Extract fields based on source type
2. **Normalize:** Standardize timestamps, IPs, etc.
3. **Enrich:** Add GeoIP, DNS, threat intel
4. **Filter:** Drop unwanted events
5. **Batch:** Group events for efficient storage

### 3. Storage

Data written to S3 in optimized format:

```
s3://your-bucket/
├── data/
│   ├── 2024/
│   │   ├── 01/
│   │   │   ├── 15/
│   │   │   │   ├── 00/
│   │   │   │   │   ├── data-00001.parquet
│   │   │   │   │   └── data-00002.parquet
│   │   │   │   └── 01/
│   │   │   │       └── ...
└── metadata/
    ├── schema.json
    └── partitions.json
```

### 4. Query

Users query via AI or SQL:

```
"Show failed SSH attempts from international IPs last week"
                    │
                    ▼
         ┌────────────────────┐
         │  AI Integration    │
         │  Layer             │
         └────────────────────┘
                    │
                    ▼
         ┌────────────────────┐
         │  Metadata Catalog  │
         │  (partition/schema)│
         └────────────────────┘
                    │
                    ▼
         ┌────────────────────┐
         │  Query Engine      │
         │  (DuckDB/Athena)   │
         └────────────────────┘
                    │
                    ▼
         ┌────────────────────┐
         │  S3 Parquet Files  │
         └────────────────────┘
```

---

## Scaling

### Horizontal Scaling

Deploy multiple proxy instances behind a load balancer:

```
                    ┌─────────────────┐
                    │  Load Balancer  │
                    └─────────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
         ▼                  ▼                  ▼
  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
  │   Proxy 1   │    │   Proxy 2   │    │   Proxy 3   │
  └─────────────┘    └─────────────┘    └─────────────┘
         │                  │                  │
         └──────────────────┼──────────────────┘
                            │
                            ▼
                    ┌─────────────────┐
                    │    S3 Bucket    │
                    └─────────────────┘
```

### Performance

- Single proxy: 100K events/sec
- 10 proxies: 1M events/sec
- Linear scaling with additional instances

### Storage Tiers

```
Hot (0-7 days)    → S3 Standard     → $0.023/GB
Warm (7-30 days)  → S3 IA           → $0.0125/GB
Cold (30+ days)   → S3 Glacier      → $0.004/GB
```

---

## Security

### Data Protection

- **In-transit:** TLS 1.3 for all connections
- **At-rest:** S3 server-side encryption (SSE-S3, SSE-KMS)
- **Integrity:** S3 Object Lock for immutable logs

### Access Control

- IAM policies for S3 bucket access
- No bytefreezer access to your data (BYOB)
- Audit logging for all operations

### Compliance

- **HIPAA:** BAA available for Enterprise
- **SOC2:** Audit trail support
- **PCI-DSS:** Meets Requirement 10
- **GDPR:** Data residency controls

---

## High Availability

### Proxy HA

- Stateless design
- Multiple replicas
- Health checks and auto-restart
- Local buffering during outages

### Storage HA

- S3 provides 99.999999999% durability
- Cross-region replication available
- MinIO supports erasure coding

### Recovery

- Buffer-to-disk during S3 outages
- Automatic retry with backoff
- No data loss architecture
