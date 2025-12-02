# Getting Started

Get bytefreezer up and running in minutes. Choose your deployment model based on your requirements.

## Deployment Options

### On-site (Self-Hosted)

Full control with deployment in your datacenter.

- **Air-gapped:** No external dependencies
- **Storage:** MinIO, Ceph, or local S3-compatible
- **Install:** Kubernetes, Docker, or bare metal
- **Data residency:** Never leaves your premises
- **Best for:** Regulated industries, government, high security

### Cloud (Managed)

We handle infrastructure, you own the data.

- **Managed platform:** We handle infrastructure
- **Storage:** Your AWS S3, Backblaze, Cloudflare R2
- **Setup:** Sign up, configure bucket, start collecting
- **10 minutes:** From signup to data ingestion
- **Zero-knowledge:** We never custody your data
- **Best for:** Startups, SMBs, fast deployment

### Hybrid

Best of both worlds.

- **Proxy on-site:** Collect sensitive data locally
- **Storage:** Your bucket (cloud or on-prem)
- **Query anywhere:** Cloud AI or local SQL
- **Compliance:** Data residency with cloud flexibility
- **Best for:** Enterprises, multi-cloud, compliance needs

---

## Quick Start with Docker

```bash
# Pull the latest image
docker pull bytefreezer/proxy:latest

# Run with environment variables
docker run -d \
  --name bytefreezer-proxy \
  -p 514:514/udp \
  -p 514:514/tcp \
  -e BF_STORAGE_ENDPOINT=s3.amazonaws.com \
  -e BF_STORAGE_BUCKET=your-bucket-name \
  -e BF_STORAGE_ACCESS_KEY=your-access-key \
  -e BF_STORAGE_SECRET_KEY=your-secret-key \
  -e BF_RETENTION_DAYS=30 \
  bytefreezer/proxy:latest
```

## Quick Start with Kubernetes

```bash
# Add bytefreezer Helm repository
helm repo add bytefreezer https://charts.bytefreezer.io
helm repo update

# Install with custom values
helm install bytefreezer bytefreezer/proxy \
  --set storage.endpoint=s3.amazonaws.com \
  --set storage.bucket=your-bucket-name \
  --set storage.accessKey=your-access-key \
  --set storage.secretKey=your-secret-key \
  --set retention.days=30
```

---

## Storage Provider Setup

### AWS S3

1. Create an S3 bucket in your preferred region
2. Create an IAM user with S3 access
3. Generate access keys
4. Configure bytefreezer with endpoint: `s3.amazonaws.com`

### MinIO (On-Premises)

1. Deploy MinIO cluster
2. Create a bucket for bytefreezer
3. Configure with `path_style: true`
4. Use your MinIO endpoint URL

### Backblaze B2

1. Create a B2 bucket
2. Generate application key
3. Use endpoint: `s3.us-west-002.backblazeb2.com` (varies by region)

### Cloudflare R2

1. Create R2 bucket in Cloudflare dashboard
2. Generate R2 API token
3. Use your R2 endpoint URL

---

## Verify Installation

```bash
# Check proxy is running
docker logs bytefreezer-proxy

# Send a test syslog message
echo "<14>Test message from bytefreezer" | nc -u localhost 514

# Check S3 bucket for Parquet files (wait ~60 seconds)
aws s3 ls s3://your-bucket-name/
```

---

## Next Steps

- [Configuration Reference](configuration.md) - Full configuration options
- [Architecture](architecture.md) - Understand how bytefreezer works
- [GitHub Repository](https://github.com/n0needt0/bytefreezer) - Source code and examples
