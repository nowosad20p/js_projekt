<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gra</title>
  <link rel="shortcut icon" type="image/x-icon" href="logo.ico" />
  <script src="main.js"></script>
  <script src="player.js"></script>
  <script src="border.js"></script>
  <script src="interactiveObject.js"></script>
  <script src="decorations.js"></script>
  <link rel="stylesheet" href="style.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200&family=Roboto:ital,wght@1,300&display=swap" rel="stylesheet">
</head>

<body id="gameBody">
  <nav>
    <ol>
      <li><a href="index.html">Strona głowna</a></li>
      <li><a href="gra.html">Gra</a></li>
      <li><a href="zasady.html">Zasady gry</a></li>

    </ol>
  </nav>
  <div id="gameFinished">
    <p></p>
    <button>Graj od początku</button>
  </div>
  <canvas width="1280" height="360" id="gameCnv"></canvas>
  <canvas width="1280" height="360" id="gameCnv2"></canvas><br />
  <label id="hint" for="showTips">Pokaż wskazówki:</label><input type="checkbox" id="showTips" checked="checked" />
  <div id="alert">Aby zagrać w grę potrzebujesz większego wyświetlacza</div>
  <br>
  <button id="resetGame">Zrestartuj poziom</button><br>
  <button id="prevLevel">Poprzedni poziom</button>
  <button id="nextLevel">Następny poziom</button><br>
  <p id="errorMessage"></p>

  <footer>
    <hr />
    Autor:Jakub Nowosad
  </footer>
</body>

</html>