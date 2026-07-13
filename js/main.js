/**
 * Portfolio Site - Main JavaScript
 * スクロールアニメーション、ナビゲーション、インタラクションを管理
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Navigation
    // ========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // スクロール時のナビゲーションバーのスタイル変更
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 背景色とシャドウの変更
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // モバイルメニューのトグル
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // メニュー項目クリック時にメニューを閉じる
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ========================================
    // Smooth Scroll for anchor links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一度表示されたら監視を解除
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // アニメーション対象の要素をすべて取得
    const animatedElements = document.querySelectorAll(`
        .fade-in,
        .slide-in-left,
        .slide-in-right,
        .scale-in,
        .section-title,
        .work-card,
        .gallery-item,
        .car-card,
        .interest-card,
        .timeline-item,
        .skill-item
    `);

    animatedElements.forEach((el, index) => {
        // デフォルトのアニメーションクラスが付いていない場合にfade-inを追加
        if (!el.classList.contains('slide-in-left') &&
            !el.classList.contains('slide-in-right') &&
            !el.classList.contains('scale-in')) {
            el.classList.add('fade-in');
        }
        
        // stagger effect（連続する要素に遅延を追加）
        if (el.classList.contains('work-card') || 
            el.classList.contains('gallery-item') ||
            el.classList.contains('skill-item')) {
            el.style.transitionDelay = `${(index % 6) * 100}ms`;
        }
        
        fadeInObserver.observe(el);
    });

    // ========================================
    // Active Navigation Link based on scroll position
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}` || 
                        link.getAttribute('href') === `index.html#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // 初期実行

    // ========================================
    // Hero Section Animation
    // ========================================
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }

    // ========================================
    // Parallax Effect for Hero Background
    // ========================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // ========================================
    // Work Cards Hover Effect Enhancement
    // ========================================
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // ========================================
    // Gallery Lightbox (Simple Implementation)
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            // 将来的に実際の画像を使ったライトボックス機能を実装可能
            console.log('Gallery item clicked:', this);
        });
    });

    // ========================================
    // Form Handling (Contact Section)
    // ========================================
    // 必要に応じてフォームのバリデーションなどを追加

    // ========================================
    // Back to Top Button (Optional Enhancement)
    // ========================================
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        `;

        document.body.appendChild(button);

        // スクロール位置に応じて表示/非表示
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });

        // クリック時にトップへスクロール
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ホバーエフェクト
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-4px)';
            button.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.4)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
        });
    };

    createBackToTopButton();

    // ========================================
    // Typing Effect for Hero Title (Optional)
    // ========================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--primary-color)';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // タイピング完了後にカーソルを削除
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // 少し遅らせてタイピング開始
        setTimeout(typeWriter, 800);
    }

    // ========================================
    // Skills Counter Animation (Optional)
    // ========================================
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.style.opacity = '1';
                }, index * 100);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => {
        item.style.transform = 'translateY(20px) scale(0.9)';
        item.style.opacity = '0';
        item.style.transition = 'all 0.4s ease';
        skillObserver.observe(item);
    });

    // ========================================
    // Timeline Animation
    // ========================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease ${index * 150}ms`;
    });

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // ========================================
    // Page Transition (for SPA-like feel)
    // ========================================
    const pageContent = document.querySelector('body');
    if (pageContent) {
        pageContent.style.opacity = '0';
        pageContent.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            pageContent.style.opacity = '1';
        }, 50);
    }

    // ========================================
    // External Link Indicator
    // ========================================
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        // 既にアイコンがある場合はスキップ
        if (!link.querySelector('i')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ========================================
    // Performance: Lazy loading for images (future enhancement)
    // ========================================
    // 画像が追加された際にlazy loadingを実装
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    console.log('Portfolio site initialized successfully!');
});

// ========================================
// Utility Functions
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}