<script>
    let isOpen = false;

    const links = [
        { name: 'Inicio', href: '#' },
        { name: 'Proyectos', href: '#projects' },
        { name: 'Sobre mí', href: '#about' },
        { name: 'Contacto', href: '#contact' }
    ];

    const toggleMenu = () => {
        isOpen = !isOpen;
    };
</script>

<nav class="navbar">
    <div class="logo">
        <p class="prompt">gerardo@portfolio:~$</p>
    </div>

    <!-- Botón Hamburger -->
    <button class="hamburger" on:click={toggleMenu}>
        ☰
    </button>

    <!-- Menú en escritorio -->
    <ul class="nav-links desktop">
        {#each links as link}
            <li><a href={link.href}>{link.name}</a></li>
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
        position: relative;
        z-index: 10;
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
