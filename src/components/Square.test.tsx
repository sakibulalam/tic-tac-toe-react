import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Square from './Square';
import Player from "../models/Player";

test.each`
player      | value
${Player.X} | ${'X'}
${Player.O} | ${'O'}
`("correctly displays '$player' with correct value '$value'", ({player, value}) => {
    render(<Square value={player} onClick={jest.fn()}/>);
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent(new RegExp(`\\b${value}\\b`));
});

test('correctly displays empty player', () => {
    render(<Square value={Player._} onClick={jest.fn()}/>);
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent("");
});

test('handler called if not played', () => {
    const cb = jest.fn();
    render(<Square value={Player._} onClick={cb}/>);

    const button = screen.getByRole('button')

    expect(button).toBeEnabled()

    fireEvent.click(button)
    expect(cb).toBeCalledTimes(1);
});

test('disables button if already played', () => {
    const cb = jest.fn();
    render(<Square value={Player.X} onClick={cb}/>);

    const button = screen.getByRole('button')

    expect(button).toBeDisabled()

    fireEvent.click(button)
    expect(cb).toBeCalledTimes(0);
});
