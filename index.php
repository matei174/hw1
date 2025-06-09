<?php
session_start();
$logged_in = isset($_SESSION['email']);
?>

<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>TRAVELUMA - Viaggi</title>
        
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="index.css">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    </head>

    <body>
        <header>

            <div id='overlay'></div>

            <nav>
                <div id="links">
                  <div class="nav-sx">
                    <a href="#">Home</a>
                    <a href="#">Viaggi di gruppo</a>
                    <a href="#">Chi siamo</a>
                  </div>
              
                  <div class="nav-ct">
                    <div id="logo">TRAVELUMA</div>
                  </div>
              
                  <div class="nav-dx">
                    
                    <div class="menu">
                        <a href="#">Blog</a>
                        <div class="menu-contenuto">
                            <a href="#">Articoli recenti</a>
                            <a href="#">Categorie</a>
                            <a href="#">Archivio</a>
                        </div>
                    </div>

                    <a href="#">Contatti</a>
                    
                    <?php if ($logged_in): ?>
                        <a href="home_session.php" class="btn-auth">Home Profilo</a>
                        <a href="logout_session.php" class="btn-auth">Logout</a>
                    <?php else: ?>
                        <a href="login_session.php" class="btn-auth">Accedi</a>
                        <a href="iscrizione.html" class="btn-auth">Iscriviti</a>
                    <?php endif; ?>

                    <div class="menu carrello-menu">
                        
                        <a href="#" class="btn-auth" id="toggle-carrello">
                          <i class="fa fa-shopping-cart"></i>
                        </a>

                        <div class="menu-contenuto" id="contenuto-carrello">
                          <h4>🛒 Il tuo carrello</h4>
                          <div id="lista-carrello"></div>
                          <p>Totale: <span id="totale">0</span>€</p>
                        </div>

                    </div>
                    
                    <div class="social">
                      <a href="#" target="_blank" class="social"><i class="fab fa-instagram"></i></a>
                      <a href="#" target="_blank" class="social"><i class="fab fa-tiktok"></i></a>
                      <a href="#" target="_blank" class="social"><i class="fab fa-facebook-f"></i></a>
                    </div>

                  </div>
                </div>
            </nav>
              
            <div class="menu-mobile">
                <div class="menu-icona">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div class="menu-link">
                  <a href="#">Home</a>
                  <a href="#">Chi siamo</a>
                  <a href="#">Viaggi</a>
                  <a href="#">Contatti</a>
                  <?php if ($logged_in): ?>
                        <a href="home_session.php" class="btn-auth">Home Profilo</a>
                        <a href="logout_session.php" class="btn-auth">Logout</a>
                    <?php else: ?>
                        <a href="login_session.php" class="btn-auth">Accedi</a>
                        <a href="iscrizione.html" class="btn-auth">Iscriviti</a>
                    <?php endif; ?>
                  <a href="#" target="_blank" class="social"><i class="fab fa-instagram"> Instagram </i></a>
                  <a href="#" target="_blank" class="social"><i class="fab fa-tiktok"> TikTok </i></a>
                  <a href="#" target="_blank" class="social"><i class="fab fa-facebook-f"> Facebook </i></a>
                </div>
            </div>

            <h1>
                <em>Vieni a scoprire il mondo</em>
                <br/>
                     
                <form id="form-destinazione">
                    <input type="text" id="search" placeholder="Cerca destinazione..." class="barra-ricerca">
                    <input type="submit" value="Cerca">
                </form>

                <br/>
                <a href="#" class="btn-prenota">Prenota adesso il tuo viaggio</a>
            </h1>

        </header>


        <section id="api">

            <section id="mood-section">

                <h2>Scegli una playlist per la tua vacanza</h2>

                <form id="form-playlist">
                    <input type="text" id="mood" name="mood" class="barra-ricerca" placeholder="es. rilassante, energico..." >
                    <input type="submit" value="Cerca una playlist">
                </form>
                
                <section id="album-view" class="album-view"></section>
                <br>

            </section>


            <section id="meteo">
            
                <h2>Controlla il meteo</h2>
                
                <form id="form-meteo">
                <input type="text" id="citta" class="barra-ricerca" placeholder="Inserisci una città" >
                <input type="submit" value="Cerca Meteo">
                </form>
                
                <div id="risultato-meteo">
                    <h3><span id="nome-citta"></span></h3>
                    <p id="descrizione-meteo"></p>
                    <img id="icona-meteo" src="" alt="Icona meteo" style="display: none;">
                    <p>Temperatura: <span id="temperatura"></span>°C</p>
                  </div>
                <br>
            
            </section>

        </section>

        
        <section id="blocchi">
        </section>

        <p id="nessun-risultato" style="display: none; text-align: center; font-weight: bold; padding: 20px;">
            Nessuna destinazione trovata.
        </p>
     
        <div class="scopri-di-piu">
            <a href="#" class="btn-large">SCOPRI PIÙ DESTINAZIONI</a>
            <p></p>
        </div>

        <section id="newsletter">

            <div class="iscriviti">
                <h1>-NEWSLETTER</h1>
                <p>
                    Rimani sempre aggiornato sulle nostre offerte, consigli di viaggio, destinazioni imperdibili e avventure da vivere in tutto il mondo. 
                    Iscriviti alla newsletter di TRAVELUMA e lasciati ispirare ogni mese da itinerari esclusivi, racconti autentici e promozioni dedicate alla nostra community.  
                    Il viaggio dei tuoi sogni potrebbe iniziare proprio da qui.
                </p>
            </div>

            <div class="news-form">
                <input type="text" placeholder="Nome" disabled>
                <input type="text" placeholder="Cognome" disabled>
                <input type="text" placeholder="Email" disabled>
                <button class="btn-iscriviti">Iscriviti</button>
            </div>

        </section>

        <footer>
            <div id="footer">
                <div class="footer-info">
                    <h3>Social</h3>
                    <ul>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">TikTok</a></li>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">YouTube</a></li>
                    </ul>
                </div>
        
                <div class="footer-info">
                    <h3>Info Utili</h3>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Assicurazione Viaggi</a></li>
                        <li><a href="#">Documenti di viaggio</a></li>
                        <li><a href="#">Visti e Passaporti</a></li>
                    </ul>
                </div>
        
                <div class="footer-info">
                    <h3>TRAVELUMA</h3>
                    <ul>
                        <li><a href="#">Chi siamo</a></li>
                        <li><a href="#">Contatti</a></li>
                        <li><a href="#">Lavora con noi</a></li>
                    </ul>
                </div>
        
                <div class="footer-info">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        <li><a href="#">Termini e Condizioni</a></li>
                    </ul>
                </div>
            </div>
        </footer>
        
    <script src="index.js"></script>

    </body>
    
</html>