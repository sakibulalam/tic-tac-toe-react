import Square from "./Square";
import React from "react";
import "./Board.css"
import Player from "../models/Player";
import GameWinLayout from "../models/GameWinLayout";


const GAME_WIN_CLASS_NAMES: Map<GameWinLayout, string> = new Map([
    [GameWinLayout.ROW_ONE, 'win win-row-one'],
    [GameWinLayout.ROW_TWO, 'win win-row-two'],
    [GameWinLayout.ROW_THREE, 'win win-row-three'],
    [GameWinLayout.COLUMN_ONE, 'win win-column-one'],
    [GameWinLayout.COLUMN_TWO, 'win win-column-two'],
    [GameWinLayout.COLUMN_THREE, 'win win-column-three'],
    [GameWinLayout.DIAGONAL_ONE, 'win win-diagonal-one'],
    [GameWinLayout.DIAGONAL_TWO, 'win win-diagonal-two'],
]);

type SquareClickHandler = (squareIndex: number) => void;

interface Props {
    squares: Player[],
    squareClickHandler: SquareClickHandler,
    winLayout: GameWinLayout | null
}

const drawSquare = (i: number, value: Player, handler: SquareClickHandler) =>
    <Square value={value} onClick={() => handler(i)} key={i} index={i}/>
;

const Board: React.FC<Props> = ({squares, squareClickHandler, winLayout}: Props) =>
    <div className={`board m-6 grid grid-cols-3 ${winLayout ? GAME_WIN_CLASS_NAMES.get(winLayout) : ''}`}>
        {[...Array(9)].map((_, i) => drawSquare(i, squares[i], squareClickHandler))}
    </div>

export default Board;