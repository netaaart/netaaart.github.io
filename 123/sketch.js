// Charger la librairie de reconnaissance vocale
var myRec = new p5.SpeechRec();
myRec.continuous = true; // Reconnaissance vocale continue

// Tableau contenant les énigmes
var enigmes = [
  "œuvre#1: RDC, Vous me trouverez à l'accueil, posé sur le bureau, décodez moi avec votre lecteur NFC",
  "œuvre#2: Niveau 1, Vous me trouverez en salle 108, à côté de la fenêtre de droite, vous pourrez me décoder avec votre lecteur NFC",
  "œuvre#3: Niveau 2 Vous me trouverez dans la salle d'attente du directeur, sur la petite table, vous pourrez me décoder avec votre lecteur NFC de votre téléphone",
  "œuvre#4: Niveau 1 Vous me trouverez dans les toilettes à côté de la salle Info, derrière le rouleau, vous pourrez me décoder avec votre lecteur NFC de votre téléphone",
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

// Fonction pour afficher une énigme
function afficherEnigme(enigme) {
  // Efface le contenu du canvas
  background(255);
  // Affiche l'énigme
  fill(0); // Couleur noire pour les énigmes
  textSize(24);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(enigme, width / 2, height / 4);
}

// Fonction qui s'exécute quand une touche est relâchée
function keyReleased() {
  // Appuyer sur "s" permet d'enregistrer l'image
  if (key == 's' || key == 'S') {
    saveCanvas(year() + month() + day() + '-' + hour() + minute() + second() + '_speechtext' + '.jpg');
  }
}
