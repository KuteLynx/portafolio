const { onRequest } = require("firebase-functions/v2/https");
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173'
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origen no permitido por CORS'));
        }
    },
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

const myMail = 'mtz.juncogerardo@gmail.com';
const mailPassword = process.env.MAIL_PASSWORD; // Configurado en Firebase

const getTransporter = () => nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myMail,
        pass: mailPassword
    }
});

app.post('/sendContactEmail', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const mailOptions = {
            from: `"Portafolio Contacto" <${name}>`,
            to: myMail,
            replyTo: email,
            subject: `Nuevo mensaje de ${name}`,
            text: `De: ${email}\n\n${message}`
        };

        await getTransporter().sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error('Error en sendContactEmail:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.options('*', cors(corsOptions));

exports.sendContactEmail = onRequest(
    {
        cors: false, // Desactiva CORS automático de Firebase
        secrets: ['MAIL_PASSWORD'] // Importante para usar variables de entorno
    },
    app
);