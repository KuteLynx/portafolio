<script>
    import {t} from 'svelte-i18n';

    let mounted = $state(false);

    $effect(() => {
        mounted = true;
    });
</script>

<section class="services" id="services">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title gradient-text">{$t('services.title')}</h2>
            <p class="section-subtitle">{$t('services.subtitle')}</p>
        </div>

        <div class="services-grid">
            {#each $t('services.items') as service, index}
                <div class="service-card" class:fade-in={mounted} style="--card-delay: {index * 0.15}s">
                    <div class="service-icon-wrapper">
                        <i class="{service.icon} service-icon"></i>
                    </div>
                    <h3 class="service-title">{service.title}</h3>
                    <p class="service-desc">{service.desc}</p>
                    <div class="service-tech">
                        {#each service.technologies as tech}
                            <span class="tech-chip">{tech}</span>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>

        <div class="services-cta" class:fade-in={mounted}>
            <p class="cta-text">{$t('services.cta')}</p>
            <a href="#contact" class="cta-button btn-animate">
                <i class="fas fa-paper-plane"></i>
                <span>{$t('services.cta_button')}</span>
            </a>
        </div>
    </div>
</section>

<style>
    .services {
        padding: var(--spacing-2xl) 0;
        background: var(--gradient-bg);
        position: relative;
    }

    .services::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 70% 30%, rgba(0, 212, 170, 0.03) 0%, transparent 50%),
                    radial-gradient(circle at 30% 70%, rgba(255, 107, 53, 0.03) 0%, transparent 50%);
        pointer-events: none;
    }

    .section-header {
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

    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--spacing-xl);
        margin-bottom: var(--spacing-2xl);
    }

    .service-card {
        background: var(--gradient-card);
        border: 1px solid var(--color-border);
        border-radius: 16px;
        padding: var(--spacing-xl);
        text-align: center;
        transition: all var(--transition-normal);
        opacity: 0;
        transform: translateY(30px);
    }

    .service-card.fade-in {
        animation: cardFadeIn 0.8s ease-out forwards;
        animation-delay: var(--card-delay);
    }

    .service-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-xl);
        border-color: var(--color-accent);
    }

    .service-icon-wrapper {
        width: 64px;
        height: 64px;
        margin: 0 auto var(--spacing-lg);
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-normal);
    }

    .service-card:hover .service-icon-wrapper {
        background: var(--gradient-primary);
        border-color: var(--color-accent);
        transform: scale(1.1);
    }

    .service-icon {
        font-size: 1.5rem;
        color: var(--color-accent);
        transition: all var(--transition-normal);
    }

    .service-card:hover .service-icon {
        color: var(--color-bg);
    }

    .service-title {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--color-text);
        margin-bottom: var(--spacing-md);
    }

    .service-desc {
        font-size: 0.95rem;
        color: var(--color-text-secondary);
        line-height: 1.7;
        margin-bottom: var(--spacing-lg);
    }

    .service-tech {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
        justify-content: center;
    }

    .tech-chip {
        background: var(--gradient-secondary);
        color: var(--color-bg);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
        transition: all var(--transition-normal);
    }

    .tech-chip:hover {
        transform: scale(1.05);
        box-shadow: var(--shadow-md);
    }

    .services-cta {
        text-align: center;
        opacity: 0;
        transform: translateY(20px);
    }

    .services-cta.fade-in {
        animation: cardFadeIn 0.8s ease-out 0.6s forwards;
    }

    .cta-text {
        font-size: 1.3rem;
        color: var(--color-text);
        margin-bottom: var(--spacing-lg);
        font-weight: 600;
    }

    .cta-button {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md) var(--spacing-xl);
        background: var(--gradient-primary);
        color: var(--color-bg);
        border-radius: 8px;
        font-weight: 600;
        font-size: 1.1rem;
        text-decoration: none;
        box-shadow: var(--shadow-lg);
        transition: all var(--transition-normal);
        position: relative;
        overflow: hidden;
    }

    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-xl);
        color: var(--color-bg);
    }

    .cta-button i {
        font-size: 1.1rem;
    }

    @keyframes cardFadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Responsive */
    @media (max-width: 768px) {
        .services {
            padding: var(--spacing-xl) 0;
        }

        .services-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
        }

        .service-card {
            padding: var(--spacing-lg);
        }

        .section-title {
            font-size: 2rem;
        }

        .cta-text {
            font-size: 1.1rem;
        }
    }

    @media (max-width: 480px) {
        .service-card {
            padding: var(--spacing-md);
        }

        .service-icon-wrapper {
            width: 52px;
            height: 52px;
            margin-bottom: var(--spacing-md);
        }

        .service-icon {
            font-size: 1.2rem;
        }

        .service-title {
            font-size: 1.1rem;
        }

        .cta-button {
            width: 100%;
            justify-content: center;
        }
    }
</style>
