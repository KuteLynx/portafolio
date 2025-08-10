<script>
    import {t} from 'svelte-i18n';
</script>

<section class="about" id="about">
    <h2>{$t('about.title')}</h2>
    <p>{@html $t('about.p1')}</p>
    <p>{@html $t('about.p2')}</p>
    <p>{$t('about.p3')}</p>
    <p>{@html $t('about.p4')}</p>
</section>

<style>
    .about {
        padding: 4rem 2rem;
        max-width: 800px;
        margin: auto;
    }

    .about h2 {
        font-size: 2rem;
        color: var(--color-accent);
        margin-bottom: 1rem;
    }

    .about p {
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    .about span {
        font-weight: bold;
        color: var(--color-accent);
    }
</style>
