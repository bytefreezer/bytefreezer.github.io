---
hide:
  - navigation
  - toc
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<style>
/* Hero Section */
.md-main__inner { margin: 0; padding: 0; }
.md-content__inner { margin: 0; padding: 0; max-width: none; }

.hero {
  background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
  padding: 6rem 2rem;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 136, 255, 0.1);
  border: 1px solid rgba(0, 136, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  color: #0088ff;
  margin-bottom: 1.5rem;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #fff 0%, #0088ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #8b949e;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background: #0066cc;
  color: #fff !important;
}

.btn-primary:hover {
  background: #004499;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  border: 1px solid #30363d;
  color: #c9d1d9;
}

.btn-secondary:hover {
  border-color: #0088ff;
  color: #0088ff;
}

/* Value Props */
.value-props {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.value-prop {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
  padding: 1.5rem;
  background: rgba(22, 27, 34, 0.8);
  border: 1px solid #30363d;
  border-radius: 0.5rem;
}

.value-prop-icon {
  font-size: 1.5rem;
  color: #0088ff;
}

.value-prop h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  color: #c9d1d9;
}

.value-prop p {
  margin: 0;
  font-size: 0.875rem;
  color: #8b949e;
}

/* Stats */
.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0088ff;
}

.stat-label {
  font-size: 0.875rem;
  color: #8b949e;
}

/* Sections */
.section {
  padding: 5rem 2rem;
}

.section-dark {
  background: #161b22;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #c9d1d9;
}

.section-header p {
  font-size: 1.125rem;
  color: #8b949e;
  max-width: 600px;
  margin: 0 auto;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 0.75rem;
  padding: 2rem;
  transition: border-color 0.2s;
}

.card:hover {
  border-color: #0088ff;
}

.card-icon {
  font-size: 2.5rem;
  color: #0088ff;
  margin-bottom: 1rem;
}

.card h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #c9d1d9;
}

.card p {
  color: #8b949e;
  line-height: 1.6;
}

.card ul {
  color: #8b949e;
  padding-left: 1.25rem;
  line-height: 1.8;
}

/* Pricing */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-card {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
}

.pricing-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #c9d1d9;
}

.pricing-card .price {
  font-size: 2rem;
  font-weight: 700;
  color: #0088ff;
  margin-bottom: 1.5rem;
}

.pricing-card ul {
  text-align: left;
  color: #8b949e;
  padding-left: 1.25rem;
  line-height: 1.8;
}

/* CTA */
.cta {
  background: linear-gradient(135deg, #0088ff 0%, #0066cc 100%);
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.cta h2 {
  color: #fff;
  margin-bottom: 1rem;
}

.cta p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

/* Footer */
.landing-footer {
  background: #0d1117;
  padding: 3rem 2rem;
  text-align: center;
  border-top: 1px solid #30363d;
}

.landing-footer p {
  color: #8b949e;
}

.landing-footer a {
  color: #0088ff;
}

/* Responsive */
@media (max-width: 768px) {
  .hero h1 { font-size: 2.5rem; }
  .hero-stats { gap: 2rem; }
  .value-props { grid-template-columns: 1fr; }
}
</style>

<div class="hero">
  <div class="hero-badge">
    <i class="fas fa-video"></i> Open Source Security DVR + AI Forensics
  </div>

  <h1>Your Data. Your Storage. Your AI.</h1>

  <p class="hero-subtitle">
    Record everything. Store in your own S3-compatible bucket (AWS S3, MinIO, Backblaze, Cloudflare R2). Query with any AI agent when you need answers. Flexible retention (7-365+ days). Complete forensics at a fraction of traditional SIEM costs.
  </p>

  <div class="hero-buttons">
    <a href="getting-started/" class="btn btn-primary">
      <i class="fas fa-rocket"></i> Get Started
    </a>
    <a href="https://github.com/bytefreezer/bytefreezer" class="btn btn-secondary" target="_blank">
      <i class="fab fa-github"></i> GitHub
    </a>
  </div>

  <div class="value-props">
    <div class="value-prop">
      <div class="value-prop-icon"><i class="fas fa-database"></i></div>
      <div>
        <h3>BYOB: Bring Your Own Bucket</h3>
        <p>S3-compatible storage - you control the data</p>
      </div>
    </div>
    <div class="value-prop">
      <div class="value-prop-icon"><i class="fas fa-robot"></i></div>
      <div>
        <h3>BYOA: Bring Your Own Agent</h3>
        <p>OpenAI, Claude, Gemini, or local LLMs</p>
      </div>
    </div>
    <div class="value-prop">
      <div class="value-prop-icon"><i class="fas fa-calendar"></i></div>
      <div>
        <h3>Flexible Retention</h3>
        <p>7 days to perpetual - choose what you need</p>
      </div>
    </div>
  </div>

  <div class="hero-stats">
    <div class="stat">
      <div class="stat-number">Open Source</div>
      <div class="stat-label">MIT License</div>
    </div>
    <div class="stat">
      <div class="stat-number">BYOB + BYOA</div>
      <div class="stat-label">Your Bucket, Your AI</div>
    </div>
    <div class="stat">
      <div class="stat-number">7-365+</div>
      <div class="stat-label">Days Retention</div>
    </div>
  </div>
</div>

<div class="section section-dark">
  <div class="section-header">
    <h2>The Problem: Post-Breach Forensics</h2>
    <p>When a breach is discovered weeks later, you need to reconstruct what happened</p>
  </div>

  <div class="cards-grid">
    <div class="card">
      <div class="card-icon"><i class="fas fa-exclamation-circle"></i></div>
      <h3>Traditional SIEMs Are Expensive</h3>
      <p>Enterprise SIEM solutions cost $1M+ annually. Splunk charges $150/GB, Datadog has complex per-host pricing. These costs make comprehensive logging prohibitive.</p>
    </div>
    <div class="card">
      <div class="card-icon"><i class="fas fa-lock"></i></div>
      <h3>Vendor Controls Your Data</h3>
      <p>Your security data lives in vendor infrastructure. You pay for retention, pay for queries, pay for exports. When you want to leave, migration is painful and expensive.</p>
    </div>
    <div class="card">
      <div class="card-icon"><i class="fas fa-calendar-times"></i></div>
      <h3>Limited Retention Windows</h3>
      <p>Cost-prohibitive retention means you can only afford 7-30 days. When sophisticated attacks are discovered months later, the evidence is already gone.</p>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-header">
    <h2>The Solution: Security DVR</h2>
    <p>Think security camera DVR, but for all your operational data</p>
  </div>

  <div class="cards-grid">
    <div class="card">
      <div class="card-icon"><i class="fas fa-database"></i></div>
      <h3>BYOB: Bring Your Own Bucket</h3>
      <ul>
        <li>Data written directly to <strong>your S3-compatible storage</strong></li>
        <li>AWS S3, MinIO, Backblaze B2, Cloudflare R2, Wasabi</li>
        <li>You control it. You own it. <strong>No vendor markup.</strong></li>
        <li>Perfect for compliance: HIPAA, SOC2, PCI-DSS, GDPR</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-icon"><i class="fas fa-robot"></i></div>
      <h3>BYOA: Bring Your Own Agent</h3>
      <ul>
        <li><strong>Just add your API key:</strong> OpenAI, Claude, Gemini, local LLMs</li>
        <li>ByteFreezer provides integration layer (metadata, optimization, context)</li>
        <li>Ask questions in natural language, get answers from complete history</li>
        <li>Switch AI providers anytime - no vendor lock-in</li>
      </ul>
    </div>
    <div class="card">
      <div class="card-icon"><i class="fas fa-calendar-check"></i></div>
      <h3>Flexible Everything</h3>
      <ul>
        <li><strong>Retention:</strong> 7, 30, 90, 365 days, or perpetual</li>
        <li><strong>Storage:</strong> S3 Standard ($4/TB) or Glacier ($0.40/TB)</li>
        <li><strong>Format:</strong> Standard Parquet - query with any tool</li>
        <li>Leave ByteFreezer anytime - data stays accessible forever</li>
      </ul>
    </div>
  </div>
</div>

<div class="section section-dark">
  <div class="section-header">
    <h2>Pricing</h2>
    <p>Transparent pricing. Deploy yourself (free) or use our hosted platform.</p>
  </div>

  <div class="pricing-grid">
    <div class="pricing-card">
      <h3>Free Forever</h3>
      <div class="price">$0/month</div>
      <ul>
        <li>1TB/month ingestion</li>
        <li>Store in your own bucket</li>
        <li>Self-hosted proxy</li>
        <li>7-30 day retention</li>
        <li>Community support</li>
      </ul>
    </div>
    <div class="pricing-card">
      <h3>Starter</h3>
      <div class="price">$199/month</div>
      <ul>
        <li>20TB/month included</li>
        <li>Shared data plane</li>
        <li>AI query access (BYOA)</li>
        <li>7-90 day retention</li>
        <li>Email support</li>
      </ul>
    </div>
    <div class="pricing-card">
      <h3>Professional</h3>
      <div class="price">$499/month</div>
      <ul>
        <li>50TB/month included</li>
        <li>Managed proxy option</li>
        <li>Priority support & SLA</li>
        <li>7-365 day retention</li>
        <li>Advanced integrations</li>
      </ul>
    </div>
    <div class="pricing-card">
      <h3>Enterprise</h3>
      <div class="price">Custom</div>
      <ul>
        <li>Unlimited ingestion</li>
        <li>Cross-region support</li>
        <li>On-premises K8s</li>
        <li>Dedicated support</li>
        <li>Perpetual retention</li>
      </ul>
    </div>
  </div>
</div>

<div class="section">
  <div class="cta">
    <h2>Ready to get started?</h2>
    <p>Deploy ByteFreezer in minutes and start recording your security data.</p>
    <a href="getting-started/" class="btn btn-primary" style="background: #fff; color: #0088ff;">
      <i class="fas fa-rocket"></i> Get Started Now
    </a>
  </div>
</div>

<div class="landing-footer">
  <p>&copy; 2024 ByteFreezer. Open source under <a href="https://github.com/bytefreezer/bytefreezer/blob/main/LICENSE">MIT License</a>.</p>
  <p>Your data. Your storage. Your AI.</p>
</div>
