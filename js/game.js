var Game;

Game = {
  ladderStart: [12, 39, 70],
  ladderEnd: [51, 84, 93],
  checkLadder: function(score) {
    var index;
    index = Game.ladderStart.indexOf(score);
    if (index > -1) {
      if (Game.turn) {
        return Game.playerScore = Game.ladderEnd[index];
      } else {
        return Game.computerScore = Game.ladderEnd[index];
      }
    }
  },
  snakeStart: [36, 52, 79, 94],
  snakeEnd: [4, 13, 37, 46],
  checkSnakes: function(score) {
    var index;
    index = Game.snakeStart.indexOf(score);
    if (index > -1) {
      if (Game.turn) {
        return Game.playerScore = Game.snakeEnd[index];
      } else {
        return Game.computerScore = Game.snakeEnd[index];
      }
    }
  },
  checkWinning: function(score) {
    if (score >= 100) {
      if (Game.turn) {
        console.log("Player Wins");
      } else {
        console.log("Computer Wins");
      }
      return Game.over = true;
    }
  },
  computerTurn: function() {
    if (!Game.over) {
      return setTimeout(function() {
        Game.randomComp = Math.floor(Math.random() * 6) + 1;
        console.log("computer " + Game.randomComp);
        $('.compScore').html(Game.randomComp);
        if (Game.randomComp === 6) {
          Game.scoreUpdate(Game.randomComp);
          return Game.computerTurn();
        } else {
          Game.scoreUpdate(Game.randomComp);
          return Game.turn = true;
        }
      }, 1000);
    }
  },
  fillColor: function(score) {
    var classVar;
    classVar = '.' + score;
    if (Game.turn) {
      $(Game.prevPlayScore).css('background-color', '#ecf0f5');
      $(classVar).css('background-color', 'red');
      return Game.prevPlayScore = '.' + score;
    } else {
      $(Game.prevCompScore).css('background-color', '#ecf0f5');
      $(classVar).css('background-color', 'blue');
      return Game.prevCompScore = '.' + score;
    }
  },
  handleClick: function() {
    return $('.dice').click(function() {
      return Game.playerTurn();
    });
  },
  playerTurn: function() {
    if (!Game.over) {
      Game.randomPlay = Math.floor(Math.random() * 6) + 1;
      console.log("player " + Game.randomPlay);
      $('.playScore').html(Game.randomPlay);
      if (Game.randomPlay !== 6) {
        Game.scoreUpdate(Game.randomPlay);
        Game.turn = false;
        return Game.computerTurn();
      } else {
        return Game.scoreUpdate(Game.randomPlay);
      }
    }
  },
  scoreUpdate: function(randomCount) {
    if (Game.turn) {
      Game.playerScore += randomCount;
      Game.checkLadder(Game.playerScore);
      Game.checkSnakes(Game.playerScore);
      Game.fillColor(Game.playerScore);
      Game.checkWinning(Game.playerScore);
      return console.log("playerScore " + Game.playerScore);
    } else {
      Game.computerScore += randomCount;
      Game.checkLadder(Game.computerScore);
      Game.checkSnakes(Game.computerScore);
      Game.fillColor(Game.computerScore);
      Game.checkWinning(Game.computerScore);
      return console.log("computerScore " + Game.computerScore);
    }
  },
  init: function() {
    Game.playerScore = 0;
    Game.computerScore = 0;
    Game.randomComp = 0;
    Game.randomPlay = 0;
    Game.prevPlayScore = null;
    Game.prevCompScore = null;
    Game.turn = true;
    Game.over = false;
    return Game.handleClick();
  }
};

$(function() {
  return Game.init();
});
