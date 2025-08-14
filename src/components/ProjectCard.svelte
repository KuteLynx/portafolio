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

<div class="card project-card card-hover">
    <div class="card-header">
        <h3 class="project-title gradient-text">{title}</h3>
    </div>

    <p class="description">{description}</p>

    {#if images && images.length}
        <div class="images-container">
            <div class="images-grid">
                {#each images as img, index}
                    <div class="image-wrapper" style="animation-delay: {index * 0.1}s" on:click={() => openModal(img)} role="button" tabindex="0" aria-label={`Abrir imagen de ${title}`} on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && openModal(img)}>
                        <img
                                src={img}
                                alt={title + ' screenshot'}
                                class="project-image"
                                on:click={() => openModal(img)}
                        />
                        <div class="image-overlay">
                            <span class="view-text">{$t('project_card.click_to_view')}</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <div class="tech-stack">
        <h4 class="tech-title">{$t('project_card.technologies')}</h4>
        <div class="tech-grid">
            {#each tech as techItem, index}
                <span class="tech-chip" style="animation-delay: {index * 0.05}s">
                    {techItem}
                </span>
            {/each}
        </div>
    </div>

    <div class="project-links">
        {#if repo}
            <a href={repo} target="_blank" class="project-link btn-animate">
                <i class="fas fa-folder"></i>
                <span class="link-text">{$t('project_card.code')}</span>
            </a>
        {/if}
        {#if apiRepo}
            <a href={apiRepo} target="_blank" class="project-link btn-animate">
                <i class="fas fa-cogs"></i>
                <span class="link-text">{$t('project_card.api')}</span>
            </a>
        {/if}
        {#if demo}
            <a href={demo} target="_blank" class="project-link btn-animate primary">
                <i class="fas fa-rocket"></i>
                <span class="link-text">{$t('project_card.demo')}</span>
            </a>
        {/if}
    </div>
</div>

{#if modalImg}
    <div class="modal" on:click|self={closeModal} role="dialog" aria-modal="true" tabindex="0" aria-label="Vista previa de imagen" on:keydown={(e) => e.key === 'Escape' && closeModal()}>
        <div class="modal-content">
            <button class="close-btn" on:click={closeModal} aria-label="{$t('project_card.close')}">
                <i class="fas fa-times"></i>
            </button>
            <img src={modalImg} alt="{$t('project_card.screenshot')}" class="modal-image"/>
        </div>
    </div>
{/if}

<style>
    .project-card {
        background: var(--gradient-card);
        border: 1px solid var(--color-border);
        border-radius: 16px;
        padding: var(--spacing-xl);
        margin-bottom: var(--spacing-xl);
        position: relative;
        overflow: hidden;
        transition: all var(--transition-normal);
        cursor: pointer;
    }

    .project-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--gradient-primary);
        transform: scaleX(0);
        transition: transform var(--transition-normal);
    }

    .project-card:hover::before {
        transform: scaleX(1);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--spacing-md);
    }

    .project-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
    }

    .description {
        color: var(--color-text-secondary);
        line-height: 1.7;
        margin-bottom: var(--spacing-lg);
        font-size: 1rem;
    }

    .images-container {
        margin-bottom: var(--spacing-lg);
    }

    .images-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--spacing-md);
    }

    .image-wrapper {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        transition: all var(--transition-normal);
        opacity: 0;
        transform: translateY(20px);
        animation: slideUp 0.6s ease-out forwards;
    }

    .image-wrapper:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-xl);
    }

    .project-image {
        width: 100%;
        height: 150px;
        object-fit: cover;
        transition: all var(--transition-normal);
        cursor: pointer;
    }

    .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity var(--transition-normal);
    }

    .image-wrapper:hover .image-overlay {
        opacity: 1;
    }

    .view-text {
        color: white;
        font-weight: 500;
        font-size: 0.9rem;
    }

    .tech-stack {
        margin-bottom: var(--spacing-lg);
    }

    .tech-title {
        font-size: 1rem;
        color: var(--color-text);
        margin-bottom: var(--spacing-sm);
        font-weight: 600;
    }

    .tech-grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
    }

    .tech-chip {
        background: var(--gradient-secondary);
        color: var(--color-bg);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        border: none;
        transition: all var(--transition-normal);
        opacity: 0;
        transform: scale(0.8);
        animation: scaleIn 0.4s ease-out forwards;
    }

    .tech-chip:hover {
        transform: scale(1.05);
        box-shadow: var(--shadow-md);
    }

    .project-links {
        display: flex;
        gap: var(--spacing-md);
        flex-wrap: wrap;
    }

    .project-link {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-sm) var(--spacing-md);
        background: var(--color-bg-secondary);
        color: var(--color-text);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        text-decoration: none;
        transition: all var(--transition-normal);
        position: relative;
        overflow: hidden;
    }

    .project-link:hover {
        background: var(--color-accent);
        color: var(--color-bg);
        border-color: var(--color-accent);
        transform: translateY(-2px);
    }

    .project-link.primary {
        background: var(--gradient-primary);
        color: var(--color-bg);
        border-color: transparent;
    }

    .project-link.primary:hover {
        background: var(--color-accent-hover);
        transform: translateY(-2px);
    }

    .project-link i {
        font-size: 1rem;
    }

    /* Modal Styles */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    }

    .modal-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: var(--shadow-xl);
        border: 2px solid var(--color-accent);
    }

    .modal-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        background: var(--color-bg);
    }

    .close-btn {
        position: absolute;
        top: var(--spacing-md);
        right: var(--spacing-md);
        background: rgba(0, 0, 0, 0.8);
        border: none;
        color: var(--color-accent);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        transition: all var(--transition-normal);
        z-index: 10;
    }

    .close-btn:hover {
        background: var(--color-accent);
        color: var(--color-bg);
        transform: scale(1.1);
    }

    /* Animations */
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    @keyframes slideUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes scaleIn {
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .project-card {
            padding: var(--spacing-lg);
        }

        .card-header {
            flex-direction: column;
            gap: var(--spacing-sm);
        }

        .images-grid {
            grid-template-columns: 1fr;
        }

        .project-links {
            flex-direction: column;
        }

        .project-link {
            justify-content: center;
        }
    }
</style>
