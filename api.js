// server.js (Node.js backend)
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Create a transporter object
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: '26-03129@formanite.fccollege.edu.pk',
        pass: 'xqou mxeo dpqs jqbe',
    },
});

// Email sending endpoint
app.post('/send-email', (req, res) => {
    const { to, subject, text, html } = req.body;

    let mailOptions = {
        from: '"Sender Name" <your-email@gmail.com>',
        to,
        subject,
        text,
        html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ error: 'Error sending email' });
        }
        res.send({ messageId: info.messageId });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
