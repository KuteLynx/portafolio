<script>
    import ProjectCard from '../components/ProjectCard.svelte';

    let projects = [
        {
            title: 'Gestor de Tareas',
            description: 'Aplicación para gestionar tareas diarias, hecha con SvelteKit y Supabase.',
            tech: ['SvelteKit', 'Supabase', 'Tailwind'],
            repo: 'https://github.com/tuusuario/todo-app',
            demo: 'https://tu-todo-app.netlify.app'
        },
        {
            title: 'Plugin Angular para VPGC',
            description: 'Componente interno para planificación y control en Angular 16.',
            tech: ['Angular', 'RxJS', 'NgRx'],
            repo: '',
            demo: ''
        }
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
