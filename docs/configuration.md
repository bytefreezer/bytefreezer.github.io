# Configuration Reference

Complete configuration options for bytefreezer proxy and components.

## Configuration File

bytefreezer uses YAML configuration. Default location: `/etc/bytefreezer/config.yaml`

```yaml
# bytefreezer Proxy Configuration
server:
  listen: "0.0.0.0:514"
  protocols:
    - udp
    - tcp

# S3-compatible storage
storage:
  type: s3
  endpoint: s3.amazonaws.com  # or minio.example.com
  bucket: security-logs
  region: us-east-1
  access_key: ${BF_ACCESS_KEY}
  secret_key: ${BF_SECRET_KEY}
  path_style: false  # true for MinIO

# Data processing
processing:
  compression: zstd
  format: parquet
  batch_size: 10000
  flush_interval: 60s

# Retention policy
retention:
  days: 30
  glacier_after: 7  # Move to cold storage after 7 days

# Data sources
sources:
  - name: syslog
    type: syslog
    port: 514

  - name: netflow
    type: netflow
    port: 2055

  - name: kafka
    type: kafka
    brokers:
      - kafka1.example.com:9092
    topics:
      - security-events
```

---

## Environment Variables

All configuration options can be overridden with environment variables.

| Variable | Description | Default |
|----------|-------------|---------|
| `BF_STORAGE_ENDPOINT` | S3 endpoint URL | `s3.amazonaws.com` |
| `BF_STORAGE_BUCKET` | S3 bucket name | (required) |
| `BF_STORAGE_ACCESS_KEY` | S3 access key | (required) |
| `BF_STORAGE_SECRET_KEY` | S3 secret key | (required) |
| `BF_STORAGE_REGION` | S3 region | `us-east-1` |
| `BF_STORAGE_PATH_STYLE` | Use path-style URLs | `false` |
| `BF_RETENTION_DAYS` | Data retention period | `30` |
| `BF_COMPRESSION` | Compression algorithm | `zstd` |
| `BF_BATCH_SIZE` | Events per batch | `10000` |
| `BF_FLUSH_INTERVAL` | Batch flush interval | `60s` |

---

## Storage Configuration

### AWS S3

```yaml
storage:
  type: s3
  endpoint: s3.amazonaws.com
  bucket: my-security-logs
  region: us-east-1
  access_key: ${AWS_ACCESS_KEY_ID}
  secret_key: ${AWS_SECRET_ACCESS_KEY}
  path_style: false
```

### MinIO

```yaml
storage:
  type: s3
  endpoint: minio.example.com:9000
  bucket: security-logs
  access_key: ${MINIO_ACCESS_KEY}
  secret_key: ${MINIO_SECRET_KEY}
  path_style: true  # Required for MinIO
  use_ssl: true
```

### Backblaze B2

```yaml
storage:
  type: s3
  endpoint: s3.us-west-002.backblazeb2.com
  bucket: my-bucket
  access_key: ${B2_APPLICATION_KEY_ID}
  secret_key: ${B2_APPLICATION_KEY}
  path_style: false
```

### Cloudflare R2

```yaml
storage:
  type: s3
  endpoint: ${ACCOUNT_ID}.r2.cloudflarestorage.com
  bucket: my-bucket
  access_key: ${R2_ACCESS_KEY}
  secret_key: ${R2_SECRET_KEY}
  path_style: false
```

---

## Data Source Configuration

### Syslog (RFC 3164/5424)

```yaml
sources:
  - name: syslog-udp
    type: syslog
    port: 514
    protocol: udp

  - name: syslog-tcp
    type: syslog
    port: 514
    protocol: tcp
    tls:
      enabled: true
      cert: /etc/bytefreezer/certs/server.crt
      key: /etc/bytefreezer/certs/server.key
```

### NetFlow / IPFIX

```yaml
sources:
  - name: netflow-v5
    type: netflow
    port: 2055
    version: 5

  - name: ipfix
    type: ipfix
    port: 4739
```

### Kafka

```yaml
sources:
  - name: kafka-events
    type: kafka
    brokers:
      - kafka1.example.com:9092
      - kafka2.example.com:9092
    topics:
      - security-events
      - application-logs
    consumer_group: bytefreezer
    sasl:
      enabled: true
      mechanism: SCRAM-SHA-512
      username: ${KAFKA_USER}
      password: ${KAFKA_PASSWORD}
```

---

## Processing Options

### Compression

```yaml
processing:
  compression: zstd  # Options: zstd, gzip, snappy, none
  compression_level: 3  # 1-19 for zstd
```

### Batching

```yaml
processing:
  batch_size: 10000  # Events per batch
  flush_interval: 60s  # Max time before flush
  max_batch_bytes: 100MB  # Max batch size
```

### Schema Detection

```yaml
processing:
  schema:
    auto_detect: true
    evolve: true  # Allow schema changes
    sample_size: 1000  # Events to sample for detection
```

---

## AI Integration

Configure AI providers for natural language queries.

```yaml
ai:
  provider: openai  # Options: openai, anthropic, google, local
  api_key: ${OPENAI_API_KEY}
  model: gpt-4-turbo

  # For local LLMs
  # provider: local
  # endpoint: http://localhost:11434/v1
  # model: llama2
```

---

## Troubleshooting

### Problem: Proxy not receiving data

- Check firewall rules (UDP/TCP port 514)
- Verify syslog source configuration
- Run: `tcpdump -i any port 514` to verify traffic
- Check logs: `docker logs bytefreezer-proxy`

### Problem: S3 upload failures

- Verify S3 credentials and bucket permissions
- Check bucket policy allows PutObject
- For MinIO: ensure `path_style: true`
- Test with: `aws s3 ls s3://your-bucket`

### Problem: High memory usage

- Reduce `batch_size` in config (default: 10000)
- Decrease `flush_interval` for faster writes
- Set resource limits in Docker/K8s
- Monitor with: `docker stats bytefreezer-proxy`

### Problem: Data not appearing in queries

- Wait for `flush_interval` (default: 60s)
- Check S3 bucket for Parquet files
- Verify metadata catalog generation
- Refresh metadata: `bytefreezer catalog refresh`
