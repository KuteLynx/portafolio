<script>
    import {onMount} from 'svelte';
    import {t} from 'svelte-i18n';
    import LangSwitch from './LangSwitch.svelte';

    let isOpen = false;
    let activeSection = '';

    const sectionIds = [
        {key: 'home', id: ''},
        {key: 'projects', id: 'projects'},
        {key: 'about', id: 'about'},
        {key: 'contact', id: 'contact'}
    ];

    $: links = [
        {name: $t('navbar.home'), href: '#'},
        {name: $t('navbar.projects'), href: '#projects'},
        {name: $t('navbar.about'), href: '#about'},
        {name: $t('navbar.contact'), href: '#contact'}
    ];

    const toggleMenu = () => {
        isOpen = !isOpen;
    };

    function updateActiveSection() {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        let found = $t('navbar.home');
        for (const sec of sectionIds) {
            const el = sec.id ? document.getElementById(sec.id) : document.body;
            if (!el) continue;
            // Si es la última sección, la activamos si el scroll está cerca del final
            if (sec.key === 'contact') {
                if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 10) {
                    found = $t('navbar.contact');
                }
            } else if (window.scrollY >= el.offsetTop - navbarHeight) {
                found = $t(`navbar.${sec.key}`);
            }
        }
        activeSection = found;
    }

    onMount(() => {
        window.addEventListener('scroll', updateActiveSection);
        updateActiveSection();
        return () => window.removeEventListener('scroll', updateActiveSection);
    });
</script>

<nav class="navbar">
    <div class="logo">
        <p class="prompt">gerardo@portfolio:~$<span class="cursor">_</span></p>
    </div>
    <LangSwitch/>

    <!-- Botón Hamburger -->
    <button class="hamburger" on:click={toggleMenu}>
        ☰
    </button>

    <!-- Menú en escritorio -->
    <ul class="nav-links desktop">
        {#each links as link}
            <li>
                <a href={link.href}
                   class:active={activeSection === link.name}>
                    {link.name}
                </a>
            </li>
        {/each}
    </ul>

    <!-- Menú en móvil -->
    {#if isOpen}
        <ul class="nav-links mobile">
            {#each links as link}
                <li><a href={link.href} on:click={() => isOpen = false}>{link.name}</a></li>
            {/each}
        </ul>
    {/if}
</nav>

<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: var(--color-bg);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 100;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
    }

    .hamburger {
        display: none;
        background: none;
        border: none;
        font-size: 2rem;
        color: var(--color-accent);
        cursor: pointer;
    }

    .prompt {
        font-family: 'Fira Code', monospace;
        color: var(--color-accent);
        margin-bottom: 1rem;
    }

    .nav-links {
        list-style: none;
        display: flex;
        gap: 1.5rem;
        margin: 0;
        padding: 0;
    }

    .nav-links li a {
        color: #fff;
        font-weight: bold;
        transition: color 0.2s;
    }

    .nav-links li a:hover {
        color: var(--color-accent);
    }

    .nav-links li a.active {
        color: var(--color-accent);
        border-bottom: 2px solid var(--color-accent);
    }

    /* Estilos móviles */
    @media (max-width: 768px) {
        .hamburger {
            display: block;
        }

        .nav-links.desktop {
            display: none;
        }

        .nav-links.mobile {
            flex-direction: column;
            position: absolute;
            top: 100%;
            right: 0;
            background: var(--color-subtle);
            width: 100%;
            padding: 1rem 2rem;
            border-top: 1px solid #333;
            animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10%);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
</style>
