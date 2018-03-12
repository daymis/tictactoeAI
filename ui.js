let ui = {}, control = {};

control.chooseDifficulty = difficulty => {
  let ai = new AI(difficulty);

  control.game = new Game(ai);
  ai.play(control.game);
  ui.switchViewTo('X');
};

control.reset = () => {
  control.game.status = 'starting';
  control.game.turn = 'X';
  control.game.oMoves = 0;
  control.game.board = [];
  control.game.result = 'ongoing';

  ui.switchViewTo('X');
}

const difficultyControl = () => {
  $(".choice-blind").click(() => {
    if (control.game && control.game.status === 'completed') {
      $(".choice-blind").click(() => {
        $(".cell").removeClass('occupied');
        $(".cell").html("");
        control.reset();
      });
    }
    console.log(`ui's CONTROL GAME`, control.game)
    control.chooseDifficulty('blind');
    control.game.start();
  });
  $(".choice-novice").click(() => {
    if (control.game && control.game.status === 'completed') {
      $(".choice-novice").click(() => {
        $(".cell").removeClass('occupied');
        $(".cell").html("");
        control.reset();
      });
    }
    control.chooseDifficulty('novice');
    control.game.start();
  });
  $(".choice-master").click(() => {
    if (control.game && control.game.status === 'completed') {
      $(".choice-master").click(() => {
        $(".cell").removeClass('occupied');
        $(".cell").html("");
        control.reset();
      });
    }
    control.chooseDifficulty('master');
    control.game.start();
  });
};

const notifHuman = 'Go.',
  notifAI = 'My Turn.',
  notifVictory = 'Victory!',
  notifDefeat = 'Defeat.',
  notifDraw = 'Draw.';

ui.switchViewTo = view => {
  console.log(`this is the view`, view);
  switch (view) {
    case 'X':
      $('.messages').fadeOut(250, () => {
        $('.messages').html(notifHuman).fadeIn(250);
      });
      break;
    case 'O':
      $('.messages').fadeOut(250, () => {
        $('.messages').html(notifAI).fadeIn(250);
      });
      break;
    case 'X won':
      $('.messages').fadeOut(250, () => {
        $('.messages').html(notifVictory).fadeIn(250).delay(1000).fadeOut(500, () => {
          $('.messages').html('');
        });
      });
      break;
    case 'O won':
      $('.messages').fadeOut(250, () => {
        $('.messages').html(notifDefeat).fadeIn(250).delay(1000).fadeOut(500, () => {
          $('.messages').html('');
        });
      });
      break;
    case 'draw':
      $('.messages').fadeOut(250, () => {
        $('.messages').html(notifDraw).fadeIn(250).delay(1000).fadeOut(500, () => {
          $('.messages').html('');
        });
      });
      break;
    default:
      $('.game').fadeIn('fast');
  }
};

ui.insertAt = (idx, symbol) => {
  // console.log(`WE ARE TRYNA INSERT HERE`);
  let board = $('.cell'), targetCell = $(board[idx]);

  if (!targetCell.hasClass('occupied')) targetCell.html(symbol);
  targetCell.addClass('occupied');
};

const clickHelper = currentId => {
  console.log(`GAME OBJ`, control.game)
  if (
    control.game.status === 'running' &&
    control.game.state.turn === 'X' &&
    !$(currentId).hasClass('occupied')
  ) {
    let idx = +currentId[1];
    let next = new State(control.game.state);

    next.board[idx] = 'X';
    ui.insertAt(idx, 'X');
    next.advanceTurn();
    control.game.advanceTo(next);
  }
}



$("#0").click(() => clickHelper("#0"));
$("#1").click(() => clickHelper("#1"));
$("#2").click(() => clickHelper("#2"));
$("#3").click(() => clickHelper("#3"));
$("#4").click(() => clickHelper("#4"));
$("#5").click(() => clickHelper("#5"));
$("#6").click(() => clickHelper("#6"));
$("#7").click(() => clickHelper("#7"));
$("#8").click(() => clickHelper("#8"));

// $(document).ready(() => {
//   ui.switchViewTo();
// });