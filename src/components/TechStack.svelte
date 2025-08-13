<script>
    import {t} from 'svelte-i18n';
    import {onMount} from 'svelte';

    let mounted = false;

    const skills = [
        {name: 'JavaScript', icon: 'fab fa-js-square', category: 'frontend'},
        {name: 'TypeScript', icon: 'fab fa-js-square', category: 'frontend'},
        {name: 'Svelte', icon: 'fas fa-code', category: 'frontend'},
        {name: 'Angular', icon: 'fab fa-angular', category: 'frontend'},
        {name: 'RxJS', icon: 'fas fa-sync-alt', category: 'frontend'},
        {name: 'C#', icon: 'fas fa-hashtag', category: 'backend'},
        {name: 'ASP.NET', icon: 'fab fa-microsoft', category: 'backend'},
        {name: 'LINQ', icon: 'fas fa-search', category: 'backend'},
        {name: 'SQL', icon: 'fas fa-database', category: 'database'},
        {name: 'Git', icon: 'fab fa-git-alt', category: 'tools'},
        {name: 'Linux', icon: 'fab fa-linux', category: 'tools'}
    ];

    const categories = {
        frontend: {name: $t('techstack.categories.frontend'), color: 'var(--color-accent)'},
        backend: {name: $t('techstack.categories.backend'), color: 'var(--color-accent-secondary)'},
        database: {name: $t('techstack.categories.database'), color: 'var(--color-accent-tertiary)'},
        tools: {name: $t('techstack.categories.tools'), color: 'var(--color-warning)'}
    };

    onMount(() => {
        mounted = true;
    });
</script>

<section class="tech-stack">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title gradient-text">{$t('techstack.title')}</h2>
            <p class="section-subtitle">{$t('techstack.subtitle')}</p>
        </div>

        <div class="skills-container">
            {#each Object.entries(categories) as [categoryKey, category]}
                <div class="skill-category">
                    <h3 class="category-title" style="color: {category.color}">
                        {category.name}
                    </h3>
                    <div class="skills-grid">
                        {#each skills.filter(skill => skill.category === categoryKey) as skill, index}
                            <div class="skill-item"
                                 style="animation-delay: {index * 0.1}s"
                                 class:visible={mounted}>
                                <div class="skill-icon"><i class="{skill.icon}"></i></div>
                                <span class="skill-name">{skill.name}</span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>

        <div class="experience-indicator">
            <div class="experience-bar">
                <div class="experience-fill" class:animate={mounted}></div>
            </div>
            <p class="experience-text">{$t('techstack.experience')}</p>
        </div>
    </div>
</section>

<style>
    .tech-stack {
        padding: var(--spacing-2xl) 0;
        background: var(--gradient-bg);
        position: relative;
    }

    .tech-stack::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 70%, rgba(255, 107, 53, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, rgba(0, 212, 170, 0.03) 0%, transparent 50%);
        pointer-events: none;
    }

    .section-header {
        text-align: center;
        margin-bottom: var(--spacing-2xl);
    }

    .section-title {
        font-size: clamp(2rem, 5vw, 3rem);
        margin-bottom: var(--spacing-sm);
        font-weight: 700;
    }

    .section-subtitle {
        font-size: 1.1rem;
        color: var(--color-text-secondary);
        max-width: 600px;
        margin: 0 auto;
    }

    .skills-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--spacing-xl);
        margin-bottom: var(--spacing-2xl);
    }

    .skill-category {
        background: var(--gradient-card);
        border: 1px solid var(--color-border);
        border-radius: 16px;
        padding: var(--spacing-xl);
        transition: all var(--transition-normal);
    }

    .skill-category:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-xl);
        border-color: var(--color-accent);
    }

    .category-title {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: var(--spacing-lg);
        text-align: center;
        position: relative;
    }

    .category-title::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        height: 3px;
        background: currentColor;
        border-radius: 2px;
    }

    .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: var(--spacing-md);
    }

    .skill-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-md);
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        transition: all var(--transition-normal);
        opacity: 0;
        transform: translateY(20px);
    }

    .skill-item.visible {
        animation: slideUp 0.6s ease-out forwards;
    }

    .skill-item:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
        border-color: var(--color-accent);
        background: var(--color-bg);
    }

    .skill-icon {
        font-size: 2rem;
        margin-bottom: var(--spacing-xs);
    }

    .skill-name {
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--color-text);
        text-align: center;
    }

    .experience-indicator {
        text-align: center;
        max-width: 600px;
        margin: 0 auto;
    }

    .experience-bar {
        width: 100%;
        height: 8px;
        background: var(--color-bg-secondary);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: var(--spacing-md);
        position: relative;
    }

    .experience-fill {
        height: 100%;
        background: var(--gradient-primary);
        border-radius: 4px;
        width: 0;
        transition: width 2s ease-out;
        position: relative;
        overflow: hidden;
    }

    .experience-fill.animate {
        width: 85%;
    }

    .experience-fill::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: shimmer 2s infinite;
    }

    .experience-text {
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        font-weight: 500;
    }

    @keyframes shimmer {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }

    @keyframes slideUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .skills-container {
            grid-template-columns: 1fr;
            gap: var(--spacing-lg);
        }

        .skill-category {
            padding: var(--spacing-lg);
        }

        .skills-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: var(--spacing-sm);
        }

        .skill-item {
            padding: var(--spacing-sm);
        }

        .skill-icon {
            font-size: 1.5rem;
        }

        .skill-name {
            font-size: 0.8rem;
        }
    }

    @media (max-width: 480px) {
        .tech-stack {
            padding: var(--spacing-xl) 0;
        }

        .section-title {
            font-size: 2rem;
        }

        .skill-category {
            padding: var(--spacing-md);
        }
    }
</style>
