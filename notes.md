Understanding the definition of a game:
  A game is a multi-agent environment in which agents compete and/or cooperate on some specific task(s) while meeting some specific criteria. An agent is referred to as a player.

TicTacToe - What we want to build
  Two players (player X, and player O) play on 3x3 grid. 
  
  Player X is a human player, and player O is an AI. 
 
  A player can put his/her letter (either X or O) in an empty cell in the grid. If a player forms a row, a column or a diagonal with his/her letter, that player wins and the game ends. 
  
  If the grid is full and there’s no row, column or diagonal of the same letter, the game ends at draw. A player should try to win in the lowest possible number of moves.

Formal Definition
  One of the most fundamental tasks is to convert a verbal description of the problem into a formal description that can be used by a computer. This task is called Formal Definition. 

We take the description above (under TicTacToe) and convert it to code somehow.

If we know that our problem represents a game, we can define it below:
  A finite set of states of the game. In our game, each state would represent a certain configuration of the grid.

  A finite set of players which are the agents playing the game. In Tic-Tac-Toe there’s only two players: the human player and the AI.

  A finite set of actions that the players can do. Here, there’s only one action a player can do which is put his/her letter on an empty cell.

  A transition function that takes the current state and the played action and returns the next state in the game.

  A terminal test function that checks if a state is terminal (that is if the game ends at this state).

  A score function that calculates the score of the player at a terminal state.

Comes down to:
  - Finite set of states
  - Finite set of players
  - Finite set of actions
  - Transition function
  - Terminal test function
  - Score function

THE STATE
  Each state represents 
    - a certain configuration on our grid
    - whose turn it is
    - the result of the game at the current state (ongoing, draw, or victory)
      - terminal or not
        - checks if there are matching rows, columns, or diagonals and returns true if so
        - if not, checks if board is full - representing a draw and will be true
        - if there are still moves to be made, will return false
    - number of moves made by the AI - O
    - 

  Representing state
    - make a State class, with public information

  Constructing our state
    - having a copy-constructor ability to construct a new state from an old one to have minimal information to modify

THE BOARD
  - more easily represented as a 9 element, 1-D array
    - the first 3 elements represent the first row, second three the second row, and final three the third row - [first, first, first, second, second, second, third, third, third]


    [
      'E', 'E', 'O',
      'X', 'X', 'X',
      'O', 'E', 'X'
    ]