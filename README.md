# Game of Life (2018)

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.

One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.


## Rules 

The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

Any live cell with fewer than two live neighbors dies, as if by underpopulation.

Any live cell with two or three live neighbors lives on to the next generation.

Any live cell with more than three live neighbors dies, as if by overpopulation.

Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick. Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.

# Instructions

I assume, that you have already installed Docker and Docker Compose.

First of all, let's clone the repo (HTTPS method):

```bash
$ git clone https://github.com/max-starikevich/game-of-life-2018
```

Or through the SSH:

```bash
$ git clone git@github.com:max-starikevich/game-of-life-2018.git
```

And then:

```bash
$ cd game-of-life-2018
$ docker-compose up --build
```

And then, open `http://localhost/` in your favourite browser, in few tabs at the same time.

It's production mode by default. 

If you want to make your hands dirty, you need to start dev-version of the project:

```bash
$ docker-compose -f docker-compose.dev.yml up --build
```

`webpack-dev-server` will be available on port 8080. Just open `http://localhost:8080/` in the browser.

Enjoy!
