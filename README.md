# ByteFreezer Website

Public documentation website for ByteFreezer, built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

## Overview

This repository contains the source for the ByteFreezer documentation website at [bytefreezer.github.io](https://bytefreezer.github.io).

## Local Development

### Prerequisites

- Python 3.8+
- pip

### Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Running Locally

```bash
mkdocs serve
```

Visit `http://localhost:8000` to view the documentation.

### Building

```bash
mkdocs build
```

The built site will be in the `site/` directory.

## Structure

```
website/
├── docs/                   # Documentation source (Markdown)
│   ├── index.md           # Home page
│   ├── getting-started.md # Getting started guide
│   ├── configuration.md   # Configuration reference
│   └── architecture.md    # Architecture overview
├── assets/                # Static assets (images, CSS, JS)
├── overrides/             # MkDocs theme customizations
├── mkdocs.yml             # MkDocs configuration
└── requirements.txt       # Python dependencies
```

## Deployment

Documentation is automatically deployed to GitHub Pages on push to `main` branch via GitHub Actions workflow in `.github/workflows/`.

## Contributing

1. Fork this repository
2. Create a branch for your changes
3. Make edits in the `docs/` directory
4. Test locally with `mkdocs serve`
5. Submit a pull request

## License

ByteFreezer is licensed under the [Elastic License 2.0](LICENSE.txt).

You're free to use, modify, and self-host. You cannot offer it as a managed service.
