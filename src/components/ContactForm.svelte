<script>
    import {t} from 'svelte-i18n';

    let name = '';
    let email = '';
    let message = '';
    let isSubmitting = false;
    let success = '';
    let error = '';
    let emailDirty = false;
    const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (event) => {
        event.preventDefault();
        success = '';
        error = '';
        if (!name || !email || !message) {
            error = t('contact.required');
            return;
        }
        if (!emailIsValid(email)) {
            error = t('contact.invalid_email');
            return;
        }
        isSubmitting = true;
        try {
            const res = await fetch('https://sendcontactemail-z2yos4oceq-uc.a.run.app/sendContactEmail', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email, message})
            });
            if (res.ok) {
                success = t('contact.success');
                name = '';
                email = '';
                message = '';
                emailDirty = false;
            } else {
                error = t('contact.error');
            }
        } catch (err) {
            error = t('contact.server_error');
        } finally {
            isSubmitting = false;
        }
    };
</script>

<section class="contact" id="contact">
    <div class="container">
        <div class="contact-header">
            <h2 class="section-title gradient-text">{$t('contact.title')}</h2>
            <p class="section-subtitle">{$t('contact.subtitle')}</p>
        </div>

        <div class="contact-content">
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

            <form class="contact-form" on:submit|preventDefault={handleSubmit}>
                <div class="form-group">
                    <label class="form-label" for="name">{$t('contact.name')}</label>
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
                    <label class="form-label" for="email">{$t('contact.email')}</label>
                    <input
                            bind:value={email}
                            class="form-input"
                            class:error={emailDirty && !emailIsValid(email)}
                            id="email"
                            on:input={() => emailDirty = true}
                            placeholder={$t('contact.placeholders.email')}
                            required
                            type="email"
                    />
                    {#if emailDirty && !emailIsValid(email)}
                        <p class="error-message">{$t('contact.invalid_email')}</p>
                    {/if}
                </div>

                <div class="form-group">
                    <label class="form-label" for="message">{$t('contact.message')}</label>
                    <textarea
                            bind:value={message}
                            class="form-textarea"
                            id="message"
                            placeholder={$t('contact.placeholders.message')}
                            required
                            rows="5"
                    ></textarea>
                </div>

                <button
                        class="submit-btn btn-animate"
                        disabled={!name || !email || !message || !emailIsValid(email) || isSubmitting}
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
            </form>
        </div>

        {#if success}
            <div class="message success-message">
                <i class="fas fa-check-circle message-icon"></i>
                <span>{success}</span>
            </div>
        {/if}
        {#if error}
            <div class="message error-message">
                <i class="fas fa-times-circle message-icon"></i>
                <span>{error}</span>
            </div>
        {/if}
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
        display: block;
        margin-bottom: var(--spacing-sm);
        color: var(--color-text);
        font-weight: 500;
        font-size: 0.9rem;
    }

    .form-input,
    .form-textarea {
        width: 100%;
        background: var(--color-bg-secondary);
        border: 2px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text);
        padding: var(--spacing-md);
        font-family: var(--font-secondary);
        font-size: 1rem;
        transition: all var(--transition-normal);
        resize: vertical;
    }

    .form-input:focus,
    .form-textarea:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        background: var(--color-bg);
    }

    .form-input.error {
        border-color: var(--color-error);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .error-message {
        color: var(--color-error);
        font-size: 0.8rem;
        margin-top: var(--spacing-xs);
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
    }

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
    }

    .submit-btn i {
        font-size: 1.2rem;
    }

    .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .message {
        max-width: 600px;
        margin: var(--spacing-lg) auto 0;
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        font-weight: 500;
        animation: slideUp 0.4s ease-out;
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
        font-size: 1.2rem;
    }

    /* Responsive Design */
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
    }
</style>
