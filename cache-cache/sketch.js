// Tableau contenant les énigmes
var enigmes = [
  "RDC, Vous me trouverez à l'accueil, posé sur le bureau, décodez moi avec votre lecteur NFC",
  "Niveau 1, Vous me trouverez en salle 108, à côté de la fenêtre de droite, vous pourrez me décoder avec votre lecteur NFC",
  "Niveau 2 Vous me trouverez dans la salle d'attente du directeur, sur la petite table, vous pourrez me décoder avec votre lecteur NFC de votre téléphone",
  "Niveau 1 Vous me trouverez dans les toilettes à côté de la salle Info, derrière le rouleau, vous pourrez me décoder avec votre lecteur NFC de votre téléphone",
  // Ajoutez ici vos autres énigmes...
];

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

  // Lire l'énigme à haute voix
  synthetiserVoix(enigme);
}

// Fonction pour synthétiser la voix
function synthetiserVoix(texte) {
  // Vérifier si l'API Web Speech est prise en charge par le navigateur
  if ('speechSynthesis' in window) {
    // Créer un nouvel objet SpeechSynthesisUtterance
    var synthese = new SpeechSynthesisUtterance();
    // Définir le texte à synthétiser
    synthese.text = texte;
    // Définir la langue française
    synthese.lang = 'fr-FR';
    // Parler le texte
    speechSynthesis.speak(synthese);
  } else {
    // Afficher un message d'erreur si l'API n'est pas prise en charge
    console.error('L\'API Web Speech n\'est pas prise en charge par votre navigateur.');
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (random() < 0.01) { // Ajustez la fréquence d'apparition selon vos préférences
    fill(128); // Couleur gris pour "cache cache"
    textSize(18);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    text("cache cache", random(width), random(height));
  }
}

// Fonction qui s'exécute quand la souris est cliquée
function mousePressed() {
  // Sélectionne une énigme au hasard
  var enigmeActuelle = random(enigmes);
  // Affiche l'énigme
  afficherEnigme(enigmeActuelle);
}
