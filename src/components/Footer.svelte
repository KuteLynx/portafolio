<script>
    import {t} from 'svelte-i18n';
</script>

<footer class="footer">
    <p>{$t('footer.made')}</p>
    <div class="links">
        <a href="https://github.com/mtz-juncogerardo" target="_blank">{$t('footer.github')}</a>
        <a href="https://linkedin.com/in/gerardo-martínez-junco-174315377" target="_blank">{$t('footer.linkedin')}</a>
    </div>
</footer>

<style>
    .footer {
        background: #1a1a1a;
        padding: 2rem;
        text-align: center;
        color: #888;
    }

    .links {
        margin-top: 1rem;
    }

    .links a {
        margin: 0 0.5rem;
        color: var(--color-accent);
    }
</style>
