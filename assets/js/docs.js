// Licensed under Elastic License 2.0
// See LICENSE.txt for details

// Documentation-specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeSidebarNavigation();
    initializeSearchHighlight();
    initializeTableOfContents();
    initializeSmoothScrolling();
});

// Sidebar Navigation
function initializeSidebarNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.doc-section');
    
    // Set active link based on scroll position
    function setActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll listener
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(setActiveLink, 50);
    });
    
    // Set initial active link
    setActiveLink();
}

// Search and Highlight
function initializeSearchHighlight() {
    // Add search functionality if URL has search params
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    
    if (searchTerm) {
        highlightSearchTerm(searchTerm);
    }
}

function highlightSearchTerm(term) {
    const walker = document.createTreeWalker(
        document.querySelector('.docs-main'),
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${term})`, 'gi');
        
        if (regex.test(text)) {
            const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
            const wrapper = document.createElement('span');
            wrapper.innerHTML = highlightedText;
            textNode.parentNode.replaceChild(wrapper, textNode);
        }
    });
    
    // Add search highlight styles
    const style = document.createElement('style');
    style.textContent = `
        .search-highlight {
            background-color: yellow;
            padding: 2px 4px;
            border-radius: 3px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

// Auto-generated Table of Contents
function initializeTableOfContents() {
    const headings = document.querySelectorAll('.doc-section h2, .doc-section h3');
    
    if (headings.length === 0) return;
    
    const tocContainer = document.createElement('div');
    tocContainer.className = 'table-of-contents';
    tocContainer.innerHTML = '<h4>On This Page</h4>';
    
    const tocList = document.createElement('ul');
    
    headings.forEach(heading => {
        if (!heading.id) {
            // Generate ID if not present
            const id = heading.textContent
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            heading.id = id;
        }
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2';
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    
    tocContainer.appendChild(tocList);
    
    // Insert TOC after the docs header
    const docsHeader = document.querySelector('.docs-header');
    if (docsHeader) {
        docsHeader.parentNode.insertBefore(tocContainer, docsHeader.nextSibling);
    }
    
    // Add TOC styles
    const style = document.createElement('style');
    style.textContent = `
        .table-of-contents {
            background: var(--bg-secondary);
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: var(--radius-lg);
            padding: var(--space-6);
            margin: var(--space-8) 0;
        }
        
        .table-of-contents h4 {
            margin: 0 0 var(--space-4) 0;
            font-size: var(--font-size-base);
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .table-of-contents ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .table-of-contents li {
            margin-bottom: var(--space-2);
        }
        
        .table-of-contents a {
            display: block;
            padding: var(--space-1) 0;
            color: var(--text-secondary);
            text-decoration: none;
            font-size: var(--font-size-sm);
            transition: color var(--transition-fast);
        }
        
        .table-of-contents a:hover {
            color: var(--primary-color);
        }
        
        .table-of-contents .toc-h3 {
            padding-left: var(--space-4);
            font-size: var(--font-size-xs);
        }
        
        @media (max-width: 768px) {
            .table-of-contents {
                margin: var(--space-4) 0;
                padding: var(--space-4);
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without triggering scroll
                history.pushState(null, null, targetId);
                
                // Add temporary highlight to target section
                targetElement.classList.add('section-highlight');
                setTimeout(() => {
                    targetElement.classList.remove('section-highlight');
                }, 2000);
            }
        });
    });
    
    // Add section highlight styles
    const style = document.createElement('style');
    style.textContent = `
        .section-highlight {
            background: rgba(37, 99, 235, 0.05);
            border-left: 4px solid var(--primary-color);
            padding-left: var(--space-4);
            margin-left: calc(-1 * var(--space-4));
            transition: all var(--transition-normal);
        }
    `;
    document.head.appendChild(style);
}

// Copy code functionality (enhanced version)
function copyCodeToClipboard(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code');
    const text = code.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showCopySuccess(button);
        
        // Track copy event
        if (typeof trackEvent === 'function') {
            trackEvent('code_copy', {
                language: code.className || 'unknown',
                length: text.length
            });
        }
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopySuccess(button);
    });
}

function showCopySuccess(button) {
    const icon = button.querySelector('i');
    const originalClass = icon.className;
    
    icon.className = 'fas fa-check';
    button.style.background = 'rgba(16, 185, 129, 0.3)';
    button.title = 'Copied!';
    
    setTimeout(() => {
        icon.className = originalClass;
        button.style.background = '';
        button.title = 'Copy to clipboard';
    }, 2000);
}

// Mobile sidebar toggle
function toggleMobileSidebar() {
    const sidebar = document.querySelector('.docs-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
        sidebar.classList.toggle('open');
        
        // Create overlay if it doesn't exist
        if (!overlay) {
            const newOverlay = document.createElement('div');
            newOverlay.className = 'sidebar-overlay';
            newOverlay.addEventListener('click', closeMobileSidebar);
            document.body.appendChild(newOverlay);
        }
        
        document.body.classList.toggle('sidebar-open');
    }
}

function closeMobileSidebar() {
    const sidebar = document.querySelector('.docs-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-open');
        
        if (overlay) {
            overlay.remove();
        }
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Toggle sidebar with 'S' key
    if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        toggleMobileSidebar();
    }
    
    // Search with '/' key
    if (e.key === '/') {
        e.preventDefault();
        // Focus search input if available
        const searchInput = document.querySelector('#search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape key to close sidebar
    if (e.key === 'Escape') {
        closeMobileSidebar();
    }
});

// Print functionality
function printPage() {
    window.print();
}

// Export functions for global use
window.copyCodeToClipboard = copyCodeToClipboard;
window.toggleMobileSidebar = toggleMobileSidebar;
window.printPage = printPage;