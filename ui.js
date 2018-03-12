let ui = {}, control = {};

let cells = document.querySelectorAll('.cell');

control.chooseDifficulty = difficulty => {
  let ai = new AI(difficulty);
  console.log(`OUR DIFFICULTY LEVEL: `, difficulty);

  control.game = new Game(ai);
  console.log(`CONTROL.GAME AT UI`, control.game);
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
    control.chooseDifficulty('blind');
    control.game.start();
  });
  $(".choice-novice").click(() => {
    control.chooseDifficulty('novice');
    control.game.start();
  });
  $(".choice-master").click(() => {
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
        $('.messages').html(notifVictory).fadeIn(250).delay(1000).fadeOut(250, () => {
          $('.messages').html('');
        });
      });
      break;
    case 'O won':
      $('.messages').fadeOut(250, () => {
        $('.messages').html(notifDefeat).fadeIn(250).delay(1000).fadeOut(250, () => {
          $('.messages').html('');
        });
      });
      break;
    case 'draw':
      $('.messages').fadeOut(250, () => {
        $('.messages').html(notifDraw).fadeIn(250).delay(1000).fadeOut(250, () => {
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

  //.class#ID
  // $("[data-val='" + idx + "']").text(symbol);
};

// $(".cell").click(() => {
//   console.log(`REGISTERING CLICKS`);

//   if (
//     control.game.status === 'running' &&
//     control.game.turn === 'X' &&
//     !$this.hasClass('occupied')
//   ) {
//     let idx = +$this.data("id");
//     let next = new State(control.game.state);


//     next.board[idx] = 'X';
//     ui.insertAt(idx, 'X');
//     next.advanceTurn();
//     control.game.advanceTo(next);
//   }
// });

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

// ui.insertAt = (idx, symbol) => {
//   let board = $('.cell'), targetCell = $(board[idx]);

//   if (!targetCell.hasClass('occupied')) {
//     targetCell.html(symbol);
//   }

//   targetCell.addClass('occupied');
// }

// $(".level").each(() => {
//   let $this = $(this);

//   $this.click(() => {
//     $('.selected').toggleClass('not-selected');
//     $('.selected').toggleClass('selected');

//     $this.toggleClass('not-selected');
//     $this.toggleClass('selected');

//     ai.level = $this.attr('id');
//     let selectedDifficulty = $('.selected').attr("id");

//     if (selectedDifficulty) {
//       let aiPlayer = new AI(selectedDifficulty);
//       global[game] = new Game(aiPlayer);

//       aiPlayer.plays(global.game);
//       global.game.start();
//     }
//   });
// });

// $(".cell").each(() => {
//   let $this = $(this);

//   $this.click(() => {
//     console.log(`This IS the GLOBAL! object`, global);
//     if (
//       global.game.status === 'running' &&
//       global.game.state.turn === 'X' &&
//       !$this.hasClass('occupied')
//     ) {
//       let idx = parseInt($this.data("idx"));
//       let next = new State(global.game.state);

//       next.board[idx] = 'X';

//       ui.insertAt(idx, 'X');

//       next.advanceTurn();

//       global.game.advanceTo(next);
//     }
//   });
// });