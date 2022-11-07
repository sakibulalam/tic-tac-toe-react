import React from "react";
import GamePlayState from "../models/GamePlayState";

interface Props {
    player: string,
    gamePlayState: GamePlayState,
}

const INFO_MAP: Map<GamePlayState, string> = new Map<GamePlayState, string>(
    [
        [GamePlayState.PLAYING, "Next Turn"],
        [GamePlayState.WINNER, "Winner"],
        [GamePlayState.GAME_OVER, "Game Over"],
    ]
)

const PlayerInfo: React.FC<Props> = ({gamePlayState, player}: Props) =>
    <div className="text-4xl text-center flex flex-col">
        <p>
            {INFO_MAP.get(gamePlayState)}
        </p>
        <p className={gamePlayState === GamePlayState.GAME_OVER ? 'hidden' : ''}>{player}</p>
    </div>;

export default PlayerInfo;