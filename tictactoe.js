// ZERO SUM GAMES
// Pure competition type games - no cooperation between players
// P1: 5pts, P2: -5pts
// From wikipedia:
// A mathematical representation of a situation in which each participant's gain or loss of utility is exactly balanced by the losses or gains of the utility of the other participants.
// Totals gains - Total losses = 0
// Generic Zero-Sum Game
//            Choice 1       Choice 2
// Choice 1   -A, A          B, -B
// Choice 2    C, -C         -D, D
// 
// Any result of a zero-sum situation is Pareto optimal - any game where all strategies are Pareto optimal is called a conflict game. 
// 
// Tic Tac Toe is a zero-sum game so the AI can spend its life minimizing X's score while maximizing its own score


// representing our state in the game
function State(old) {
  this.turn = '';  // the player's whose turn it is
  this.oMoves = 0; // AI's number of moves
  this.result = 'ongoing'; // the result of the game at the current state
  this.board = []; // the game board

  if (old) {
    // check to see if we have an old state
    console.log(`OUR OLD STATE`, old)
    let cells = old.board.length;

    this.board = new Array(cells);
    // set the new state's board to be of the same length as our previous state's board

    old.board.forEach((cell, idx) => {
      this.board[idx] = old.board[idx];
    });

    this.oMoves = old.oMoves; // set AI's old moves to the new state
    this.result = old.result;
    this.turn = old.turn;
  }

  this.advanceTurn = () => {
    console.log(`we are advancing the turn`)
    this.turn = this.turn === 'X' ? 'O' : 'X';
  }
  // function that advances the turn in state

  this.emptyCells = () => {
    // function that returns an array of all the empty indexes on our board
    // will have length of 0 once our board is filled
    let emptyIdx = [];

    for (let i = 0; i < 9; i++) {
      if (this.board[i] === 'E') emptyIdx.push(i);
    }
    console.log(`OUR EMPTY CELLS`, emptyIdx);
    return emptyIdx;
  };

  this.isComplete = () => {
    let currentBoard = this.board;

    // check if we have a win in one of our rows and send that back
    for (let i = 0; i <= 6; i += 3) {
      if (
        currentBoard[i] !== 'E' &&
        currentBoard[i] &&
        currentBoard[i] === currentBoard[i + 1] &&
        currentBoard[i + 1] === currentBoard[i + 2]
      ) {
        console.log(`ROW WIN`)
        console.log(currentBoard[i])
        this.result = `${currentBoard[i]} won`;
        return true;
      }
    }

    // check if we have a win in one of our columns and send that back
    for (let i = 0; i <= 2; i++) {
      if (
        currentBoard[i] !== 'E' &&
        currentBoard[i] &&
        currentBoard[i] === currentBoard[i + 3] &&
        currentBoard[i + 3] === currentBoard[i + 6]
      ) {
        console.log(`COLUMN WIN`)
        this.result = `${currentBoard[i]} won`;
        return true;
      }
    }

    // check if we have a diagonal win
    if (
      currentBoard[4] !== 'E' &&
      currentBoard[4] &&
      (
        (
          currentBoard[0] === currentBoard[4] &&
          currentBoard[4] === currentBoard[8]
        )
        ||
        (
          currentBoard[2] === currentBoard[4] &&
          currentBoard[4] === currentBoard[6]
        )
      )
    ) {
      console.log(`diagonal win`);
      this.result = `${currentBoard[4]} won`;
      return true;
    }

    // check if our board has been filled up and no wins
    // that means we have a draw
    let empty = this.emptyCells();
    console.log(`empty`, empty)

    if (empty.length === 0) {
      console.log(empty.length);
      this.result = 'draw';
      return true;
    } else {
      return false;
    }
  };
}

// Controls flow of the game
// keep and access the following information:
// AI player
// current state of the game - running or finished
// moving the game from one state to another
// need a function that advances the game from one state to another and check if the game has ended
// if game continues, we have a function that will notify the player whose turn it is
// function to start the game as well

function Game(aiPlayer) {
  // initializing a new Game
  this.status = 'starting';
  this.state = new State();
  this.state.turn = 'X';
  this.state.board = [
    'E', 'E', 'E',
    'E', 'E', 'E',
    'E', 'E', 'E'
  ];
  this.ai = aiPlayer;

  this.advanceTo = _state => {
    // console.log(`WE ARE IN ADVANCE TO FUNCTION, the state? `, _state);
    // function that advances the game to a new state
    this.state = _state;
    // console.log(this.status);

    if (_state.isComplete()) {
      this.status = 'completed';
      ui.switchViewTo(_state.result); // draw
    } else {
      // the game is ongoing
      // check whose turn it is
      if (this.state.turn === 'X') ui.switchViewTo('X');
      else {
        // notify the AI that it is its turn
        // console.log(`IT IS THE AI'S TURN IN THE ADVANCETO FUNC`)
        ui.switchViewTo('O');
        this.ai.notify('O');
      }
    }
  };

  this.start = () => {
    console.log(`starting up the game`);
    // we start the game here, advance the state, and change our game status from starting to running 
    if (this.status === 'starting') {
      this.status = 'running';
      this.advanceTo(this.state);
    }
  }
}

// The Score Function

// will be a function of the Game Class (above)
// game-related info && static because it does not depend on specific instances of the game

// How the AI knows the benefit of a specific action it takes
// We want out AI to be a challenge to the human player
// We want to have our score function modeled in a way that our AI wants our human player to have the lowest score possible
// In this same way, the AI tries to win by diminishing the human's chances of winning

// AI 'thinks' as both the X (human) player and the O (AI) player
// As X, it works on maximizing its value
// As O, it works on minimizing its value

// Winning Score: 10
// Draw: 0
// Losing Score: -10

// X (Human) Victory:
// In the event that X wins, his/her score will be 10. But the AI's goal is to prevent this from happening. 
// The AI's goal in tac tac toe is to prevent X from winning and it'll try to do so by forcing X to make more moves
// X's score: 10 - AI's Moves

// X (Human) Defeat:
// In the event that X loses, his/her score will be -10. The AI's goal is to defeat the human player with the least number of moves possible on its end.
// We penalize our AI by increasing X's total score for every extra move that our AI makes
// X's score: -10 + AI's Moves

// Draw:
// X's score: 0

// Pseudo Score Function:
// score = (result, oMoves) => {
//   if result === 'X won' --> score = 10 - oMoves
//   if result === 'draw' --> 0
//   if result === 'O won' --> score = -10 + oMoves
// }

Game.score = _state => {
  // we want to check the result of the game at the current state
  // if (_state.result !== 'ongoing') {
  //   // our game is done
  //   if (_state.result === 'X won') return 10 - _state.oMoves;
  //   else if (_state.result === 'O won') return -10 + _state.oMoves;
  //   else return 0;
  switch (_state.result) {
    case 'X won':
      return 10 - _state.oMoves;
      break;
    case 'O won':
      return -10 + _state.oMoves;
      break;
    case 'draw':
      return 0;
      break;
  }
}