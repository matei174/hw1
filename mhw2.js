//banner
const offerta = document.createElement('div');
offerta.textContent = '🌍 Sconto 10% se ti iscrivi al newsletter!';
offerta.classList.add('offerta-banner');

const blocchi = document.querySelector('#blocchi');
document.body.insertBefore(offerta, blocchi);





//cambia immagine al passaggio del mouse su Bali
const immagineBali = document.querySelector('.destinazioni img');
immagineBali.addEventListener('mouseenter', function () {
  this.src = 'https://image.urlaubspiraten.de/1024/image/upload/v1613576344/mediavault_images/GettyImages-1167728368_ssldi2.jpg';
});
immagineBali.addEventListener('mouseleave', function () {
  this.src = 'https://image.urlaubspiraten.de/1280/image/upload/v1628092143/mediavault_images/AdobeStock_103587221_or1mfx.jpg';
});





// "Leggi di più"
const bottoni = document.querySelectorAll('.toggle-dettagli');
for (let i = 0; i < bottoni.length; i++) {
  bottoni[i].addEventListener('click', function () {
    const dettagli = this.previousElementSibling;
    dettagli.classList.toggle('nascosto');
    this.textContent = dettagli.classList.contains('nascosto') ? 'Leggi di più' : 'Mostra meno';
  });
}



//preferiti
const cuori = document.querySelectorAll('.icona-cuore');
for (let i = 0; i < cuori.length; i++) {
  cuori[i].addEventListener('click', function () {
    this.classList.toggle('preferito');

    const testo = this.nextElementSibling;
    const nomeDestinazione = this.getAttribute('data-id'); 

    if (this.classList.contains('preferito')) {
      testo.textContent = 'Aggiunto ai preferiti';
      alert('Hai aggiunto ' + nomeDestinazione + ' ai preferiti!');
    } else {
      testo.textContent = 'Aggiungi ai preferiti';
      alert('Hai rimosso ' + nomeDestinazione + ' dai preferiti.');
    }
  });
}