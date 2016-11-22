// Touche entrer lors du focus
document.onkeypress = function(e)
{
  if (e.keyCode == '13' && game.focusInputMax)
  game.start();
  else if (e.keyCode == '13' && game.focusInputUser)
  game.checkNb($('nbUser'));
}

// Simplification
function $(id)
{
  return document.getElementById(id);
}

// Le jeu
var game =
{
  nbMax: 0,
  nbRand: 0,
  focusInputMax: false,
  focusInputUser: false,
  tryAgain: 0,

  start: function()
  {
    // Lancement du jeu
    this.nbMax = $('nbMax').value;

    if (this.nbMax.match(/^[0-9]+$/))
    {
      // Affichage du formulaire InGame
      this.inputBox(true);

      // Création du nombre aléatoire
      this.nbRand = Math.floor(Math.random() * (Number(this.nbMax) + 1));
      console.log('Un nombre aléatoire compris entre 0 et ' + this.nbMax + ' a bien été créé');
    }
    // La saisie est vide ou pas un nombre
    else
    $('launch').children[2].innerHTML = 'Uniquement un nombre !!!';
  },

  checkNb: function(obj)
  {
    // Suppression des espaces
    this.noSpace(obj);

    // Nombre de l'utilisateur
    var nbUser = obj.value;

    if (nbUser.match(/^[0-9]+$/))
    {
      // Réinitialisation du message d'erreur
      $('inGame').children[2].innerHTML = '';

      // Calcule de la valeur height
      var height = Math.floor((195 * ((Number(nbUser) * 100) / Number(this.nbRand)) / 100)) / 2;
      if (height > 195) height = 195;
      $('termo').children[0].style.height = height + "px";

      // Resultat correcte
      if (nbUser == this.nbRand)
      {
        this.tryAgain++;
        console.log('Essai '+ this.tryAgain +' (gagnant) : ' + nbUser);
        $('win').innerHTML = 'Bravo !!!';
        this.inputBox(false, obj);
        $('termo').children[1].innerHTML += '<br /><em>' + nbUser + '</em>';
      }
      // Perdu
      else if (this.tryAgain >= 9)
      {
        this.tryAgain++;
        console.log('Essai '+ this.tryAgain +' (perdant) : ' + nbUser);

        $('win').innerHTML = 'Perdu !!!';
        this.inputBox(false, obj);
        var nbCPU = ' <span>(' + this.nbRand + ')</span>';
        $('termo').children[1].innerHTML += '<br />Essai '+ this.tryAgain +': ' + nbUser + nbCPU;
      }
      // Mauvaise réponse
      else
      {
        this.tryAgain++;
        console.log('Essai '+ this.tryAgain +' (perdant) : ' + nbUser);

        var help =  '';
        if (this.tryAgain == 5)
        help = ' <span>(' + ((this.nbRand > nbUser) ? '? > ' + nbUser : '? < ' + nbUser) + ')</span>';

        $('inGame').children[2].innerHTML = 'Loupé !!!';
        $('termo').children[1].innerHTML += '<br />Essai ' + this.tryAgain + ': ' +nbUser + help;
      }
    }
    // La saisie est vide ou pas un nombre
    else
    $('inGame').children[2].innerHTML = 'Uniquement un nombre !!!';
  },

  inputBox: function(bool, obj)
  {
    // Affichage du formulaire launch
    if (!bool)
    {
      // End script
      console.log("----------------------------\nFin du script");

      $('launch').style.display = 'inline-block';
      $('launch').children[5].innerHTML = 'Relancer une partie';
      $('inGame').style.display = 'none';
      $('win').style.display = 'block';
      $('termo').children[1].style.display = 'block';
      $('nbMax').value = '';
      obj.value = '';
    }
    // Affichage du formulaire InGame
    else
    {
      // Start script
      console.log("Début/relance du script\n----------------------------");

      $('launch').style.display = 'none';
      $('inGame').style.display = 'inline-block';
      $('infos').children[1].innerHTML = this.nbMax;
      $('termo').children[1].innerHTML = 'Historique<br /><br />';
      $('termo').children[1].style.display = 'block';
      $('win').style.display = 'none';
      this.tryAgain = 0;
    }
  },

  // Pas d'espaces
  noSpace: function(obj)
  {
    obj.value = obj.value.replace(/ +/, '');
  },

  // Focus des inputs
  focus: function(bool, type)
  {
    if (type == 'max') this.focusInputMax = bool;
    else this.focusInputUser = bool;
  }
}
