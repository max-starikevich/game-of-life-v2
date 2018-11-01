# Game of Life (2018)

According to Wikipedia, the Game of Life, also known simply as Life, is a board game originally created in 1860 by Milton Bradley, as The Checkered Game of Life. 

The Game of Life was America's first popular parlour game. The game simulates a person's travels through his or her life, from college to retirement, with jobs, marriage, and possible children along the way. 

Two to six players can participate in one game. Variations of the game accommodate eight to ten players.

The modern version was originally published 100 years later, in 1960. It was created and co-designed by toy and game designer Reuben Klamer and was "heartily endorsed" by Art Linkletter. 

It is now part of the permanent collection of the Smithsonian's National Museum of American History and an inductee into the National Toy Hall of Fame.

It's my free implementation of the game to taste some new tech features.

# Instructions

I assume, that you have already installed Docker and Docker Compose.

```bash
$ git clone git@github.com:max-starikevich/game-of-life-2018.git
$ cd game-of-life-2018
$ cp .env.example .env
$ docker-compose up
```

And then, open `http://localhost/` in your favourite browser, in few tabs at the same time.

It's production mode by default. 

If you want to make your hands dirty, open `.env` file and change `MODE` to `development`.

And then again:

```bash
$ docker-compose up
```

`webpack-dev-server` will be available on port 8080. Just open `http://localhost:8080/` in the browser.


Enjoy!
