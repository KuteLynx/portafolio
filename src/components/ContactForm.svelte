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
    <h2>{$t('contact.title')}</h2>
    <form on:submit|preventDefault={handleSubmit}>
        <input
                bind:value={name}
                placeholder={$t('contact.name')}
                required
                type="text"
        />

        <input
                bind:value={email}
                on:input={() => emailDirty = true}
                placeholder={$t('contact.email')}
                required
                type="email"
        />
        {#if emailDirty && !emailIsValid(email)}
            <p class="error-mail">{$t('contact.invalid_email')}</p>
        {/if}

        <textarea
                bind:value={message}
                placeholder={$t('contact.message')}
                required
                rows="5"
        ></textarea>

        <button
                disabled={!name || !email || !message || !emailIsValid(email) || isSubmitting}
                type="submit"
        >
            {isSubmitting ? $t('contact.sending') : $t('contact.send')}
        </button>
    </form>

    {#if success}
        <p style="color: green">{success}</p>
    {/if}
    {#if error}
        <p style="color: red">{error}</p>
    {/if}
</section>

<style>
    .contact {
        padding: 4rem 2rem;
        max-width: 600px;
        margin: auto;
    }

    .contact h2 {
        font-size: 2rem;
        color: var(--color-accent);
        margin-bottom: 2rem;
        text-align: center;
    }

    .error-mail {
        margin: 0;
        color: red;
        font-size: 0.9rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    input,
    textarea {
        padding: 0.75rem;
        border: 1px solid #333;
        border-radius: 8px;
        background: #1c1c1c;
        color: white;
    }

    button {
        padding: 0.75rem;
        background: var(--color-accent);
        color: #000;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
    }

    button:not(:disabled):hover {
        background: #00e6bf;
    }

    button:disabled {
        background: #555;
        color: #999;
        cursor: not-allowed;
        opacity: 0.6;
    }
</style>
