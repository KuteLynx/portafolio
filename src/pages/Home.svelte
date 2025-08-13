<script>
    import {t} from 'svelte-i18n';
    import {onMount} from 'svelte';
    import HeroCodeWindow from '../components/HeroCodeWindow.svelte';

    let mounted = false;

    onMount(() => {
        mounted = true;
    });
</script>

<section class="home">
    <div class="container">
        <div class="hero-content">
            <div class="intro-text">
                <h2 class="greeting" class:fade-in={mounted}>
                    {$t('home.hello')}
                </h2>
                <h1 class="name gradient-text" class:slide-up={mounted}>
                    {$t('home.name')}
                </h1>
                <p class="description" class:slide-up={mounted}>
                    {$t('home.desc')}
                </p>
                <div class="cta-buttons" class:scale-in={mounted}>
                    <a class="cv-button btn-animate" href="/GerardoMartinez_CV.pdf" target="_blank">
                        <span class="button-text">{$t('home.cv')}</span>
                        <i class="fas fa-file-alt"></i>
                    </a>
                </div>
            </div>
            <HeroCodeWindow />
        </div>
    </div>

    <!-- Animated background elements -->
    <div class="floating-elements">
        <div class="floating-element" style="--delay: 0s"><i class="fas fa-bolt"></i></div>
        <div class="floating-element" style="--delay: 2s"><i class="fas fa-rocket"></i></div>
        <div class="floating-element" style="--delay: 4s"><i class="fas fa-laptop-code"></i></div>
        <div class="floating-element" style="--delay: 6s"><i class="fas fa-bullseye"></i></div>
    </div>
</section>

<style>
    .home {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        padding-top: 70px;
    }

    .hero-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-2xl);
        align-items: center;
        max-width: 1200px;
        width: 100%;
    }

    .intro-text {
        z-index: 2;
    }

    .greeting {
        font-size: 1.2rem;
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-sm);
        font-weight: 400;
        opacity: 0;
        transform: translateY(20px);
    }

    .greeting.fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    .name {
        font-size: clamp(2.5rem, 6vw, 4rem);
        font-weight: 700;
        margin-bottom: var(--spacing-md);
        line-height: 1.1;
        opacity: 0;
        transform: translateY(30px);
    }

    .name.slide-up {
        animation: slideUp 0.8s ease-out 0.2s forwards;
    }

    .description {
        font-size: 1.1rem;
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xl);
        max-width: 500px;
        opacity: 0;
        transform: translateY(30px);
    }

    .description.slide-up {
        animation: slideUp 0.8s ease-out 0.4s forwards;
    }

    .cta-buttons {
        opacity: 0;
        transform: scale(0.9);
    }

    .cta-buttons.scale-in {
        animation: scaleIn 0.6s ease-out 0.6s forwards;
    }

    .cv-button {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md) var(--spacing-xl);
        background: var(--gradient-primary);
        color: var(--color-bg);
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        text-decoration: none;
        box-shadow: var(--shadow-lg);
        transition: all var(--transition-normal);
        position: relative;
        overflow: hidden;
    }

    .cv-button:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-xl);
        color: var(--color-bg);
    }

    .cv-button i {
        font-size: 1.2rem;
    }

    /* Floating Elements */
    .floating-elements {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }

    .floating-element {
        position: absolute;
        font-size: 2rem;
        opacity: 0.1;
        animation: float 6s ease-in-out infinite;
        animation-delay: var(--delay);
    }

    .floating-element:nth-child(1) {
        top: 20%;
        left: 10%;
    }

    .floating-element:nth-child(2) {
        top: 60%;
        right: 15%;
    }

    .floating-element:nth-child(3) {
        bottom: 30%;
        left: 20%;
    }

    .floating-element:nth-child(4) {
        top: 40%;
        right: 30%;
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
        }
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .hero-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
            text-align: center;
        }

        .description {
            margin: 0 auto var(--spacing-xl) auto;
        }

        .floating-elements {
            display: none;
        }
    }

    @media (max-width: 480px) {
        .name {
            font-size: 2.5rem;
        }

        .cv-button {
            padding: var(--spacing-sm) var(--spacing-lg);
            font-size: 0.9rem;
        }
    }
</style>
