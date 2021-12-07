import React from 'react';
import {render} from '@testing-library/react';
import Board from './Board.js';

it("should render without crashing", () => {
    render(<Board />);
});

describe("it should render 5x5 table of boolean values", () => {
    it("should render a table", () => {
        const { getByTestId } = render(<Board />);
        expect(getByTestId('Board-table')).toBeInTheDocument();
    });
    // how do you test how many trs and tds there are?
});
