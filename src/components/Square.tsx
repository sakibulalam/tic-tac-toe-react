import React from "react";
import Player from "../models/Player";

interface Props {
    value: Player,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

const Square: React.FC<Props> = ({value, onClick}: Props) =>
    <button className="block w-12 h-12 text-5xl"
            disabled={value !== Player._}
            onClick={onClick}>{value}</button>

export default Square;
