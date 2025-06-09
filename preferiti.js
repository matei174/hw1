document.addEventListener('DOMContentLoaded', () => {
    const cont = document.getElementById('preferiti-container');
    fetch('api_preferiti.php')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          cont.textContent = data.error || 'Errore';
          return;
        }
        if (data.length === 0) {
          cont.innerHTML = '<p>Non hai ancora preferiti!</p>';
          return;
        }
        cont.innerHTML = '';
        data.forEach(v => {
          const div = document.createElement('div');
          div.className = 'destinazioni';
          div.innerHTML = `
            <img src="${v.immagine}" alt="${v.nome}">
            <div class="info">
              <h3>${v.nome}</h3>
              <p class="prezzo"><strong>${v.prezzo}€</strong></p>
              <p>${v.descrizione}</p>
              <button class="rimuovi" data-id="${v.id}">Rimuovi dai preferiti</button>
            </div>
          `;
          cont.appendChild(div);
        });
  
        document.querySelectorAll('button.rimuovi').forEach(btn => {
          btn.addEventListener('click', evt => {
            const id = evt.currentTarget.dataset.id;
            fetch('preferiti_remove.php', {
              method: 'POST',
              body: new URLSearchParams({ id_viaggio: id })
            })
            .then(r => r.json())
            .then(resp => {
              if (resp.ok) {
                evt.currentTarget.closest('.destinazioni').remove();
              } else {
                alert('Errore: ' + resp.error);
              }
            })
            .catch(err => alert('Connessione fallita'));
          });
        });
      })
      .catch(e => cont.textContent = 'Errore di caricamento');
  });