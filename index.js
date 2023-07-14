const express = require('express');
const bodyParser = require('body-parser')
listaJugadores = require('./data/listaJugadores.json')
const port = 3000;
const app = express();
const fs = require('fs/promises')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Escuchando servidor en el puerto ${port}`);
})

app.get('/api/jugadores', (req, res) => {
    res.send(listaJugadores.listaJugadores)
})

const jugadorParticular = (id) => {
    return listaJugadores.listaJugadores.find((j) => j.id == id)
}

app.get('/api/jugadores/:id', (req, res) => {
    let id = req.params.id;
    res.send(jugadorParticular(id))
})

app.post('/api/jugadores', async (req, res) => {
    let nuevoJugador = {id: `${listaJugadores.listaJugadores.length +1}`, ...req.body}
    console.log(nuevoJugador);
    listaJugadores.listaJugadores.push(nuevoJugador)
    await fs.writeFile('./data/listaJugadores.json', JSON.stringify(listaJugadores, null, 2))
    res.send(listaJugadores)
})