/**
 * Contact Form Worker — Resend + Cloudflare Turnstile
 *
 * Recibe POST desde el formulario de contacto, valida el captcha
 * de Turnstile y envía el correo via Resend API.
 *
 * Endpoint: POST https://contact-form.lordofcats.workers.dev
 *
 * Body esperado:
 *   { name: string, email: string, message: string, turnstileToken: string }
 *
 * Respuestas:
 *   200 { success: true }
 *   400 { success: false, error: "mensaje" }
 *   500 { success: false, error: "Error interno" }
 */

// ─── Validación ───────────────────────────────────────────────────────────────

/** @param {string} email */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** @param {string} str */
function sanitize(str) {
  return str.trim().replace(/[<>]/g, '');
}

// ─── Turnstile Verification ───────────────────────────────────────────────────

/**
 * Valida el token de Cloudflare Turnstile.
 * @param {string} token
 * @param {string} secretKey
 * @returns {Promise<boolean>}
 */
async function verifyTurnstile(token, secretKey) {
  const formData = new FormData();
  formData.append('secret', secretKey);
  formData.append('response', token);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  return data.success === true;
}

// ─── Resend Email ─────────────────────────────────────────────────────────────

/**
 * Envía un correo usando la API de Resend.
 * @param {Object} params
 * @param {string} params.apiKey
 * @param {string} params.fromEmail
 * @param {string} params.fromName
 * @param {string} params.toEmail
 * @param {string} params.name
 * @param {string} params.senderEmail
 * @param {string} params.message
 * @returns {Promise<void>}
 */
async function sendEmail({ apiKey, fromEmail, fromName, toEmail, name, senderEmail, message }) {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; background: #0a0a0a; color: #e0e0e0; padding: 40px;">
  <div style="max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 12px; padding: 32px; border: 1px solid #333;">
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="font-size: 48px;">🐱</span>
      <h1 style="color: #ff6b35; margin: 8px 0 0;">Nuevo mensaje de contacto</h1>
    </div>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px; color: #888; width: 100px; vertical-align: top; border-bottom: 1px solid #333;">
          <strong>Nombre</strong>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #333;">${sanitize(name)}</td>
      </tr>
      <tr>
        <td style="padding: 12px; color: #888; width: 100px; vertical-align: top; border-bottom: 1px solid #333;">
          <strong>Email</strong>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #333;">
          <a href="mailto:${sanitize(senderEmail)}" style="color: #00d4aa;">${sanitize(senderEmail)}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px; color: #888; width: 100px; vertical-align: top;">
          <strong>Mensaje</strong>
        </td>
        <td style="padding: 12px; white-space: pre-wrap; line-height: 1.6;">${sanitize(message)}</td>
      </tr>
    </table>

    <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;" />

    <p style="color: #666; font-size: 12px; text-align: center;">
      Enviado desde el portafolio lordofcats.online
    </p>
  </div>
</body>
</html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [toEmail],
      reply_to: senderEmail,
      subject: `🐱 Nuevo contacto de ${sanitize(name)} — ${sanitize(senderEmail)}`,
      html: htmlContent,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Resend error (${res.status}): ${errBody}`);
  }
}

// ─── CORS Headers ─────────────────────────────────────────────────────────────

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

/**
 * @param {Response} response
 * @returns {Response}
 */
function addCors(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(corsHeaders)) {
    headers.set(key, value);
  }
  return new Response(response.body, { status: response.status, headers });
}

// ─── Handler Principal ────────────────────────────────────────────────────────

export default {
  /** @param {Request} request @param {{ RESEND_API_KEY: string, TURNSTILE_SECRET_KEY: string, TO_EMAIL: string, FROM_EMAIL: string, FROM_NAME: string }} env */
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return addCors(new Response(null, { status: 204 }));
    }

    if (request.method !== 'POST') {
      return addCors(
        new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    }

    // Validar que las variables de entorno estén configuradas
    if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY) {
      console.error('Missing environment variables: RESEND_API_KEY or TURNSTILE_SECRET_KEY');
      return addCors(
        new Response(JSON.stringify({ success: false, error: 'Server configuration error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    }

    try {
      /** @type {{ name?: string, email?: string, message?: string, turnstileToken?: string }} */
      const body = await request.json();

      const name = body.name?.trim();
      const senderEmail = body.email?.trim();
      const message = body.message?.trim();
      const turnstileToken = body.turnstileToken?.trim();

      // ── Validaciones ──
      if (!name || !senderEmail || !message) {
        return addCors(
          new Response(JSON.stringify({ success: false, error: 'Todos los campos son obligatorios.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        );
      }

      if (!isValidEmail(senderEmail)) {
        return addCors(
          new Response(JSON.stringify({ success: false, error: 'El correo no tiene un formato válido.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        );
      }

      if (!turnstileToken) {
        return addCors(
          new Response(JSON.stringify({ success: false, error: 'Token de verificación no proporcionado.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        );
      }

      // ── Verificar Turnstile ──
      const turnstileValid = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY);
      if (!turnstileValid) {
        return addCors(
          new Response(JSON.stringify({ success: false, error: 'Verificación de seguridad fallida.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        );
      }

      // ── Enviar Email via Resend ──
      await sendEmail({
        apiKey: env.RESEND_API_KEY,
        fromEmail: env.FROM_EMAIL,
        fromName: env.FROM_NAME,
        toEmail: env.TO_EMAIL,
        name,
        senderEmail,
        message,
      });

      return addCors(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    } catch (err) {
      console.error('Unhandled error:', err);
      return addCors(
        new Response(JSON.stringify({ success: false, error: 'Error interno del servidor.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    }
  },
};
