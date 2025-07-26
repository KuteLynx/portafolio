<script>
    export let title;
    export let description;
    export let tech = [];
    export let repo;
    export let demo;
</script>

<div class="card">
    <h3>{title}</h3>
    <p>{description}</p>
    <div class="tech">
        {#each tech as t}
            <span>{t}</span>
        {/each}
    </div>
    <div class="links">
        {#if repo}<a href={repo} target="_blank">Código</a>{/if}
        {#if demo}<a href={demo} target="_blank">Demo</a>{/if}
    </div>
</div>

<style>
    .card {
        background: #1c1c1c;
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid #333;
        margin-bottom: 2rem;
    }

    .tech span {
        background: #2a2a2a;
        border-radius: 5px;
        padding: 0.3rem 0.6rem;
        margin-right: 0.5rem;
        font-size: 0.8rem;
    }

    .links a {
        margin-right: 1rem;
        color: var(--color-accent);
        text-decoration: underline;
    }
</style>
