<script>
    import ProjectCard from '../components/ProjectCard.svelte';
    let projects = [
        {
            title: 'Shinsekai Tienda de Figuras Anime Online',
            description: 'Desarrollé una e-commerce fullstack desde cero utilizando ASP.NET en el backend y Angular en el frontend. ' +
                'La plataforma incluía autenticación JWT personalizada, integración de pagos con Stripe, y almacenamiento en SQL Server. ' +
                'Implementé un panel de administración para que el cliente pudiera gestionar productos y contenido del sitio. ' +
                'Todo el proceso de despliegue y CI/CD fue automatizado con Azure DevOps.\n' +
                'Aunque el sitio fue dado de baja por decisión del cliente, el código completo puede consultarse en mi repositorio público.',
            tech: ['Angular', 'Entity Framework', 'Asp.Net', 'SQL', 'Azure DevOps', 'Stripe'],
            repo: 'https://github.com/mtz-juncogerardo/Shinsekai-Client',
            apiRepo: 'https://github.com/mtz-juncogerardo/Shinsekai-API',
            images: [
                '/images/shinsekai-homepage.png',
                '/images/shinsekai-login.png',
                '/images/shinsekai-checkout.png'
            ]
        },
    ];
</script>

<section id="projects">
    <h2>Proyectos Destacados</h2>
    {#each projects as project}
        <ProjectCard {...project} />
    {/each}
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
