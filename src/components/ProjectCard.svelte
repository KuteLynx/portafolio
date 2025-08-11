<script>
    export let title;
    export let description;
    export let tech = [];
    export let repo;
    export let demo = null;
    export let apiRepo;
    export let images = [];
    import {t} from 'svelte-i18n';

    let modalImg = null;

    function openModal(img) {
        modalImg = img;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalImg = null;
        document.body.style.overflow = '';
    }
</script>

<div class="card">
    <h3>{title}</h3>
    <p class="description">{description}</p>
    {#if images && images.length}
        <div class="images">
            {#each images as img}
                <img src={img} alt={title + ' screenshot'} on:click={() => openModal(img)}/>
            {/each}
        </div>
    {/if}
    <div class="tech">
        {#each tech as t}
            <span class="chip">{t}</span>
        {/each}
    </div>
    <div class="links">
        {#if repo}<a href={repo} target="_blank">{$t('project_card.code')}</a>{/if}
        {#if apiRepo} <a href={apiRepo} target="_blank">{$t('project_card.api')}</a>{/if}
        {#if demo}<a href={demo} target="_blank">{$t('project_card.demo')}</a>{/if}
    </div>
</div>

{#if modalImg}
    <div class="modal" on:click|self={closeModal}>
        <div class="modal-content">
            <button class="close" on:click={closeModal}>&times;</button>
            <img src={modalImg} alt="Imagen ampliada"/>
        </div>
    </div>
{/if}

<style>
    .card {
        margin: 0 auto 2rem auto;
        padding: 2rem 1.5rem;
        background: #181818;
        border-radius: 12px;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
    }

    .description {
        margin: 0 auto 1.2rem auto;
        font-size: 1rem;
        line-height: 1.6;
        color: #eaeaea;
        text-align: left;
    }

    .images {
        display: flex;
        gap: 1.2rem;
        justify-content: center;
        margin-bottom: 1.2rem;
    }

    @media (max-width: 875px) {
        .images {
            flex-direction: column;
            align-items: center;
        }

        .images img {
            max-width: 90vw;
            height: auto;
        }
    }

    .images img {
        max-width: 260px;
        height: 160px;
        object-fit: cover;
        border-radius: 10px;
        border: 1px solid #333;
        transition: transform 0.3s cubic-bezier(.4, 0, .2, 1), box-shadow 0.3s;
        cursor: pointer;
    }

    .images img:hover {
        transform: scale(1.15);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 2;
    }

    .tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
        margin-bottom: 1.2rem;
    }

    .chip {
        background: var(--color-accent);
        color: #181818;
        padding: 0.35em 1em;
        border-radius: 20px;
        font-size: 0.95em;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(0, 255, 136, 0.10);
        letter-spacing: 0.02em;
        border: 1px solid var(--color-border);
        user-select: none;
        transition: background 0.2s;
    }

    .chip:hover {
        background: var(--color-accent-hover);
    }

    .links {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    .links a {
        color: var(--color-accent, #0077ff);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s;
    }

    .links a:hover {
        color: #00c6ff;
        text-decoration: underline;
    }

    /* Modal styles */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal-content {
        position: relative;
        background: transparent;
        padding: 0;
        border-radius: 12px;
        box-shadow: 0 4px 32px rgba(0, 0, 0, 0.3);
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-content img {
        max-width: 80vw;
        max-height: 80vh;
        border-radius: 12px;
        box-shadow: 0 2px 16px rgba(0, 255, 136, 0.15);
        border: 2px solid var(--color-accent);
        background: #181818;
    }

    .close {
        position: absolute;
        top: 12px;
        right: 18px;
        background: none;
        border: none;
        color: var(--color-accent);
        font-size: 2rem;
        cursor: pointer;
        z-index: 2;
        transition: color 0.2s;
    }

    .close:hover {
        color: var(--color-accent-hover);
    }
</style>
