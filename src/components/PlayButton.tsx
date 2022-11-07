import GamePlayState from "../models/GamePlayState";
import React from "react";

type Props = {
    gamePlayState: GamePlayState,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

const PlayButton: React.FC<Props> = ({gamePlayState, onClick}: Props) =>
    <button className={`text-3xl hover:underline ${gamePlayState === GamePlayState.PLAYING ? 'invisible' : ''}`}
            onClick={onClick}>
        Play Again?
    </button>;

export default PlayButton;