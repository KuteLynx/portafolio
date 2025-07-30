<script>
    let name = '';
    let email = '';
    let message = '';
    let isSubmitting = false;
    let success = '';
    let error = '';

    let emailDirty = false;

    // Regex simple para validar email
    const emailIsValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        success = '';
        error = '';

        if (!name || !email || !message) {
            error = 'Todos los campos son obligatorios';
            return;
        }

        if (!emailIsValid(email)) {
            error = 'El correo no tiene un formato válido';
            return;
        }

        isSubmitting = true;

        try {
            const res = await fetch('https://sendcontactemail-z2yos4oceq-uc.a.run.app/sendContactEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            if (res.ok) {
                success = '¡Mensaje enviado correctamente!';
                name = '';
                email = '';
                message = '';
                emailDirty = false;
            } else {
                error = 'Error al enviar el mensaje.';
            }
        } catch (err) {
            error = 'No se pudo conectar con el servidor.';
            console.log(err);
        } finally {
            isSubmitting = false;
        }
    };
</script>

<section id="contact" class="contact">
    <h2>Contacto</h2>

    <form on:submit|preventDefault={handleSubmit}>
        <input
                type="text"
                placeholder="Tu nombre"
                bind:value={name}
                required
        />

        <input
                type="email"
                placeholder="Tu correo"
                bind:value={email}
                on:input={() => emailDirty = true}
                required
        />
        {#if emailDirty && !emailIsValid(email)}
            <p class="error-mail">
                This is not valid email
            </p>
        {/if}

        <textarea
                rows="5"
                placeholder="Tu mensaje"
                bind:value={message}
                required
        ></textarea>

        <button
                type="submit"
                disabled={!name || !email || !message || !emailIsValid(email) || isSubmitting}
        >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
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
