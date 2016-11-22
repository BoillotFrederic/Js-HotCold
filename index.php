<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Chaud/Froid</title>
    <link rel="stylesheet" href="css/style.css">
    <script type="text/javascript" src="js/jScript.js"></script>
  </head>
  <body>
    <div id="win"></div>
    <div id="launch">
      <label for="nbMax">Nombre maximal</label><br />
      <div></div>
      <input autocomplete=off type="text" id="nbMax" name="nbMax" onkeyup="game.noSpace(this);" onblur="game.focus(false, 'max');" onfocus="game.focus(true, 'max');" /><br />
      <a href="javascript:game.start()">Lancer la partie</a>
    </div>
    <div id="inGame">
      <label for="nbUser">Essai de trouver le nombre !</label><br />
      <div></div>
      <input autocomplete=off onkeyup="game.noSpace(this);" onblur="game.focus(false, 'user');" onfocus="game.focus(true, 'user');" type="text" id="nbUser" name="nbUser" />
      <input type="button" value="OK" onclick="game.checkNb($('nbUser'));">
    </div>
    <div id="termo">
      <div></div>
      <div></div>
    </div>
    <div id="infos">
      0° est la valeur stable à atteindre !<br />
      Le nombre à trouver est situé entre 0 et <span>''</span>
    </div>
  </body>
</html>
