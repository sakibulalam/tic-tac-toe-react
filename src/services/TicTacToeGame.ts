import Player from "../models/Player";
import GamePlayState from "../models/GamePlayState";

type GameWinCondition = [number, number, number];
const GAME_WIN_CONDITIONS: GameWinCondition[] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const tryGameWinCondition = (squares: Player[]): GameWinCondition | null => {
    for (const item of GAME_WIN_CONDITIONS) {
        const [a, b, c] = item;
        if ((squares[a] && squares[a] === squares[b] && squares[a] === squares[c])) {
            return item;
        }
    }

    return null;
}

const isGameOver = (squares: Player[]): boolean => {
    return squares.filter(v => v === Player._).length === 0;
}

export type GameState = {
    index: number,
    squares: Player[],
};

export const calculateNextPlayer = (player: Player): Player => player === Player.X ? Player.O : Player.X;

const tryNextPlayer = (player: Player, gameState: GameState): Player => {
    let xCount = 0;
    let oCount = 0;
    gameState.squares.forEach(player => {
        if (player === Player.X) {
            xCount = xCount++
        } else if (player === Player.O) {
            oCount = oCount++
        }
    });

    if (xCount === 0 && oCount === 0) {
        return player;
    }

    if (xCount > oCount) {
        return Player.O;
    }

    return Player.X;
};

export const calculateGamePlayState = (gameState: GameState): GamePlayState => {
    let gameWinCondition = tryGameWinCondition(gameState.squares);

    if (gameWinCondition !== null) {
        return GamePlayState.WINNER;
    } else if (isGameOver(gameState.squares)) {
        return GamePlayState.GAME_OVER;
    }
    return GamePlayState.PLAYING;
}

export const tryMove = (squareIndex: number, player: Player, lastGameState: GameState): [boolean, GameState] => {
    if (lastGameState.squares[squareIndex] !== Player._) {
        return [false, lastGameState];
    }

    let nextPlayer = tryNextPlayer(player, lastGameState);

    if (nextPlayer !== player) {
        return [false, lastGameState];
    }

    return [
        true,
        {
            index: lastGameState.index + 1,
            squares: lastGameState.squares.map((value, index) => index === squareIndex ? player : value),
        }
    ];
}

