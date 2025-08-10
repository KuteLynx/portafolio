<script>
    import {t} from 'svelte-i18n';

    const skills = [
        'JavaScript',
        'TypeScript',
        'Svelte',
        'Angular',
        'RxJS',
        'C#',
        'ASP.NET',
        'LINQ',
        'SQL',
        'Git',
        'Linux'
    ];
</script>

<section class="stack">
    <h2>{$t('techstack.title')}</h2>
    <div class="grid">
        {#each skills as skill}
            <span class="chip">{skill}</span>
        {/each}
    </div>
</section>

<style>
    .stack {
        padding: 4rem 2rem;
        text-align: center;
    }

    .stack h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        color: var(--color-accent);
    }

    .grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
    }

    .chip {
        background: var(--color-subtle);
        border: 1px solid var(--color-accent);
        border-radius: 20px;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
</style>
