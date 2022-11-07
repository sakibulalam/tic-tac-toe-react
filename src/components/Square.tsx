import React from "react";
import Player from "../models/Player";

interface Props {
    index?: number,
    value: Player,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

const ariaLabel = (player: Player, index?: number, ) : string => {
    let label = '';
    if (index !== undefined) {
        label += `Square ${index + 1}, `;
    }

    if (player !== Player._) {
        label += `Player by ${player}`;
    } else {
        label += `Empty`;
    }

    return label;
}

const Square: React.FC<Props> = ({index, value, onClick}: Props) =>
    <button className="block w-12 h-12 text-5xl"
            disabled={value !== Player._}
            onClick={onClick} aria-label={ariaLabel(value, index)}>{value}</button>

export default Square;
