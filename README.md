# ByteFreezer Website

The official website for ByteFreezer - an open-source, scalable data lake platform for processing NDJSON files into optimized Parquet format.

## 🌟 Features

- **Modern Design**: Responsive, accessible design with smooth animations
- **Comprehensive Documentation**: Complete guides and API references
- **Performance Optimized**: Lightweight, fast-loading with excellent Core Web Vitals
- **SEO Friendly**: Structured data, meta tags, and semantic HTML
- **Developer Focused**: Code examples, getting started guides, and interactive elements

## 🚀 Quick Start

### Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/n0needt0/bytefreezer.git
   cd bytefreezer/bytefreezer-website
   ```

2. **Serve locally**
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Production Deployment

#### Using Docker

```bash
# Build the image
docker build -t bytefreezer-website .

# Run the container
docker run -p 80:80 bytefreezer-website
```

#### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# With monitoring stack
docker-compose --profile monitoring up -d

# With reverse proxy
docker-compose --profile proxy up -d
```

## 📁 Project Structure

```
bytefreezer-website/
├── assets/
│   ├── css/
│   │   ├── main.css          # Main stylesheet
│   │   └── docs.css          # Documentation styles
│   ├── js/
│   │   ├── main.js           # Main JavaScript
│   │   └── docs.js           # Documentation JavaScript
│   └── images/
│       ├── logo.svg          # ByteFreezer logo
│       └── favicon.svg       # Favicon
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD pipeline
├── index.html                # Homepage
├── docs.html                 # Documentation page
├── docker-compose.yml        # Multi-service deployment
├── Dockerfile               # Production container
└── README.md               # This file
```

## 🎨 Design System

### Colors

- **Primary**: `#2563eb` (Blue)
- **Accent**: `#06b6d4` (Cyan)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Orange)
- **Error**: `#ef4444` (Red)

### Typography

- **Font Family**: Inter (fallback to system fonts)
- **Sizes**: Responsive scale from 0.75rem to 3rem
- **Weights**: 300, 400, 500, 600, 700

### Components

- **Buttons**: Primary, secondary with hover effects
- **Cards**: Feature cards, service cards with shadows
- **Code blocks**: Syntax highlighted with copy functionality
- **Navigation**: Fixed header with smooth scrolling

## 🔧 Configuration

### Environment Variables

```bash
# Docker configuration
NGINX_WORKER_PROCESSES=auto
NGINX_WORKER_CONNECTIONS=1024

# SSL/HTTPS (if using Traefik)
LETSENCRYPT_EMAIL=admin@bytefreezer.org
DOMAIN=bytefreezer.org
```

### Nginx Configuration

The production Docker image includes optimized Nginx configuration with:

- **Compression**: Gzip and Brotli compression
- **Caching**: Optimized cache headers for static assets
- **Security**: Security headers and access controls
- **Performance**: Efficient file serving and keepalive

### Monitoring

Optional monitoring stack includes:

- **Prometheus**: Metrics collection
- **Grafana**: Metrics visualization
- **Nginx logs**: Access and error logging
- **Health checks**: Container and application health

## 🚦 Performance

### Lighthouse Scores

The website is optimized for excellent Core Web Vitals:

- **Performance**: 95+ (Target: 90+)
- **Accessibility**: 100 (Target: 95+)
- **Best Practices**: 100 (Target: 90+)
- **SEO**: 100 (Target: 95+)

### Optimization Features

- **Image Optimization**: SVG logos, optimized assets
- **Code Splitting**: Separate CSS/JS for docs
- **Compression**: Pre-compressed assets in Docker
- **CDN Ready**: Proper cache headers for CDN deployment
- **Lazy Loading**: Progressive image and content loading

## 🔒 Security

### Security Headers

- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer-when-downgrade`
- `Content-Security-Policy: default-src 'self'...`

### Container Security

- Non-root user execution
- Read-only filesystem where possible
- Security scanning with Trivy
- Minimal base image (Alpine)

## 🚀 Deployment

### CI/CD Pipeline

The GitHub Actions workflow provides:

1. **Testing**: HTML validation, Lighthouse audits
2. **Building**: Multi-platform Docker builds
3. **Security**: Vulnerability scanning
4. **Staging**: Automatic staging deployment
5. **Production**: Manual production deployment with approvals

### Hosting Options

#### Static Hosting
- **GitHub Pages**: Direct deployment from repository
- **Netlify**: Continuous deployment with forms
- **Vercel**: Optimized for static sites
- **AWS S3 + CloudFront**: Scalable with CDN

#### Container Hosting
- **Docker**: Self-hosted with reverse proxy
- **Kubernetes**: Scalable orchestration
- **AWS ECS/Fargate**: Managed containers
- **Google Cloud Run**: Serverless containers

### DNS and SSL

For production deployment:

1. **DNS**: Point domain to hosting provider
2. **SSL**: Let's Encrypt via Traefik or hosting provider
3. **CDN**: CloudFront, Cloudflare, or similar
4. **Monitoring**: Health checks and uptime monitoring

## 🧪 Testing

### Manual Testing

```bash
# HTML validation
html-validate index.html docs.html

# Lighthouse audit
lighthouse http://localhost:8000 --view

# Accessibility testing
axe-core http://localhost:8000

# Performance testing
webpagetest.org
```

### Automated Testing

The CI pipeline includes:
- HTML validation
- Lighthouse performance audits
- Security vulnerability scanning
- Container health checks

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-section`
3. **Make changes**: Update HTML, CSS, or documentation
4. **Test locally**: Ensure all pages load correctly
5. **Submit a pull request**: Describe changes and include screenshots

### Content Guidelines

- **Accuracy**: Keep technical information current
- **Accessibility**: Ensure WCAG compliance
- **Performance**: Optimize images and assets
- **Consistency**: Follow existing design patterns

## 📈 Analytics and Monitoring

### Web Analytics

To add analytics, include tracking code in `assets/js/main.js`:

```javascript
// Example: Google Analytics
gtag('config', 'GA_MEASUREMENT_ID');

// Example: Plausible Analytics
plausible('page');
```

### Application Monitoring

- **Health endpoints**: `/health` for uptime monitoring
- **Performance monitoring**: Core Web Vitals tracking
- **Error tracking**: JavaScript error reporting
- **Uptime monitoring**: External service monitoring

## 📝 License

This website is part of the ByteFreezer project and follows the same open-source license.

---

## 🌐 Live Website

Visit the live website at: [https://bytefreezer.org](https://bytefreezer.org)

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/n0needt0/bytefreezer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/n0needt0/bytefreezer/discussions)
- **Documentation**: [Full Documentation](https://bytefreezer.org/docs.html)