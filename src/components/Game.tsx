import React, {useState} from "react";
import GamePlayState from "../models/GamePlayState";
import Board from "./Board";
import PlayerInfo from "./PlayerInfo";
import PlayButton from "./PlayButton";
import Player from "../models/Player";
import {calculateGamePlayState, calculateNextPlayer, GameState, tryMove} from "../services/TicTacToeGame";
import GameWinLayout from "../models/GameWinLayout";

type PlayerGameState = {
    player: Player,
    gameState: GameState,
};

const INITIAL_GAME_STATE: PlayerGameState = {
    player: Player.X,
    gameState: {
        index: 0,
        squares: Array(9).fill(Player._),
    }
};

const Game: React.FC = () => {
    const [playerGameState, setPlayerGameState] = useState<PlayerGameState>({
        player: Player.X,
        gameState: {
            index: 0,
            squares: Array(9).fill(Player._),
        }
    });

    const [gamePlayState, setGamePlayState] = useState<GamePlayState>(GamePlayState.PLAYING);

    const [gameWinLayout, setGameWinLayout] = useState<GameWinLayout | null>(null);

    const commitTurn = (squareIndex: number) => {
        if (gamePlayState !== GamePlayState.PLAYING) {
            return;
        }

        setPlayerGameState((prevGameState: PlayerGameState) => {
            let [success, nextGameState] = tryMove(squareIndex, prevGameState.player, prevGameState.gameState)
            let [gamePlayState, gameWinLayout] = calculateGamePlayState(nextGameState);
            setGameWinLayout(gameWinLayout)
            setGamePlayState(gamePlayState);

            let player = prevGameState.player;
            if (success && gamePlayState === GamePlayState.PLAYING) {
                player = calculateNextPlayer(prevGameState.player);
            }

            return {
                player: player,
                gameState: nextGameState
            };
        });
    }

    const resetGame = () => {
        setPlayerGameState(INITIAL_GAME_STATE);
        setGamePlayState(GamePlayState.PLAYING);
        setGameWinLayout(null);
    }

    return <div className="w-screen flex-grow flex flex-row justify-center items-center">
        <div className="flex flex-col-reverse">
            <div className="flex flex-col">
                <Board squares={playerGameState.gameState.squares}
                       squareClickHandler={squareIndex => commitTurn(squareIndex)}
                       winLayout={gameWinLayout}/>
                <PlayButton onClick={resetGame} gamePlayState={gamePlayState}/>
            </div>

            <PlayerInfo player={playerGameState.player} gamePlayState={gamePlayState}/>
        </div>
    </div>;
}

export default Game;