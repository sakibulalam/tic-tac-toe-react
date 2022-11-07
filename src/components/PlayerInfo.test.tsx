import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import PlayerInfo from "./PlayerInfo";
import Player from "../models/Player";
import GamePlayState from "../models/GamePlayState";

test.each`
gamePlayState              | expectedText
${GamePlayState.PLAYING}   | ${'Next Turn'}
${GamePlayState.WINNER}    | ${'Winner'}
${GamePlayState.GAME_OVER} | ${'Game Over'}
`("correctly displays text '$expectedText' based on game state '$gamePlayState'", ({gamePlayState, expectedText}) => {
    render(<PlayerInfo gamePlayState={gamePlayState} player="X"/>);
    const bannerText = screen.getByText(new RegExp(`\\b${expectedText}\\b`, 'i'));
    expect(bannerText).toBeInTheDocument();
});

test.each`
gamePlayState              | expectedVisibility
${GamePlayState.PLAYING}   | ${true}
${GamePlayState.WINNER}    | ${true}
${GamePlayState.GAME_OVER} | ${false}
`("correctly shows/hide player based on game state '$gamePlayState'", ({gamePlayState, expectedVisibility}) => {
    render(<PlayerInfo gamePlayState={gamePlayState} player="X"/>);
    const playerText = screen.getByText(/\bX\b/i);
    if (expectedVisibility) {
        expect(playerText).toBeVisible();
    } else {
        expect(playerText).toHaveClass('invisible');
    }
});