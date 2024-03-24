// Charger la librairie de reconnaissance vocale
var myRec;
// Créer un objet pour la synthèse vocale
var speech;
// Tableau contenant les énigmes
var enigmes = [
  "RDC, Vous me trouverez à l'accueil, posé sur le bureau, décodez moi avec votre lecteur NFC",
  "Niveau 1, Vous me trouverez en salle 108, à côté de la fenêtre de droite, vous pourrez me décoder avec votre lecteur NFC",
  "Niveau 2 Vous me trouverez dans la salle d'attente du directeur, sur la petite table, vous pourrez me décoder avec votre lecteur NFC de votre téléphone",
  "Niveau 1 Vous me trouverez dans les toilettes à côté de la salle Info, derrière le rouleau, vous pourrez me décoder avec votre lecteur NFC de votre téléphone",
  // Ajoutez ici vos autres énigmes...
];
// Variable pour stocker l'énigme actuelle
var enigmeActuelle = "";

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Changer la taille de la police
  textSize(24);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  // Initialiser la synthèse vocale
  speech = new p5.Speech();
  // Charger la librairie de reconnaissance vocale
  myRec = new p5.SpeechRec();
  myRec.continuous = true; // Reconnaissance vocale continue
  // Si le programme entend une voix, il va afficher le texte dit
  myRec.onResult = showResult;
  myRec.start();
}

function showResult() {
  // Si le programme entend une voix
  if (myRec.resultValue == true) {
    // Vérifie si la phrase de déclenchement est dite
    if (myRec.resultString === "1 2 3 4 5 6 7 8 9 10") {
      // Sélectionne une énigme au hasard
      enigmeActuelle = random(enigmes);
      // Affiche l'énigme
      afficherEnigme(enigmeActuelle);
      // Lire l'énigme à haute voix
      speech.speak(enigmeActuelle);
    }
  }
}

function draw() {
  if (frameCount % 100 == 0) {
    fill(128); // Couleur gris pour "cache cache"
    textSize(18);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    text("cache cache", random(width), random(height));
  }
}

// Fonction pour afficher une énigme sur plusieurs lignes adaptées à l'écran du smartphone
function afficherEnigme(enigme) {
  // Efface le contenu du canvas
  background(255);
  // Définir la taille maximale de la police en fonction de la largeur de l'écran
  var maxSize = min(width, height) / 20;
  textSize(maxSize);
  fill(0); // Couleur noire pour les énigmes
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  // Diviser l'énigme en mots
  var mots = enigme.split(' ');
  var ligne = '';
  var y = height / 4;
  
  // Boucle à travers chaque mot
  for (var i = 0; i < mots.length; i++) {
    var mot = mots[i];
    var largeurMot = textWidth(mot + ' ');

    // Vérifier si le mot dépasse la largeur de l'écran
    if (textWidth(ligne + mot + ' ') < width * 0.8) {
      ligne += mot + ' ';
    } else {
      // Afficher la ligne actuelle et passer à la suivante
      text(ligne, width / 2, y);
      y += maxSize * 1.5; // Espacement entre les lignes
      ligne = mot + ' ';
    }
  }
  // Afficher la dernière ligne
  text(ligne, width / 2, y);
}

// Fonction qui s'exécute quand une touche est relâchée
function touchEnded() {
  // Sélectionne une énigme au hasard
  enigmeActuelle = random(enigmes);
  // Affiche l'énigme
  afficherEnigme(enigmeActuelle);
  // Lire l'énigme à haute voix
  speech.speak(enigmeActuelle);
}
