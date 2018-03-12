// An AI needs to know its intelligence level and the game that it is playing - these will be private attributes
// AI needs to be able to reason about the decisions it makes - that is what makes an AI AI 

// let AI = level => {
function AI(level) {
  let intelligenceLevel = level,
    game = {};

  function minimaxValue(state) {
    // The Minimax Algorithm
    // At any given state, the AI will 'think' about the possible moves it can make
    // and about the moves the opponent can make after the AI has taken that move.
    // This process terminates when the game has been completed in the AI's 'mind'
    // AI will then choose the action that will lead to the most favorable outcome
    // Keep in mind, it is reasoning through the total of X's score that we have defined in our score function

    // This algorithm is used to calculate the 'minimax' value of a state or action that leads to that state

    // the minimax algorithm is a recursive function with the base case being a completed state

    // function steps:
    // 1. base case: when state is completed (state.isComplete())
    // 2. recursion:
    // *** when it is X's turn, initialize state score to a value smaller than any possible score (-1000)
    // *** else, initialize score to a value larger than any possible score (1000)
    // *** get empty cells
    // *** create a new array - availableStates - that holds all possible actions that the AI can take given the available cells on the board
    // *** for each of the available states, call the minimaxValue function once more - 
    // ****** X's maximizes: if the next state's score is higher than the current state's score
    // ****** O's minimizes: if the next state's score is lower than the current state's score 

    console.log(`IS THE STATE COMPLETE?`, state.isComplete());

    if (state.isComplete()) {
      return Game.score(state);
    } else {
      // console.log(`ARE WE IN HIA?`)
      let stateScore;

      if (state.turn === 'X') stateScore = -1000; // X wants to maximize
      else stateScore = 1000; // AI wants to minimize loss of points

      let availableCells = state.emptyCells();

      let availableStates = availableCells.map(position => {
        let action = new AIAction(position);
        let nextState = action.applyTo(state);

        return nextState;
      });

      availableStates.forEach(nextState => {
        console.log(`next STATE: `, nextState);
        let nextScore = minimaxValue(nextState);

        if (state.turn === 'X') {
          // Human's turn - we want to maximize score
          if (nextScore > stateScore) stateScore = nextScore;
        } else {
          // AI's turn - we want to minimize
          if (nextScore < stateScore) stateScore = nextScore;
        }
      });
      console.log(`STATE SCORE!!!!!!!!`, stateScore);
      return stateScore;
    }
  };

  let makeBlindMove = turn => {
    let available = game.state.emptyCells();
    // console.log(`***Available Cells***`, available);
    // grab a random cell from the available cells
    // create an action on that random cell
    // apply that action to the game's current state
    // advance game with that new action 
    let rand = Math.floor(Math.random() * available.length);
    let randomCell = available[rand];
    let action = new AIAction(randomCell);
    let next = action.applyTo(game.state);

    ui.insertAt(action.movePosition, turn);
    game.advanceTo(next);
  };

  let makeNoviceMove = turn => {
    console.log(`AI is tryna make a novice move here`);
    let available = game.state.emptyCells();

    let availableActions = available.map(cell => {
      let action = new AIAction(cell);
      let next = action.applyTo(game.state);

      action.minimax = minimaxValue(next);

      return action;
    });

    if (turn === 'X') availableActions.sort(AI.descending);
    else availableActions.sort(AI.ascending);

    console.log(`NOVICE ACTIONS`, availableActions);

    let selectedAction;

    if (Math.floor(Math.random() * 100) <= 40) selectedAction = availableActions[0];
    else {
      if (availableActions.length >= 2) selectedAction = availableActions[1];
      else selectedAction = availableActions[0];
    }

    let next = selectedAction.applyTo(game.state);

    ui.insertAt(selectedAction.movePosition, turn);
    game.advanceTo(next);
  };

  let makeMasterMove = turn => {
    // AI will never lose - it is the perfect player
    // Identify which cells are currently empty on the current state
    let available = game.state.emptyCells();
    // apply an action to each available state and determine the score for each action
    let availableActions = available.map(cell => {
      let action = new AIAction(cell);
      let next = action.applyTo(game.state);
      // have the AI apply those actions to the current state

      action.minimax = minimaxValue(next);
      // find the minimax value of that action and then return action

      return action;
    });

    if (turn === 'X') availableActions.sort(AI.ascending);
    // if it is X's turn, sort available actions by descending minimax values
    else availableActions.sort(AI.descending);
    // otherwise, sort available actions by ascending minimax values
    // we now have an array of moves ordered by optimization depending on whose turn it is

    console.log(`ALL AVAILABLE ACTIONS`, availableActions);

    let selectedAction = availableActions[0];
    // select the first action because that is the optimal action in the array
    let next = selectedAction.applyTo(game.state);

    ui.insertAt(selectedAction.movePosition, turn);
    game.advanceTo(next);
    // and apply that action to the game's current state
    // advance the game
  };

  this.play = _game => game = _game;
  //function that tells AI which game it'll play

  this.notify = turn => {
    //notifies the AI that it is its turn to go
    switch (intelligenceLevel) {
      case 'blind': setTimeout(makeBlindMove(turn), 1000); break;
      case 'novice': setTimeout(makeNoviceMove(turn), 1000); break;
      case 'master': setTimeout(makeMasterMove(turn), 1000); break;
    }
  };
}

//AI needs to know what position on the board it'll make its move on
//and the minimax value of the state 
// the minimax is the crieteria at which the AI will choose its best available action

function AIAction(position) {
  //this function creates an action that the AI could take
  this.movePosition = position;
  this.minimax = 0;

  this.applyTo = state => {
    let next = new State(state);
    //makes a new state based on our old state

    next.board[this.movePosition] = state.turn;
    //this is the position on the board where the AI will makes its move if it is its turn

    if (state.turn === 'O') next.oMoves++;
    next.advanceTurn();

    return next;
  }
}

// Since the AI uses minimax value to choose the best action from a list of available actions, 
// we need some way to sort the actions based on their minimax values
// let's create two functions that we can pass to Array's sort function to sort ascending and descending actions.

AIAction.ascending = (firstAction, secondAction) => {
  if (firstAction.minimax < secondAction.minimax) return -1;
  // first action goes before second action
  else if (firstAction.minimax > secondAction.minimax) return 1;
  // second action goes before first action
  else return 0;
  // tie between both minimax values
}

AIAction.descending = (firstAction, secondAction) => {
  if (firstAction.minimax > secondAction.minimax) return -1;
  // first action goes before second action
  else if (firstAction.minimax < secondAction.minimax) return 1;
  // second action goes before first action
  else return 0;
  // tie between both minimax values
}