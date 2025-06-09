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

  const formData = new FormData();
  formData.append('nome_viaggio', nome);
  formData.append('prezzo', prezzo);

  fetch('carrello_aggiungi.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      console.log('Salvato nel DB correttamente.');
    } else {
      console.error('Errore nel salvataggio:', data.error);
    }
  })
  .catch(error => {
    console.error('Errore fetch:', error);
    alert('Errore di connessione al server.');
  });
}

// Collego i pulsanti
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









function caricaViaggi() {
  fetch('api_viaggi.php')
    .then(response => response.json())
    .then(viaggi => {
      const blocchi = document.getElementById('blocchi');
      blocchi.innerHTML = ''; 

      viaggi.forEach(viaggi => {
        const div = document.createElement('div');
        div.classList.add('destinazioni');
        div.setAttribute('data-nome', viaggi.nome.toLowerCase());

        div.innerHTML = `
          <img src="${viaggi.immagine}" alt="Viaggio a ${viaggi.nome}">
          <div class="info">
              <h3>Visita ${viaggi.nome}</h3>
              <p>${viaggi.descrizione}</p>
              <p class="prezzo"><strong>A partire da ${viaggi.prezzo}€</strong></p>
              <button class="toggle-dettagli">Leggi di più</button>
              <i class="fa fa-shopping-cart aggiungi-carrello" data-id="${viaggi.nome}" data-prezzo="${viaggi.prezzo}" title="Aggiungi al carrello"></i>
              <i class="fa fa-heart icona-cuore" data-id="${viaggi.id}" data-nome="${viaggi.nome}"></i>
              <span class="testo-cuore">Aggiungi ai preferiti</span>
          </div>
        `;

        blocchi.appendChild(div);
      });

      const bottoniCarrello = document.getElementsByClassName('aggiungi-carrello');
      for (let i = 0; i < bottoniCarrello.length; i++) {
        bottoniCarrello[i].addEventListener('click', aggiungiAlCarrello);
      }

      const cuori = document.querySelectorAll('.icona-cuore');
      for (let i = 0; i < cuori.length; i++) {
        cuori[i].addEventListener('click', gestisciPreferito);
      }

      const bottoniToggle = document.querySelectorAll('.toggle-dettagli');
      for (let i = 0; i < bottoniToggle.length; i++) {
        bottoniToggle[i].addEventListener('click', mostraNascondiDettagli);
      }
    })
    .catch(error => {
      console.error('Errore fetch viaggi:', error);
    });
}

window.addEventListener('DOMContentLoaded', caricaViaggi);








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
  const idViaggio = cuore.getAttribute('data-id'); 
  const nomeDestinazione = cuore.getAttribute('data-nome'); 

  const formData = new FormData();
  formData.append('id_viaggio', idViaggio);

  if (cuore.classList.contains('preferito')) {
    testo.textContent = 'Aggiunto ai preferiti';

    fetch('preferiti.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        alert('Hai aggiunto ' + nomeDestinazione + ' ai preferiti!');
      } else {
        alert('Errore: ' + data.error);
      }
    })
    .catch(error => {
      console.error('Errore fetch:', error);
      alert('Errore di connessione al server.');
    });

  } else {
    testo.textContent = 'Aggiungi ai preferiti';

    fetch('preferiti_remove.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        alert('Hai rimosso ' + nomeDestinazione + ' dai preferiti.');
      } else {
        alert('Errore: ' + data.error);
      }
    })
    .catch(error => {
      console.error('Errore fetch:', error);
      alert('Errore di connessione al server.');
    });
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





//Validazione form registrazione
function validazione(event) {
  const form = document.forms['form_registrazione'];

  const email = form.email.value.trim();
  const password = form.password.value;
  const conferma = form.conferma_password.value;

  if (email.length === 0 || password.length === 0 || conferma.length === 0) {
    alert("Compilare tutti i campi.");
    event.preventDefault();
    return;
  }

  if (password !== conferma) {
    alert("Le password non coincidono.");
    event.preventDefault();
    return;
  }

  if (password.length < 8 || 
      !/[A-Z]/.test(password) || 
      !/[0-9]/.test(password) || 
      !/[.!?]/.test(password)) {
    alert("La password deve avere almeno 8 caratteri, una maiuscola, un numero e un simbolo tra .,!?");
    event.preventDefault();
    return;
  }
}

const form = document.forms['form_registrazione'];
form.addEventListener('submit', validazione);
