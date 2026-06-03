<script>
    import ProjectCard from '../components/ProjectCard.svelte';
    import {t} from 'svelte-i18n';
</script>

<section id="projects">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title gradient-text">{$t('projects.title')}</h2>
            <p class="section-subtitle">{$t('projects.subtitle')}</p>
        </div>

        <ProjectCard
            description={$t('projects.pokedex.desc')}
            images={['/images/pokedex-app-screenshot.png']}
            repo="https://github.com/KuteLynx/pokedex"
            demo="https://kutelynx.github.io/pokedex/pokedex/"
            tech={["Angular", "TypeScript", "PokéAPI", "GitHub Pages"]}
            title={$t('projects.pokedex.title')}
        />

        <ProjectCard
            description={$t('projects.beatbox.desc')}
            images={['/images/beatbox-screenshot.png']}
            repo="https://github.com/mtz-juncogerardo/beatbox-studio"
            demo="https://mtz-juncogerardo.github.io/beatbox-studio/"
            tech={["JavaScript", "Web Audio API", "HTML/CSS"]}
            title={$t('projects.beatbox.title')}
        />

        <ProjectCard
            description={$t('projects.lynx-moneyleaks.desc')}
            repo="https://dev.azure.com/mtzjuncogerardo/LynxMoneyLeaks/_git/LynxMoneyLeaks"
            tech={["Angular", ".NET 10", "PostgreSQL", "Azure DevOps"]}
            title={$t('projects.lynx-moneyleaks.title')}
            status="coming-soon"
        />
    </div>
</section>

<style>
    section {
        padding: var(--spacing-2xl) 0;
        background: var(--gradient-bg);
        position: relative;
    }

    section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 20%, rgba(255, 107, 53, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(0, 212, 170, 0.03) 0%, transparent 50%);
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

    /* Responsive Design */
    @media (max-width: 768px) {
        section {
            padding: var(--spacing-xl) 0;
        }

        .section-title {
            font-size: 2rem;
        }
    }
</style>
