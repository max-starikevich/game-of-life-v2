# Game of Life (2018)

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.

One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.

# Instructions

I assume, that you have already installed Docker and Docker Compose.

First of all, let's clone the repo:

```bash
$ git clone https://github.com/max-starikevich/game-of-life-2018
```

Or though the SSH:

```bash
$ git clone https://github.com/max-starikevich/game-of-life-2018
```

And then:

```bash
$ cd game-of-life-2018
$ docker-compose up
```

And then, open `http://localhost/` in your favourite browser, in few tabs at the same time.

It's production mode by default. 

If you want to make your hands dirty, you need to start dev-version of the project:

```bash
$ docker-compose -f docker-compose.dev.yml up
```

`webpack-dev-server` will be available on port 8080. Just open `http://localhost:8080/` in the browser.

Enjoy!
