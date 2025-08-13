<script>
    import {onMount} from 'svelte';
    import {t} from 'svelte-i18n';
    import LangSwitch from './LangSwitch.svelte';

    let isOpen = false;
    let activeSection = 'home';
    let scrolled = false;

    // Theme picker state
    let showThemeSelect = false;
    let theme = 'orange';

    const sectionIds = [
        {key: 'home', id: ''},
        {key: 'projects', id: 'projects'},
        {key: 'about', id: 'about'},
        {key: 'contact', id: 'contact'}
    ];

    $: links = [
        {name: $t('navbar.home'), href: '#', key: 'home'},
        {name: $t('navbar.projects'), href: '#projects', key: 'projects'},
        {name: $t('navbar.about'), href: '#about', key: 'about'},
        {name: $t('navbar.contact'), href: '#contact', key: 'contact'}
    ];

    const toggleMenu = () => {
        isOpen = !isOpen;
    };

    function updateActiveSection() {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 0;
        let found = 'home';
        for (const sec of sectionIds) {
            const el = sec.id ? document.getElementById(sec.id) : document.body;
            if (!el) continue;
            if (sec.key === 'contact') {
                if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 10) {
                    found = 'contact';
                }
            } else if (window.scrollY >= el.offsetTop - navbarHeight) {
                found = sec.key;
            }
        }
        activeSection = found;
    }

    function handleScroll() {
        scrolled = window.scrollY > 50;
        updateActiveSection();
    }

    function applyTheme(value) {
        theme = value;
        // Establecer atributo para que los overrides de CSS apliquen
        document.documentElement.setAttribute('data-theme', value);
        localStorage.setItem('theme', value);
    }

    function toggleThemeSelect() {
        showThemeSelect = !showThemeSelect;
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        updateActiveSection();
        // Cargar tema guardado
        const saved = localStorage.getItem('theme') || 'orange';
        applyTheme(saved);
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<nav class="navbar" class:scrolled>
    <div class="nav-container">
        <div class="logo">
            <div class="terminal-prompt">
                <span class="prompt-text">gerardo@portfolio:~$</span>
                <span class="cursor">_</span>
            </div>
        </div>

        <div class="lang-desktop">
            <LangSwitch/>
        </div>

        <!-- Theme picker (desktop) -->
        <div class="theme-desktop">
            <button aria-label="Cambiar tema" class="theme-button btn-animate" on:click={toggleThemeSelect}
                    aria-expanded={showThemeSelect} aria-controls="theme-select">
                <i class="fas fa-palette"></i>
            </button>
            {#if showThemeSelect}
                <div class="theme-select-popover">
                    <label for="theme-select" class="sr-only">Tema</label>
                    <select id="theme-select" class="theme-select" bind:value={theme} on:change={(e) => { applyTheme(e.target.value); showThemeSelect = false; }}>
                        <option value="orange">Orange</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                    </select>
                </div>
            {/if}
        </div>

        <!-- Hamburger Menu Button -->
        <button aria-label="Toggle menu" class="hamburger btn-animate" on:click={toggleMenu}>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </button>

        <!-- Desktop Navigation -->
        <ul class="nav-links desktop">
            {#each links as link, index}
                <li class="nav-item" style="animation-delay: {index * 0.1}s">
                    <a href={link.href}
                       class:active={activeSection === link.key}
                       class="nav-link">
                        <span class="nav-number">0{index + 1}</span>
                        {link.name}
                    </a>
                </li>
            {/each}
        </ul>

        <!-- Mobile Navigation -->
        {#if isOpen}
            <div class="mobile-overlay" role="button" tabindex="0" aria-label="Cerrar menú"
                 on:click={() => isOpen = false}
                 on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') isOpen = false; }}></div>
            <ul class="nav-links mobile">
                {#each links as link, index}
                    <li class="nav-item" style="animation-delay: {index * 0.1}s">
                        <a href={link.href}
                           on:click={() => isOpen = false}
                           class:active={activeSection === link.key}
                           class="nav-link">
                            <span class="nav-number">0{index + 1}</span>
                            {link.name}
                        </a>
                    </li>
                {/each}
                <li class="theme-mobile">
                    <div class="theme-mobile-inner">
                        <i class="fas fa-palette"></i>
                        <select class="theme-select" bind:value={theme} on:change={(e) => applyTheme(e.target.value)}>
                            <option value="orange">Orange</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                        </select>
                    </div>
                </li>
                <li class="lang-mobile">
                    <LangSwitch/>
                </li>
            </ul>
        {/if}
    </div>
</nav>

<style>
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        background: rgba(10, 10, 10, 0.8);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--color-border);
        transition: all var(--transition-normal);
    }

    .navbar.scrolled {
        background: rgba(10, 10, 10, 0.95);
        box-shadow: var(--shadow-lg);
    }

    .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-xl);
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        gap: var(--spacing-md);
    }

    .logo {
        display: flex;
        align-items: center;
    }

    .terminal-prompt {
        font-family: var(--font-main), monospace;
        font-size: 0.9rem;
        color: var(--color-accent);
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .prompt-text {
        font-weight: 500;
    }

    .cursor {
        animation: blink 1s step-end infinite;
        color: var(--color-accent);
    }

    .hamburger {
        display: none;
        flex-direction: column;
        justify-content: space-around;
        width: 30px;
        height: 30px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        z-index: 1001;
    }

    .hamburger-line {
        width: 100%;
        height: 3px;
        background: var(--color-accent);
        border-radius: 2px;
        transition: all var(--transition-normal);
        transform-origin: center;
    }

    .hamburger:hover .hamburger-line {
        background: var(--color-accent-hover);
    }

    .nav-links {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: var(--spacing-lg);
    }

    .nav-item {
        opacity: 0;
        animation: slideDown 0.6s ease-out forwards;
    }

    .nav-link {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        color: var(--color-text-secondary);
        font-weight: 500;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: 6px;
        transition: all var(--transition-normal);
        position: relative;
        overflow: hidden;
    }

    .nav-link::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: var(--gradient-primary);
        opacity: 0.1;
        transition: left var(--transition-normal);
    }

    .nav-link:hover::before {
        left: 0;
    }

    .nav-link:hover {
        color: var(--color-accent);
        transform: translateY(-1px);
    }

    .nav-link.active {
        color: var(--color-accent);
        background: color-mix(in oklab, var(--color-accent) 10%, transparent);
        border: 1px solid var(--color-accent);
    }

    .nav-number {
        font-family: var(--font-main), monospace;
        font-size: 0.8rem;
        color: var(--color-accent);
        font-weight: 600;
    }

    .mobile-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 999;
        animation: fadeIn 0.3s ease-out;
    }

    /* Theme picker styles */
    .theme-desktop {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .theme-button {
        width: 36px;
        height: 36px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-accent);
        transition: all var(--transition-normal);
    }

    .theme-button:hover {
        color: var(--color-accent-hover);
        transform: translateY(-1px);
    }

    .theme-select-popover {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: var(--spacing-sm);
        box-shadow: var(--shadow-lg);
        z-index: 1002;
        min-width: 160px;
    }

    .theme-select {
        width: 100%;
        background: var(--color-bg-secondary);
        color: var(--color-text);
        border: 1px solid var(--color-border);
        border-radius: 6px;
        padding: var(--spacing-sm);
        font-family: var(--font-secondary);
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }

        .nav-links.desktop {
            display: none;
        }

        .lang-desktop {
            display: none;
        }

        .theme-desktop {
            display: none;
        }

        .nav-links.mobile {
            position: fixed;
            top: 0;
            right: 0;
            width: 280px;
            height: 100vh;
            background: var(--color-bg);
            border-left: 1px solid var(--color-border);
            flex-direction: column;
            padding: 80px var(--spacing-xl) var(--spacing-xl);
            gap: var(--spacing-md);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        }

        .nav-links.mobile .nav-item {
            width: 100%;
        }

        .nav-links.mobile .nav-link {
            width: 100%;
            justify-content: flex-start;
            padding: var(--spacing-md);
            border-radius: 8px;
        }

        .theme-mobile {
            padding-top: var(--spacing-md);
            border-top: 1px solid var(--color-border);
        }

        .theme-mobile-inner {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            color: var(--color-accent);
        }

        .lang-mobile {
            margin-top: auto;
            padding-top: var(--spacing-lg);
            border-top: 1px solid var(--color-border);
        }
    }

    @media (min-width: 769px) {
        .lang-mobile, .theme-mobile {
            display: none;
        }
    }

    /* Animations */
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>