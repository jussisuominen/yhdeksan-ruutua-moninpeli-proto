const express = require('express');
const app = express();

// Seuraava taulukko edustaa pelilaudan ruutuja. Jokainen taulukon alkio
// vastaa ruudun tilaa eli sitä, onko se tyhjä (0) vai onko ruudussa
// pelaajan 1 tai 2 nappula. Tämä muuttuja välitetään päänäkymälle (views/index.js),
// joka sitten piirtää pelilaudan tämän taulukon arvojen perusteella.
let ruudut = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
let vuoro = 1; // Kumpi pelaaja on vuorossa?
let nappuloitaAsetettu = [0, 0]; // Kuinka paljon pelaaja on asettanut nappuloita?
let peliPäättynyt = false; 

app.set('view engine', 'ejs')

// Tämä on sovelluksen pääreitti, joka näyttää sovelluksen päänäkymän (index.ejs). Reitissä
// myös tarkistetaan jokaisen siirron jälkeen, onko jompi kumpi pelaajista saanut muodostettua
// rivin.
app.get('/', (req, res) => {
    console.log(req.query);
    console.log(nappuloitaAsetettu);

    const pelaaja = req.query.pelaaja;

    console.log(pelaaja);

    // if(req.query.ruutu && req.query.pelaaja == vuoro) {
    //     // Aseta nappula ruutuun.
    //     pelilauta[req.query.ruutu] = req.query.pelaaja;
    //     // Siirrä vuoro toiselle pelaajalle
    //     console.log(vuoro);
    //     vuoro = vuoro == 1 ? 2 : 1;
    // }

    // console.log('Vuoro: ' + vuoro);

    // Tarkista, onko rivi muodostettu.
    for(i = 0; i < 9; i++) {
        if(ruudut[i] == 1 && ruudut[i+1] == 1 && ruudut[i+2] == 1) {
            console.log("Rivi muodostettu!");
            peliPäättynyt = true;
        }
    }

    res.render('index', { ruudut, pelaaja, vuoro, peliPäättynyt, nappuloitaAsetettu: nappuloitaAsetettu[pelaaja-1] })
    //console.log(pelilauta)
});

app.get('/aseta-nappula', (req, res) => {
    console.log('Asetetaan nappulaa...');

    const pelaaja = req.query.pelaaja;

    // Aseta nappula ruutuun.
    ruudut[req.query.ruutu] = req.query.pelaaja;

    // Siirrä vuoro toiselle pelaajalle.
    if(vuoro == 1) {
        vuoro = 2;
    } else {
        vuoro = 1;
    }

    nappuloitaAsetettu[pelaaja-1]++;

    // Uudelleenohjaa päänäkymään ja välitä parametrina pelaajan numero
    res.redirect('/?pelaaja=' + req.query.pelaaja);
});

// Tämä reitti palauttaa yksinkertaisesti vuorossa olevan pelaajan. Tätä reittiä
// hyödynnetään päänäkymässä silloin, kun odotetaan vastustajan siirtoa. Päänäkymä pyytää
// tällöin axios:in avulla tiedon vuorossa olevasta pelaajasta sekunnin välein. Tästä
// löydät lisää kommentteja tiedostosta index.ejs.
app.get('/vuoro', (req, res) => {
    res.send({ vuoro });
});

app.listen(3000, () => {
    console.log(`Palvelin on toiminnassa. Osoite: http://localhost:3000`)
});