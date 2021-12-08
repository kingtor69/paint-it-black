import React from 'react';
import {render} from '@testing-library/react';
import Board from './Board.js';

it("should render without crashing", () => {
    render(<Board />);
});

describe("on load, it should render 5x5 table of boolean values", () => {
    it("should render a table", () => {
        const { getByTestId } = render(<Board />);
        expect(getByTestId('Board-table')).toBeInTheDocument();
    });
    it("should include game header", () => {
        const {getByText } = render(<Board />);
        expect(getByText("I see a red square and I want to paint it bla-ack.", {exact: false})).toBeInTheDocument()     
    })
    // how do you test how many trs and tds there are?
    // and how do you test the type of the tds?
});
