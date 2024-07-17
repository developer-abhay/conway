**Disclaimer:** This project prioritizes functionality over UI design. It is implemented purely in JavaScript without the use of any libraries or frameworks.

# Conway's Game of Life

Conway's Game of Life is a cellular automaton devised by mathematician John Conway. This project implements the Game of Life using JavaScript, allowing users to observe the evolution of a 30x30 grid based on specific rules.

## Overview

In the Game of Life, each cell on a 2D grid can be in one of two states: alive or dead. The state of each cell changes based on the states of its eight neighbors according to the following rules:

1. A dead cell will come alive if exactly 3 neighbors are living.
2. A living cell will stay alive if 2 or 3 neighbors are living.
3. Cells with fewer than 2 neighbors will die of underpopulation.
4. Cells with 4 or more neighbors will die of overpopulation.

## Features

- **30x30 Grid**: The default grid size is 30x30.
- **Cell State Toggle**:Click on any cell to toggle its state between alive (yellow) and dead (gray).
- **Next State Calculation**: Calculate and display the next state of the grid based on the rules.
- **Auto Play**: Click the "Auto Play" button to start automatically advancing to the next state at regular intervals. Click "Stop Play" to stop the automatic progression.
- **Grid Size Options**: Change the grid size (e.g., 50x50, 100x100).
- **Reset Grid**: Reset the grid to the initial state with an example pattern.
- **Example Pattern**: Displays an initial heart-shaped pattern.

## Setup Instructions

1. Clone the repository:

   ```sh
   git clone https://github.com/developer-abhay/conway.git
   ```

2. Navigate to the project directory:

   ```sh
   cd game-of-life
   ```

3. Open `index.html` in your web browser to view and interact with the game.

## Example Pattern

Upon resetting the grid, an initial heart-shaped pattern is displayed. This can be used as a starting point to observe the evolution of the grid.
