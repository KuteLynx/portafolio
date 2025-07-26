<section id="contact" class="contact">
    <h2>Contacto</h2>
    <form>
        <input type="text" placeholder="Tu nombre" required />
        <input type="email" placeholder="Tu correo" required />
        <textarea rows="5" placeholder="Tu mensaje" required></textarea>
        <button type="submit">Enviar</button>
    </form>
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

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    input, textarea {
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

    button:hover {
        background: #00e6bf;
    }
</style>
