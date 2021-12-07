import React from 'react';
import {render} from '@testing-library/react';
import Cell from './Cell.js';

it("should render without crashing", () => {
    render(<Cell />);
});