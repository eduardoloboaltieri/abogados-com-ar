const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const contactRequests = [];

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'abogados-web' });
});

app.post('/api/contacto', (req, res) => {
  const { nombre, email, telefono = '', asunto, mensaje } = req.body || {};

  if (!nombre || !email || !asunto || !mensaje) {
    return res.status(400).json({ error: 'Completa todos los campos obligatorios.' });
  }

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailIsValid) {
    return res.status(400).json({ error: 'Introduce un correo electrónico válido.' });
  }

  contactRequests.push({
    id: contactRequests.length + 1,
    nombre: nombre.trim(),
    email: email.trim(),
    telefono: telefono.trim(),
    asunto: asunto.trim(),
    mensaje: mensaje.trim(),
    recibidoEn: new Date().toISOString()
  });

  return res.status(201).json({ message: 'Solicitud recibida correctamente.' });
});

app.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}`);
});