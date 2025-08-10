<script>
    import {locale, t} from 'svelte-i18n';

    function setLang(lang) {
        $locale = lang;
    }
</script>

<div class="lang-switch-group">
    <button class:active={$locale === 'en'} on:click={() => setLang('en')}>{$t('navbar.switch_language_en')}</button>
    <span>|</span>
    <button class:active={$locale === 'es'} on:click={() => setLang('es')}>{$t('navbar.switch_language_es')}</button>
</div>

<style>
    .lang-switch-group {
        align-items: center;
        gap: 0.2rem;
        margin-right: 1rem;
    }

    .lang-switch-group button {
        background: none;
        border: none;
        color: var(--color-subtle);
        font-size: 1rem;
        cursor: pointer;
        font-weight: bold;
        padding: 0 0.2rem;
        transition: color 0.2s;
    }

    .lang-switch-group button.active {
        color: var(--color-accent-hover);
        text-decoration: underline;
    }

    .lang-switch-group span {
        color: var(--color-accent);
        font-size: 1rem;
        user-select: none;
    }
</style>
