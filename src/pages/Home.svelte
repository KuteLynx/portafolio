<script>
    import {t} from 'svelte-i18n';
</script>

<section class="home">
    <div class="intro">
        <h2>{$t('home.hello')}</h2>
        <h1>{$t('home.name')}<span class="cursor">|</span></h1>
        <p>{$t('home.desc')}</p>
        <a class="cv-button" href="/GerardoMartinez_CV.pdf" target="_blank">{$t('home.cv')}</a>
    </div>
</section>

<style>
    .home {
        min-height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .intro h1 {
        font-size: 3rem;
        margin-bottom: 0.5rem;
        color: var(--color-accent);
    }

    .intro h2 {
        font-weight: 300;
        color: #ccc;
    }

    .cv-button {
        margin-top: 1rem;
        display: inline-block;
        padding: 0.75rem 1.5rem;
        border: 2px solid var(--color-accent);
        border-radius: 8px;
        color: var(--color-accent);
        transition: background 0.3s;
    }

    .cv-button:hover {
        background: var(--color-accent);
        color: #000;
    }

</style>
