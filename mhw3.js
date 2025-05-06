//Gestione carrello 

function bloccaEvento(event) {
  event.preventDefault();
}

const carrello = [];
const listaCarrello = document.getElementById('lista-carrello');
const totaleElement = document.getElementById('totale');
const carrelloMenu = document.getElementById('contenuto-carrello');
const toggleCarrello = document.getElementById('toggle-carrello');

function mostraCarrello(event) {
  bloccaEvento(event);
  
  if (carrelloMenu.style.display == 'block') {
    carrelloMenu.style.display = 'none';
  } else {
    carrelloMenu.style.display = 'block';
  }
}

toggleCarrello.addEventListener('click', mostraCarrello);

function aggiornaCarrello() {
  listaCarrello.innerHTML = '';
  let totale = 0;

  for (let i = 0; i < carrello.length; i++) {
    let riga = carrello[i].nome + ': ' + carrello[i].prezzo + '€<br>';
    listaCarrello.innerHTML += riga;
    totale += carrello[i].prezzo;
  }
  totaleElement.textContent = totale;
}

function aggiungiAlCarrello(event) {
  const bottone = event.currentTarget;
  const nome = bottone.getAttribute('data-id');
  const prezzo = Number(bottone.getAttribute('data-prezzo')); // me lo converte in numero

  carrello.push({ nome: nome, prezzo: prezzo });
  aggiornaCarrello();
  alert(nome + ' aggiunto al carrello!');
}

const bottoniCarrello = document.getElementsByClassName('aggiungi-carrello');
for (let i = 0; i < bottoniCarrello.length; i++) {
  bottoniCarrello[i].addEventListener('click', aggiungiAlCarrello);
}







//Cerca destinazione

function cercaDestinazione(event) {
  event.preventDefault(); 

  const valore = campo.value.toLowerCase();
  let trovata = false;

  for (let i = 0; i < destinazioni.length; i++) {
    const nome = destinazioni[i].dataset.nome.toLowerCase();
    if (nome.includes(valore)) {
      destinazioni[i].style.display = 'block';
      trovata = true;
    } else {
      destinazioni[i].style.display = 'none';
    }
  }

  if (trovata) {
    messaggio.style.display = 'none';
  } else {
    messaggio.style.display = 'block';
  }
}

const campo = document.getElementById('search');
const formDest = document.getElementById('form-destinazione');
const destinazioni = document.querySelectorAll('.destinazioni');
const messaggio = document.getElementById('nessun-risultato');

formDest.addEventListener('submit', cercaDestinazione);







//banner
const offerta = document.createElement('div');
offerta.textContent = '🌍 Sconto 10% se ti iscrivi al newsletter!';
offerta.classList.add('offerta-banner');

const blocchi = document.querySelector('#blocchi');
document.body.insertBefore(offerta, blocchi);







//Cambia immagine al passaggio del mouse su Bali
function cambiaImmagineBali() {
  this.src = 'https://image.urlaubspiraten.de/1024/image/upload/v1613576344/mediavault_images/GettyImages-1167728368_ssldi2.jpg';
}

function ripristinaImmagineBali() {
  this.src = 'https://image.urlaubspiraten.de/1280/image/upload/v1628092143/mediavault_images/AdobeStock_103587221_or1mfx.jpg';
}

const immagineBali = document.querySelector('.destinazioni img');
immagineBali.addEventListener('mouseenter', cambiaImmagineBali);
immagineBali.addEventListener('mouseleave', ripristinaImmagineBali);







// "Leggi di più"
function mostraNascondiDettagli(event) {
  const bottone = event.currentTarget;
  const dettagli = bottone.previousElementSibling;

  if (dettagli.classList.contains('nascosto')) {
    dettagli.classList.remove('nascosto');
    bottone.textContent = 'Mostra meno';
  } else {
    dettagli.classList.add('nascosto');
    bottone.textContent = 'Leggi di più';
  }
}

const bottoni = document.querySelectorAll('.toggle-dettagli');
for (let i = 0; i < bottoni.length; i++) {
  bottoni[i].addEventListener('click', mostraNascondiDettagli);
}







//preferiti
function gestisciPreferito(event) {
  const cuore = event.currentTarget;
  cuore.classList.toggle('preferito');

  const testo = cuore.nextElementSibling;
  const nomeDestinazione = cuore.getAttribute('data-id'); 

  if (cuore.classList.contains('preferito')) {
    testo.textContent = 'Aggiunto ai preferiti';
    alert('Hai aggiunto ' + nomeDestinazione + ' ai preferiti!');
  } else {
    testo.textContent = 'Aggiungi ai preferiti';
    alert('Hai rimosso ' + nomeDestinazione + ' dai preferiti.');
  }
}

const cuori = document.querySelectorAll('.icona-cuore');
for (let i = 0; i < cuori.length; i++) {
  cuori[i].addEventListener('click', gestisciPreferito);
}







//Playlist per la vacanza con SPOTIFY

const client_id = 'secret';
const client_secret = 'secret';
let token = '';

fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  body: 'grant_type=client_credentials',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
  }
}).then(onTokenResponse).then(onTokenJson);

function onTokenResponse(response) {
  return response.json();
}

function onTokenJson(json) {
  token = json.access_token;
}

function searchPlaylist(event) {
  event.preventDefault(); 

  const moodInput = document.querySelector('#mood');
  const mood = encodeURIComponent(moodInput.value);

  console.log("Cerco playlist per: " + mood);

  fetch("https://api.spotify.com/v1/search?type=playlist&q=" + mood, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(onPlaylistResponse)
    .then(onPlaylistJson);
}

function onPlaylistResponse(response) {
  return response.json();
}

function onPlaylistJson(json) {
  const library = document.querySelector('#album-view');
  library.innerHTML = '';

  const results = json.playlists.items;
  const maxResults = Math.min(5, results.length);

  for (let i = 0; i < maxResults; i++) {
    const playlist = results[i];
    const title = playlist.name;
    const image = playlist.images[0].url;

    const div = document.createElement('div');
    div.classList.add('album');

    const img = document.createElement('img');
    img.src = image;

    const caption = document.createElement('span');
    caption.textContent = title;

    div.appendChild(img);
    div.appendChild(caption);
    library.appendChild(div);
  }
}

document.getElementById('form-playlist').addEventListener('submit', searchPlaylist);







// Meteo
var formMeteo = document.getElementById('form-meteo');

formMeteo.addEventListener('submit', gestisciSubmitMeteo);

function gestisciSubmitMeteo(event) {
  event.preventDefault();
  var citta = document.getElementById('citta').value;
  cercaMeteo(citta);
}

function cercaMeteo(citta) {
  var apiKey = 'secret';
  var endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=' + citta + '&units=metric&appid=' + apiKey + '&lang=it';

  fetch(endpoint)
    .then(onMeteoResponse)
    .then(onMeteoJson);
}

function onMeteoResponse(response) {
  return response.json();
}

function onMeteoJson(json) {
  document.getElementById('nome-citta').textContent = json.name;
  document.getElementById('descrizione-meteo').textContent = json.weather[0].description;
  document.getElementById('icona-meteo').src = 'https://openweathermap.org/img/wn/' + json.weather[0].icon + '@2x.png';
  document.getElementById('icona-meteo').style.display = 'inline';
  document.getElementById('temperatura').textContent = json.main.temp;
}