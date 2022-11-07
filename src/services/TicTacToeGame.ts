import Player from "../models/Player";
import GamePlayState from "../models/GamePlayState";
import GameWinLayout from "../models/GameWinLayout";

type GameWinCondition = [number, number, number];
const GAME_WIN_CONDITIONS: Map<GameWinLayout, GameWinCondition> = new Map([
    [GameWinLayout.ROW_ONE, [0, 1, 2]],
    [GameWinLayout.ROW_TWO, [3, 4, 5]],
    [GameWinLayout.ROW_THREE, [6, 7, 8]],
    [GameWinLayout.COLUMN_ONE, [0, 3, 6]],
    [GameWinLayout.COLUMN_TWO, [1, 4, 7]],
    [GameWinLayout.COLUMN_THREE, [2, 5, 8]],
    [GameWinLayout.DIAGONAL_ONE, [0, 4, 8]],
    [GameWinLayout.DIAGONAL_TWO, [2, 4, 6]],
]);

const tryGameWinCondition = (squares: Player[]): GameWinLayout | null => {
    for (const key of Array.from(GAME_WIN_CONDITIONS.keys())) {
        const [a, b, c]: GameWinCondition = GAME_WIN_CONDITIONS.get(key)!;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return key;
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

export const calculateGamePlayState = (gameState: GameState): [GamePlayState, GameWinLayout | null] => {
    let gameWinLayout = tryGameWinCondition(gameState.squares);

    if (gameWinLayout !== null) {
        return [GamePlayState.WINNER, gameWinLayout];
    } else if (isGameOver(gameState.squares)) {
        return [GamePlayState.GAME_OVER, null];
    }
    return [GamePlayState.PLAYING, null];
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

