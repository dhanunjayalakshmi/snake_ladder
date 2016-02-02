Game =
  ladderStart: [12,39,70],
  ladderEnd: [51,84,93],
  checkLadder: (score) ->
    index = Game.ladderStart.indexOf(score)
    if (index > -1)
      if Game.turn
        Game.playerScore = Game.ladderEnd[index]
      else
        Game.computerScore = Game.ladderEnd[index]
  snakeStart: [36,52,79,94],
  snakeEnd: [4,13,37,46],
  checkSnakes: (score) ->
    index = Game.snakeStart.indexOf(score)
    if (index > -1)
      if Game.turn
        Game.playerScore = Game.snakeEnd[index]
      else
        Game.computerScore = Game.snakeEnd[index]
  checkWinning: (score) ->
    if(score >= 100)
      if Game.turn
        console.log "Player Wins"
      else
        console.log "Computer Wins"
      Game.over = true
  computerTurn: ->
    if !Game.over
      setTimeout ->
        Game.randomComp = Math.floor(Math.random()*6)+1
        console.log "computer " + Game.randomComp
        $('.compScore').html(Game.randomComp)
        if Game.randomComp == 6
          Game.scoreUpdate(Game.randomComp)
          Game.computerTurn()
        else
          Game.scoreUpdate(Game.randomComp)
          Game.turn = true
      ,1000
  fillColor: (score) ->
    classVar = '.'+score
    if Game.turn
      $(Game.prevPlayScore).css('background-color','#ecf0f5')
      $(classVar).css('background-color', 'red')
      Game.prevPlayScore = '.'+score
    else
      $(Game.prevCompScore).css('background-color', '#ecf0f5')
      $(classVar).css('background-color', 'blue')
      Game.prevCompScore = '.'+score
  handleClick: ->
    $('.dice').click ->
      Game.playerTurn()
  playerTurn: ->
    if !Game.over
      Game.randomPlay = Math.floor(Math.random()*6)+1
      console.log "player " + Game.randomPlay
      $('.playScore').html(Game.randomPlay)
      if Game.randomPlay != 6
        Game.scoreUpdate(Game.randomPlay)
        Game.turn = false
        Game.computerTurn()
      else
        Game.scoreUpdate(Game.randomPlay)
  scoreUpdate: (randomCount) ->
    if Game.turn
      Game.playerScore+=randomCount
      Game.checkLadder(Game.playerScore)
      Game.checkSnakes(Game.playerScore)
      Game.fillColor(Game.playerScore)
      Game.checkWinning(Game.playerScore)
      console.log "playerScore " +Game.playerScore
    else
      Game.computerScore+=randomCount
      Game.checkLadder(Game.computerScore)
      Game.checkSnakes(Game.computerScore)
      Game.fillColor(Game.computerScore)
      Game.checkWinning(Game.computerScore)
      console.log "computerScore " +Game.computerScore
  init: ->
    Game.playerScore = 0
    Game.computerScore = 0
    Game.randomComp = 0
    Game.randomPlay = 0
    Game.prevPlayScore = null
    Game.prevCompScore = null
    Game.turn = true
    Game.over = false
    Game.handleClick()

$ ->
  Game.init()
