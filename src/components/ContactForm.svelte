<script>
    /* global turnstile */
    import {t} from 'svelte-i18n';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    const translateHelper = (key) => {
        try { return get(t)(key); } catch { return key; }
    };

    let name = $state('');
    let email = $state('');
    let message = $state('');
    let isSubmitting = $state(false);
    let successMsg = $state('');
    let errorMsg = $state('');
    let emailDirty = $state(false);
    let formDisabled = $state(false);
    let turnstileToken = $state(null);
    let turnstileLoaded = $state(false);
    let turnstileWidgetId = $state(null);

    /** @type {HTMLDivElement|null} */
    let turnstileContainer = $state(null);

    const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    function loadTurnstileScript() {
        return new Promise((/** @type {(value: unknown) => void} */ resolve) => {
            if (window.turnstile) {
                turnstileLoaded = true;
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=_turnstileOnLoad';
            script.async = true;
            script.defer = true;
            window._turnstileOnLoad = () => {
                turnstileLoaded = true;
                resolve();
            };
            document.head.appendChild(script);
        });
    }

    function renderTurnstile() {
        if (!window.turnstile || !turnstileContainer) return;
        if (turnstileWidgetId) {
            window.turnstile.reset(turnstileWidgetId);
            return;
        }
        turnstileWidgetId = window.turnstile.render(turnstileContainer, {
            sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
            callback: (/** @type {string} */ token) => {
                turnstileToken = token;
            },
            'expired-callback': () => {
                turnstileToken = null;
            },
            'error-callback': () => {
                turnstileToken = null;
                errorMsg = translateHelper('contact.turnstile_error');
            },
            theme: 'dark',
            size: 'normal'
        });
    }

    onMount(() => {
        try {
            const stored = localStorage.getItem('contactFormDisabled');
            if (stored === 'true') {
                formDisabled = true;
                successMsg = translateHelper('contact.success');
            }
        } catch { /* no-op */ }

        loadTurnstileScript().then(() => renderTurnstile());
    });

    /** @param {Event} e */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formDisabled) return;

        successMsg = '';
        errorMsg = '';

        if (!name || !email || !message) {
            errorMsg = translateHelper('contact.required');
            return;
        }
        if (!emailIsValid(email)) {
            errorMsg = translateHelper('contact.invalid_email');
            return;
        }
        if (!turnstileToken) {
            errorMsg = translateHelper('contact.turnstile_required');
            return;
        }

        isSubmitting = true;

        const apiUrl = import.meta.env.VITE_CONTACT_API_URL || 'http://localhost:8787';
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                message,
                turnstileToken
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    successMsg = translateHelper('contact.success');
                    name = '';
                    email = '';
                    message = '';
                    emailDirty = false;
                    turnstileToken = null;
                    formDisabled = true;
                    try { localStorage.setItem('contactFormDisabled', 'true'); } catch { /* no-op */ }
                    if (turnstileWidgetId && window.turnstile) {
                        window.turnstile.reset(turnstileWidgetId);
                    }
                } else {
                    errorMsg = data.error || translateHelper('contact.error');
                }
            })
            .catch((/** @type {Error} */ err) => {
                errorMsg = translateHelper('contact.server_error');
                console.error('Contact form error:', err);
            })
            .finally(() => {
                isSubmitting = false;
            });
    };

    const handleReset = () => {
        formDisabled = false;
        successMsg = '';
        errorMsg = '';
        try { localStorage.removeItem('contactFormDisabled'); } catch { /* no-op */ }
        if (turnstileWidgetId && window.turnstile) {
            window.turnstile.reset(turnstileWidgetId);
        }
        turnstileToken = null;
    };
</script>

<section class="contact" id="contact">
    <div class="container">
        <div class="contact-header">
            <h2 class="section-title gradient-text">{$t('contact.title')}</h2>
            <p class="section-subtitle">{$t('contact.subtitle')}</p>
        </div>

        <div class="contact-content">
            <!-- Info Cards -->
            <div class="contact-info">
                <div class="info-card">
                    <div class="info-icon"><i class="fas fa-comments"></i></div>
                    <h3>{$t('contact.info.get_in_touch.title')}</h3>
                    <p>{$t('contact.info.get_in_touch.description')}</p>
                </div>
                <div class="info-card">
                    <div class="info-icon"><i class="fas fa-bolt"></i></div>
                    <h3>{$t('contact.info.quick_response.title')}</h3>
                    <p>{$t('contact.info.quick_response.description')}</p>
                </div>
                <div class="info-card">
                    <div class="info-icon"><i class="fas fa-handshake"></i></div>
                    <h3>{$t('contact.info.collaborate.title')}</h3>
                    <p>{$t('contact.info.collaborate.description')}</p>
                </div>
            </div>

            <!-- Formulario -->
            <form class="contact-form" onsubmit={handleSubmit}>
                {#if formDisabled && successMsg}
                    <div class="form-disabled-message">
                        <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                        <h3>{$t('contact.thanks')}</h3>
                        <p>{successMsg}</p>
                        <button type="button" class="reset-btn" onclick={handleReset}>
                            <i class="fas fa-redo"></i>
                            <span>{$t('contact.send_again')}</span>
                        </button>
                    </div>
                {:else}
                    <div class="form-group">
                        <label class="form-label" for="name">
                            <i class="fas fa-user"></i> {$t('contact.name')}
                        </label>
                        <input
                            bind:value={name}
                            class="form-input"
                            id="name"
                            placeholder={$t('contact.placeholders.name')}
                            required
                            type="text"
                        />
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="email">
                            <i class="fas fa-envelope"></i> {$t('contact.email')}
                        </label>
                        <input
                            bind:value={email}
                            class="form-input"
                            class:input-error={emailDirty && !emailIsValid(email)}
                            id="email"
                            oninput={() => emailDirty = true}
                            placeholder={$t('contact.placeholders.email')}
                            required
                            type="email"
                        />
                        {#if emailDirty && !emailIsValid(email)}
                            <p class="field-error">
                                <i class="fas fa-exclamation-circle"></i>
                                {$t('contact.invalid_email')}
                            </p>
                        {/if}
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="message">
                            <i class="fas fa-comment-dots"></i> {$t('contact.message')}
                        </label>
                        <textarea
                            bind:value={message}
                            class="form-textarea"
                            id="message"
                            placeholder={$t('contact.placeholders.message')}
                            required
                            rows="5"
                        ></textarea>
                    </div>

                    <!-- Turnstile Widget -->
                    <div class="form-group">
                        <div
                            bind:this={turnstileContainer}
                            class="turnstile-wrapper"
                            class:turnstile-loaded={turnstileLoaded}
                        ></div>
                    </div>

                    <!-- Messages -->
                    {#if successMsg}
                        <div class="message success-message" role="status" aria-live="polite">
                            <i class="fas fa-check-circle message-icon"></i>
                            <span>{successMsg}</span>
                        </div>
                    {/if}
                    {#if errorMsg}
                        <div class="message error-message" role="alert" aria-live="assertive">
                            <i class="fas fa-times-circle message-icon"></i>
                            <span>{errorMsg}</span>
                        </div>
                    {/if}

                    <!-- Submit Button -->
                    <button
                        class="submit-btn btn-animate"
                        disabled={!name || !email || !message || !emailIsValid(email) || isSubmitting || !turnstileToken}
                        type="submit"
                    >
                        {#if isSubmitting}
                            <span class="loading-spinner"></span>
                            <span>{$t('contact.sending')}</span>
                        {:else}
                            <i class="fas fa-paper-plane"></i>
                            <span>{$t('contact.send')}</span>
                        {/if}
                    </button>
                {/if}
            </form>
        </div>
    </div>
</section>

<style>
    .contact {
        padding: var(--spacing-2xl) 0;
        background: var(--gradient-bg);
        position: relative;
    }

    .contact::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(0, 212, 170, 0.05) 0%, transparent 50%);
        pointer-events: none;
    }

    .contact-header {
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

    .contact-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-2xl);
        max-width: 1200px;
        margin: 0 auto;
    }

    .contact-info {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .info-card {
        background: var(--gradient-card);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        padding: var(--spacing-lg);
        text-align: center;
        transition: all var(--transition-normal);
    }

    .info-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
        border-color: var(--color-accent);
    }

    .info-icon {
        font-size: 2rem;
        margin-bottom: var(--spacing-sm);
    }

    .info-card h3 {
        color: var(--color-accent);
        margin-bottom: var(--spacing-sm);
        font-size: 1.2rem;
    }

    .info-card p {
        color: var(--color-text-secondary);
        font-size: 0.9rem;
        line-height: 1.6;
    }

    /* --- Form Styles --- */
    .contact-form {
        background: var(--gradient-card);
        border: 1px solid var(--color-border);
        border-radius: 16px;
        padding: var(--spacing-xl);
        box-shadow: var(--shadow-lg);
    }

    .form-group {
        margin-bottom: var(--spacing-lg);
    }

    .form-label {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        margin-bottom: var(--spacing-sm);
        color: var(--color-text);
        font-weight: 500;
        font-size: 0.9rem;
    }

    .form-label i {
        color: var(--color-accent);
        font-size: 0.85rem;
    }

    .form-input,
    .form-textarea {
        width: 100%;
        background: var(--color-bg);
        border: 2px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text);
        padding: var(--spacing-md);
        font-family: var(--font-secondary);
        font-size: 1rem;
        transition: all var(--transition-normal);
        resize: vertical;
        box-sizing: border-box;
    }

    .form-input:focus,
    .form-textarea:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        background: var(--color-bg-secondary);
    }

    .form-input.input-error {
        border-color: var(--color-error);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .field-error {
        color: var(--color-error);
        font-size: 0.8rem;
        margin-top: var(--spacing-xs);
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
    }

    .field-error i {
        font-size: 0.75rem;
    }

    /* Turnstile */
    .turnstile-wrapper {
        display: flex;
        justify-content: center;
        min-height: 65px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .turnstile-wrapper.turnstile-loaded {
        opacity: 1;
    }

    /* Messages */
    .message {
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        font-weight: 500;
        font-size: 0.9rem;
        animation: slideUp 0.4s ease-out;
        margin-bottom: var(--spacing-lg);
    }

    .success-message {
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid var(--color-success);
        color: var(--color-success);
    }

    .error-message {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid var(--color-error);
        color: var(--color-error);
    }

    .message-icon {
        font-size: 1.1rem;
        flex-shrink: 0;
    }

    /* Submit Button */
    .submit-btn {
        width: 100%;
        padding: var(--spacing-md) var(--spacing-xl);
        background: var(--gradient-primary);
        color: var(--color-bg);
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        transition: all var(--transition-normal);
        position: relative;
        overflow: hidden;
        min-height: 48px;
    }

    .submit-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: var(--shadow-xl);
    }

    .submit-btn:disabled {
        background: var(--color-bg-secondary);
        color: var(--color-text-secondary);
        cursor: not-allowed;
        transform: none;
        opacity: 0.7;
    }

    .submit-btn i {
        font-size: 1.1rem;
    }

    .loading-spinner {
        width: 18px;
        height: 18px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Form disabled state (after success) */
    .form-disabled-message {
        text-align: center;
        padding: var(--spacing-2xl) var(--spacing-lg);
    }

    .form-disabled-message .success-icon {
        font-size: 3rem;
        color: var(--color-success);
        margin-bottom: var(--spacing-md);
    }

    .form-disabled-message h3 {
        color: var(--color-text);
        margin-bottom: var(--spacing-sm);
    }

    .form-disabled-message p {
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-lg);
        font-size: 0.95rem;
    }

    .reset-btn {
        background: transparent;
        color: var(--color-accent);
        border: 2px solid var(--color-accent);
        border-radius: 8px;
        padding: var(--spacing-sm) var(--spacing-lg);
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-xs);
        transition: all var(--transition-normal);
    }

    .reset-btn:hover {
        background: var(--color-accent);
        color: var(--color-bg);
    }

    /* Responsive */
    @media (max-width: 768px) {
        .contact-content {
            grid-template-columns: 1fr;
            gap: var(--spacing-xl);
        }

        .contact-info {
            order: 2;
        }

        .contact-form {
            order: 1;
        }

        .info-card {
            padding: var(--spacing-md);
        }

        .contact-form {
            padding: var(--spacing-lg);
        }
    }

    @media (max-width: 480px) {
        .contact {
            padding: var(--spacing-xl) 0;
        }

        .section-title {
            font-size: 2rem;
        }

        .contact-form {
            padding: var(--spacing-md);
        }

        .submit-btn {
            font-size: 0.95rem;
            padding: var(--spacing-md);
        }
    }
</style>
