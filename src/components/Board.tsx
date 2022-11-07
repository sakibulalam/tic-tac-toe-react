import Square from "./Square";
import React from "react";
import "./Board.css"
import Player from "../models/Player";

type SquareClickHandler = (squareIndex: number) => void;

interface Props {
    squares: Player[],
    squareClickHandler: SquareClickHandler
}

const drawSquare = (i: number, value: Player, handler: SquareClickHandler) =>
    <Square value={value} onClick={() => handler(i)}/>
;

const Board: React.FC<Props> = ({squares, squareClickHandler}: Props) =>
    <div className="board m-6 grid grid-cols-3">
        {[...Array(9)].map((_, i) => drawSquare(i, squares[i], squareClickHandler))}
    </div>

export default Board;