const prompt = require('prompt-sync')();

const BOARD_LENGTH = 3;
const PLAYER_ONE = 'X';
const PLAYER_TWO = 'O';
EMPTY = ' ';

let isPlayerOnesTurn = true;
let board = new Array(9).fill(' ');
let winner = null;

const getCurrentPlayer = () => {
  return isPlayerOnesTurn ? PLAYER_ONE : PLAYER_TWO;
};

// Messages
const MOVE_PROMPT = `Player ${getCurrentPlayer()}, please enter the index of your next move: `;
const INVALID_INPUT = 'Wrong input. Please try again';
const OUT_OF_BOUNDS = 'Position out of bounds. Please try again.';
const POSITION_FILLED = 'Position already filled. Please try again.';
const DRAW_MESSAGE = 'The game ended in a draw.';
const WIN_MESSAGE = `\n Player ${getCurrentPlayer()} has won the game!!`;
const REPLAY_PROMPT = 'Do you wish to play again? [Y/N] ';

WINNING_TRIOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const print_game_board = (board, padding) => {
  const divider = '-';
  const horizontal_divider = divider.repeat(
    BOARD_LENGTH * (2 * padding + 1) + 2
  );

  for (let i = 0; i < BOARD_LENGTH; i++) {
    if (i !== 0) console.log(horizontal_divider);

    const start = i * BOARD_LENGTH;
    let row = start + BOARD_LENGTH;

    const rowArray = board
      .slice(start, row)
      .map((elem) => `${EMPTY.repeat(padding)}${elem}${EMPTY.repeat(padding)}`)
      .join('|');

    console.log(rowArray);
  }
};

const resetGame = () => {
  isPlayerOnesTurn = true;
  board = new Array(9).fill(' ');
  winner = null;
};

const playGame = () => {
  print_game_board(board, 1);
};

const main = () => {
  playGame();
  // while (winner === null) {
  prompt(console.log(MOVE_PROMPT));
  // }
};

main();
