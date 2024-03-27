import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.static(path.join(__dirname, 'client/build')));

// Inicializaoms la ruta de fallback para servir la app React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// inicializamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: http://localhost:${PORT}`);
})