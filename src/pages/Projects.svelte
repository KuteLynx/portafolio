<script>
    import ProjectCard from '../components/ProjectCard.svelte';
    import {t} from 'svelte-i18n';
</script>

<section id="projects">
    <h2>{$t('projects.title')}</h2>
    <ProjectCard
            apiRepo="https://github.com/mtz-juncogerardo/Shinsekai-API"
            description={$t('projects.shinsekai.desc')}
            images={[
            '/images/shinsekai-homepage.png',
            '/images/shinsekai-login.png',
            '/images/shinsekai-checkout.png'
        ]}
            repo="https://github.com/mtz-juncogerardo/Shinsekai-Client"
            tech={["Angular", "Entity Framework", "Asp.Net", "SQL", "Azure DevOps", "Stripe"]}
            title={$t('projects.shinsekai.title')}
    />
</section>

<style>
    section {
        padding: 4rem 2rem;
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        color: var(--color-accent);
    }
</style>
