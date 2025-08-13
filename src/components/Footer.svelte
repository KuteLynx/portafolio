<script>
    import {t} from 'svelte-i18n';
</script>

<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-main">
                <div class="footer-brand">
                    <div class="brand-logo">
                        <span class="terminal-prompt">gerardo@portfolio:~$</span>
                        <span class="cursor">_</span>
                    </div>
                    <p class="brand-tagline">{$t('footer.made')}</p>
                </div>

                <div class="footer-links">
                    <div class="link-group">
                        <h4>{$t('footer.connect')}</h4>
                        <a class="social-link" href="https://github.com/mtz-juncogerardo" target="_blank">
                            <i class="fab fa-github"></i>
                            <span class="link-text">{$t('footer.github')}</span>
                        </a>
                        <a class="social-link" href="https://linkedin.com/in/gerardo-martínez-junco-174315377"
                           target="_blank">
                            <i class="fab fa-linkedin"></i>
                            <span class="link-text">{$t('footer.linkedin')}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>

<style>
    .footer {
        background: var(--color-bg);
        border-top: 1px solid var(--color-border);
        padding: var(--spacing-2xl) 0 var(--spacing-lg);
        position: relative;
    }

    .footer::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--gradient-primary);
        opacity: 0.3;
    }

    .footer-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xl);
    }

    .footer-main {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: var(--spacing-xl);
        align-items: start;
    }

    .footer-brand {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .brand-logo {
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: var(--font-main), sans-serif;
        font-size: 1rem;
        color: var(--color-accent);
    }

    .terminal-prompt {
        font-weight: 500;
    }

    .cursor {
        animation: blink 1s step-end infinite;
    }

    .brand-tagline {
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        margin: 0;
    }

    .footer-links {
        display: flex;
        gap: var(--spacing-xl);
    }

    .link-group h4 {
        color: var(--color-accent);
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: var(--spacing-md);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .social-link {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        color: var(--color-text-secondary);
        text-decoration: none;
        padding: var(--spacing-sm) 0;
        transition: all var(--transition-normal);
        font-size: 0.9rem;
    }

    .social-link:hover {
        color: var(--color-accent);
        transform: translateX(5px);
    }

    .social-link i {
        font-size: 1.1rem;
    }

    .link-text {
        font-weight: 500;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .footer-main {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
            text-align: center;
        }

        .footer-links {
            justify-content: center;
        }

        .social-link:hover {
            transform: translateY(-2px);
        }
    }

    @media (max-width: 480px) {
        .footer {
            padding: var(--spacing-xl) 0 var(--spacing-md);
        }

        .footer-links {
            flex-direction: column;
            gap: var(--spacing-lg);
        }

        .link-group {
            text-align: center;
        }
    }
</style>
