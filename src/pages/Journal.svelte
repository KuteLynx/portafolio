<script>
    import {locale, t} from 'svelte-i18n';

    /** @type {Array<{id:number, date:string, title:Object<string,string>, content:Object<string,string>, tags:string[], author:string}>} */
    let entries = $state([]);
    let loading = $state(true);
    let error = $state(null);

    $effect(() => {
        fetch('/journal/entries.json')
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then(data => {
                entries = [...data.entries].reverse();
                loading = false;
            })
            .catch(e => {
                error = e.message;
                loading = false;
            });
    });

    function goBack() {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function localText(obj) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        // Try current locale first, fallback to es, then first available
        const lang = $locale || 'es';
        return obj[lang] || obj['es'] || Object.values(obj)[0] || '';
    }

    function formatDate(dateStr) {
        const [y, m, d] = dateStr.split('-');
        // July 15, 2026 style
        const months = {
            '01': 'Ene', '02': 'Feb', '03': 'Mar', '04': 'Abr',
            '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Ago',
            '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dic'
        };
        return `${parseInt(d)} ${months[m] || m}, ${y}`;
    }

    function contentParagraphs(text) {
        return text.split('\n\n').filter(p => p.trim());
    }
</script>

<!-- Journal page wrapper -->
<div class="journal-page">
    <!-- Terminal-style header -->
    <header class="journal-header">
        <div class="journal-nav">
            <button onclick={goBack} class="back-btn btn-animate" aria-label={$t('journal.back')}>
                <i class="fas fa-arrow-left"></i>
                <span>{$t('journal.back')}</span>
            </button>
        </div>
        <div class="journal-title-section">
            <div class="terminal-line">
                <span class="prompt-symbol">❯</span>
                <span class="prompt-path">~/dev/journal</span>
                <span class="cursor-blink">_</span>
            </div>
            <h1 class="journal-heading gradient-text">{$t('journal.title')}</h1>
            <p class="journal-subtitle">{$t('journal.subtitle')}</p>
        </div>
    </header>

    <main class="journal-content">
        {#if loading}
            <div class="journal-loading">
                <div class="loader-dots">
                    <span></span><span></span><span></span>
                </div>
                <p>{$t('journal.loading')}</p>
            </div>
        {:else if error}
            <div class="journal-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>{$t('journal.error')}: {error}</p>
            </div>
        {:else if entries.length === 0}
            <div class="journal-empty">
                <i class="fas fa-book-open"></i>
                <p>{$t('journal.empty')}</p>
            </div>
        {:else}
            <div class="entries-list">
                {#each entries as entry, index (entry.id)}
                    <article class="entry-card" style="animation-delay: {index * 0.1}s">
                        <!-- Entry header -->
                        <div class="entry-meta">
                            <time class="entry-date" datetime={entry.date}>
                                <i class="far fa-calendar-alt"></i>
                                {formatDate(entry.date)}
                            </time>
                            <span class="entry-author">
                                <i class="fas fa-paw"></i>
                                {entry.author}
                            </span>
                        </div>

                        <h2 class="entry-title">{localText(entry.title)}</h2>

                        <div class="entry-body">
                            {#each contentParagraphs(localText(entry.content)) as paragraph}
                                <p>{paragraph}</p>
                            {/each}
                        </div>

                        {#if entry.tags && entry.tags.length > 0}
                            <div class="entry-tags">
                                {#each entry.tags as tag}
                                    <span class="tag-pill">#{tag}</span>
                                {/each}
                            </div>
                        {/if}
                    </article>
                {/each}
            </div>
        {/if}
    </main>

    <footer class="journal-footer">
        <p>{$t('journal.footer')}</p>
    </footer>
</div>

<style>
    .journal-page {
        min-height: 100vh;
        padding: 0 var(--spacing-xl);
        max-width: 900px;
        margin: 0 auto;
        padding-top: calc(70px + var(--spacing-xl));
        padding-bottom: var(--spacing-2xl);
    }

    /* ── Header ── */
    .journal-header {
        margin-bottom: var(--spacing-2xl);
    }

    .journal-nav {
        margin-bottom: var(--spacing-lg);
    }

    .back-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm);
        background: var(--gradient-card);
        border: 1px solid var(--color-border);
        color: var(--color-text-secondary);
        padding: var(--spacing-sm) var(--spacing-lg);
        border-radius: 8px;
        font-size: 0.85rem;
        font-family: var(--font-main);
        cursor: pointer;
        transition: all var(--transition-normal);
    }

    .back-btn:hover {
        color: var(--color-accent);
        border-color: var(--color-accent);
        transform: translateX(-3px);
    }

    .back-btn i {
        font-size: 0.8rem;
    }

    .terminal-line {
        font-family: var(--font-main);
        font-size: 0.9rem;
        color: var(--color-accent);
        margin-bottom: var(--spacing-md);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .prompt-symbol {
        color: var(--color-accent-secondary);
        font-weight: 700;
    }

    .prompt-path {
        color: var(--color-accent);
        opacity: 0.8;
    }

    .cursor-blink {
        animation: cursorBlink 1s step-end infinite;
        font-weight: 700;
    }

    @keyframes cursorBlink {
        50% { opacity: 0; }
    }

    .journal-heading {
        font-size: clamp(2rem, 5vw, 3rem);
        margin: 0 0 var(--spacing-sm) 0;
        font-family: var(--font-secondary);
    }

    .journal-subtitle {
        font-family: var(--font-secondary);
        font-size: 1.05rem;
        color: var(--color-text-secondary);
        margin: 0;
        line-height: 1.6;
    }

    /* ── States ── */
    .journal-loading,
    .journal-error,
    .journal-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-2xl) 0;
        gap: var(--spacing-md);
        color: var(--color-text-secondary);
        text-align: center;
    }

    .journal-error i,
    .journal-empty i {
        font-size: 2.5rem;
        opacity: 0.5;
    }

    .journal-error i {
        color: var(--color-error);
    }

    .journal-error p {
        color: var(--color-error);
    }

    .journal-loading p {
        font-family: var(--font-main);
        font-size: 0.9rem;
        animation: pulseText 1.5s ease-in-out infinite;
    }

    @keyframes pulseText {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
    }

    /* Loader dots */
    .loader-dots {
        display: flex;
        gap: 6px;
    }

    .loader-dots span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--color-accent);
        animation: dotBounce 1.4s ease-in-out infinite both;
    }

    .loader-dots span:nth-child(1) { animation-delay: -0.32s; }
    .loader-dots span:nth-child(2) { animation-delay: -0.16s; }
    .loader-dots span:nth-child(3) { animation-delay: 0s; }

    @keyframes dotBounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
    }

    /* ── Entries List ── */
    .entries-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xl);
    }

    /* ── Entry Card ── */
    .entry-card {
        background: var(--gradient-card);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        padding: var(--spacing-xl);
        transition: all var(--transition-normal);
        box-shadow: var(--shadow-lg);
        animation: journalEntryIn 0.5s ease-out both;
    }

    .entry-card:hover {
        border-color: var(--color-border-hover);
        box-shadow: var(--shadow-xl);
    }

    @keyframes journalEntryIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Entry meta row */
    .entry-meta {
        display: flex;
        align-items: center;
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-md);
        flex-wrap: wrap;
    }

    .entry-date {
        font-family: var(--font-main);
        font-size: 0.8rem;
        color: var(--color-accent);
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-xs);
        background: color-mix(in oklab, var(--color-accent) 12%, transparent);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: 6px;
        border: 1px solid color-mix(in oklab, var(--color-accent) 20%, transparent);
    }

    .entry-date i {
        font-size: 0.75rem;
    }

    .entry-author {
        font-family: var(--font-main);
        font-size: 0.8rem;
        color: var(--color-text-secondary);
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-xs);
        opacity: 0.7;
    }

    .entry-author i {
        font-size: 0.75rem;
        color: var(--color-accent);
    }

    /* Entry title */
    .entry-title {
        font-family: var(--font-secondary);
        font-size: clamp(1.15rem, 2.5vw, 1.45rem);
        font-weight: 600;
        color: var(--color-text);
        margin: 0 0 var(--spacing-md) 0;
        line-height: 1.3;
    }

    /* Entry body content */
    .entry-body {
        font-family: var(--font-secondary);
        font-size: 0.95rem;
        line-height: 1.75;
        color: var(--color-text-secondary);
    }

    .entry-body p {
        margin: 0 0 var(--spacing-md) 0;
    }

    .entry-body p:last-child {
        margin-bottom: 0;
    }

    /* Tags */
    .entry-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
        margin-top: var(--spacing-lg);
        padding-top: var(--spacing-lg);
        border-top: 1px solid var(--color-border);
    }

    .tag-pill {
        font-family: var(--font-main);
        font-size: 0.75rem;
        padding: 2px 10px;
        border-radius: 20px;
        background: color-mix(in oklab, var(--color-accent) 10%, transparent);
        color: var(--color-accent);
        border: 1px solid color-mix(in oklab, var(--color-accent) 20%, transparent);
        transition: all var(--transition-fast);
        white-space: nowrap;
    }

    .tag-pill:hover {
        background: color-mix(in oklab, var(--color-accent) 20%, transparent);
        transform: translateY(-1px);
    }

    /* ── Footer ── */
    .journal-footer {
        margin-top: var(--spacing-2xl);
        text-align: center;
        padding: var(--spacing-xl) 0;
        border-top: 1px solid var(--color-border);
    }

    .journal-footer p {
        font-family: var(--font-main);
        font-size: 0.8rem;
        color: var(--color-text-secondary);
        opacity: 0.6;
        margin: 0;
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
        .journal-page {
            padding: 0 var(--spacing-md);
            padding-top: calc(70px + var(--spacing-lg));
        }

        .entry-card {
            padding: var(--spacing-lg);
        }

        .entry-meta {
            gap: var(--spacing-sm);
        }
    }

    @media (max-width: 375px) {
        .journal-page {
            padding: 0 var(--spacing-sm);
            padding-top: calc(70px + var(--spacing-md));
        }

        .entry-card {
            padding: var(--spacing-md);
        }

        .entry-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-xs);
        }
    }
</style>
