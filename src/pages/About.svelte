<script>
    import {t} from 'svelte-i18n';
    import {onMount} from 'svelte';

    let mounted = false;

    onMount(() => {
        mounted = true;
    });
</script>

<section class="about" id="about">
    <div class="container">
        <div class="about-header">
            <h2 class="section-title gradient-text">{$t('about.title')}</h2>
            <p class="section-subtitle">{$t('about.subtitle')}</p>
        </div>

        <div class="about-content">
            <div class="about-text">
                <div class="text-block" class:fade-in={mounted}>
                    <p>{@html $t('about.p1')}</p>
                </div>

                <div class="text-block" class:fade-in={mounted} style="animation-delay: 0.2s">
                    <p>{@html $t('about.p2')}</p>
                </div>

                <div class="text-block" class:fade-in={mounted} style="animation-delay: 0.4s">
                    <p>{$t('about.p3')}</p>
                </div>

                <div class="text-block" class:fade-in={mounted} style="animation-delay: 0.6s">
                    <p>{@html $t('about.p4')}</p>
                </div>
            </div>

            <div class="about-visual">
                <div class="stats-card">
                    <div class="stat-item">
                        <div class="stat-number">10+</div>
                        <div class="stat-label">{$t('about.stats.years')}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">5+</div>
                        <div class="stat-label">{$t('about.stats.technologies')}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">4</div>
                        <div class="stat-label">{$t('about.stats.cats')}</div>
                    </div>
                </div>

                <div class="interests-card">
                    <h3>{$t('about.interests.title')}</h3>
                    <div class="interests-grid">
                        <div class="interest-item">
                            <i class="fas fa-cat interest-icon"></i>
                            <span class="interest-text">{$t('about.interests.cats')}</span>
                        </div>
                        <div class="interest-item">
                            <i class="fas fa-coffee interest-icon"></i>
                            <span class="interest-text">{$t('about.interests.coffee')}</span>
                        </div>
                        <div class="interest-item">
                            <i class="fas fa-book interest-icon"></i>
                            <span class="interest-text">{$t('about.interests.reading')}</span>
                        </div>
                        <div class="interest-item">
                            <i class="fas fa-gamepad interest-icon"></i>
                            <span class="interest-text">{$t('about.interests.gaming')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .about {
        padding: var(--spacing-2xl) 0;
        background: var(--gradient-bg);
        position: relative;
    }

    .about::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(0, 212, 170, 0.03) 0%, transparent 50%);
        pointer-events: none;
    }

    .about-header {
        text-align: center;
        margin-bottom: var(--spacing-2xl);
    }

    .section-title {
        font-size: clamp(2rem, 5vw, 3rem);
        margin-bottom: var(--spacing-sm);
        font-weight: 700;
    }

    .section-subtitle {
        font-size: 1.1rem;
        color: var(--color-text-secondary);
        max-width: 600px;
        margin: 0 auto;
    }

    .about-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: var(--spacing-2xl);
        align-items: start;
    }

    .about-text {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .text-block {
        opacity: 0;
        transform: translateY(20px);
    }

    .text-block.fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    .text-block p {
        font-size: 1.1rem;
        line-height: 1.8;
        color: var(--color-text-secondary);
        margin: 0;
    }

    .text-block span {
        font-weight: 600;
        color: var(--color-accent);
        background: linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .about-visual {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .stats-card {
        background: var(--gradient-card);
        border: 1px solid var(--color-border);
        border-radius: 16px;
        padding: var(--spacing-xl);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-md);
        text-align: center;
    }

    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xs);
    }

    .stat-number {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-accent);
        font-family: var(--font-main);
    }

    .stat-label {
        font-size: 0.8rem;
        color: var(--color-text-secondary);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .interests-card {
        background: var(--gradient-card);
        border: 1px solid var(--color-border);
        border-radius: 16px;
        padding: var(--spacing-xl);
    }

    .interests-card h3 {
        color: var(--color-accent);
        margin-bottom: var(--spacing-lg);
        font-size: 1.2rem;
        text-align: center;
    }

    .interests-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-md);
    }

    .interest-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm);
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        transition: all var(--transition-normal);
    }

    .interest-item:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
        border-color: var(--color-accent);
    }

    .interest-icon {
        font-size: 1.5rem;
    }

    .interest-text {
        font-size: 0.9rem;
        color: var(--color-text);
        font-weight: 500;
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .about-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
        }

        .about-visual {
            order: -1;
        }

        .stats-card {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
        }

        .interests-grid {
            grid-template-columns: 1fr;
        }

        .text-block p {
            font-size: 1rem;
        }
    }

    @media (max-width: 480px) {
        .about {
            padding: var(--spacing-xl) 0;
        }

        .section-title {
            font-size: 2rem;
        }

        .stats-card,
        .interests-card {
            padding: var(--spacing-lg);
        }

        .stat-number {
            font-size: 1.5rem;
        }
    }
</style>
