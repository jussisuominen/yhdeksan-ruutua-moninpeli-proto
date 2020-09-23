const express = require('express');
const app = express();

let ruudut = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
let vuoro = 1;

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    console.log(req.query);
    const pelaaja = req.query.pelaaja;

    // if(req.query.ruutu && req.query.pelaaja == vuoro) {
    //     // Aseta nappula ruutuun.
    //     pelilauta[req.query.ruutu] = req.query.pelaaja;
    //     // Siirrä vuoro toiselle pelaajalle
    //     console.log(vuoro);
    //     vuoro = vuoro == 1 ? 2 : 1;
    // }

    // console.log('Vuoro: ' + vuoro);

    res.render('index', { ruudut, pelaaja, vuoro })
    //console.log(pelilauta)
});

app.get('/aseta-nappula', (req, res) => {
    console.log('Asetetaan nappulaa...');

    // Aseta nappula ruutuun, jos se on tyhjä
    ruudut[req.query.ruutu] = req.query.pelaaja;

    if(vuoro == 1) {
        vuoro = 2;
    } else {
        vuoro = 1;
    }

    res.redirect('/?pelaaja=' + req.query.pelaaja);
});

app.get('/vuoro', (req, res) => {
    res.send({ vuoro });
});

app.listen(3000, () => {
    console.log(`Palvelin on toiminnassa. Osoite: http://localhost:3000`)
});