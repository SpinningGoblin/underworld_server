import { useEffect, useRef, useState } from "react";
import goblin from "./images/goblin_big_hat.svg";
import "./App.css";
import { generateGame, getGameIds } from "./api/game";
import { setCurrentGameId } from "./api/current-game";
import {
  GameEvent,
  PerformAction,
  PlayerCharacter,
  Room,
} from "./generated-api";
import {
  ActionPerformed,
  getCurrentActions,
  getCurrentRoom,
  listenActionPerformed,
  listenError,
  removeActionPerformedListener,
  removeErrorListener,
} from "./api/actions";
import { generatePlayer, getCurrentPlayer } from "./api/player";
import { GetReadyScreen } from "./components/GetReadyScreen";
import { GameScreen } from "./components/GameScreen";

export const App = () => {
  const [gameIds, setGameIds] = useState<Array<string>>([]);
  const [gameId, setGameId] = useState<string | undefined>();
  const [room, setRoom] = useState<Room | undefined>();
  const [actions, setActions] = useState<Array<PerformAction>>([]);
  const [player, setPlayer] = useState<PlayerCharacter | undefined>();
  const [events, setEvents] = useState<Array<GameEvent>>([]);
  const [ready, setReady] = useState<boolean>(false);
  const firstPlayerLoadDone = useRef<boolean>(false);

  const onClickGetGameIds = async () => {
    setGameIds(await getGameIds());
  };

  const onClickGenerateGame = () => {
    generateGame()
      .then((generatedGame) => {
        setGameIds((existing) => [...existing, generatedGame.game_id]);
        setGameId(generatedGame.game_id);
      })
      .catch((e) => console.error(e));
  };

  const onClickGeneratePlayer = () => {
    generatePlayer()
      .then((generatedPlayer) => {
        setPlayer(generatedPlayer);
        return getCurrentActions();
      })
      .then((currentActions) => setActions(currentActions))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    if (ready && !firstPlayerLoadDone.current) {
      Promise.all([getCurrentPlayer(), getGameIds()])
        .then(([pl, ids]) => {
          setPlayer(pl);
          setGameIds(ids);
        })
        .catch((e) => console.error(e))
        .finally(() => (firstPlayerLoadDone.current = true));
    }
  }, [ready]);

  useEffect(() => {
    const callback = (error: string) => {
      console.error(error);
      if (error === "PlayerIsDeadError") {
        alert("You can't do that with a dead character.");
      }
    };
    listenError(callback);

    return () => removeErrorListener(callback);
  }, []);

  useEffect(() => {
    const callback = (actionPerformed: ActionPerformed) => {
      if (actionPerformed.room) {
        setRoom(actionPerformed.room);
      }
      if (actionPerformed.player) {
        setPlayer(actionPerformed.player);
      }
      setActions(actionPerformed.actions);

      const events = actionPerformed.events.slice();
      events.reverse();

      setEvents((existing) => [
        ...events,
        ...existing,
      ]);

      for (const event of actionPerformed.events) {
        if (event.name === "player_killed") {
          alert("You Died!");
        }
      }
    };
    listenActionPerformed(callback);

    return () => removeActionPerformedListener(callback);
  }, []);

  useEffect(() => {
    if (gameId) {
      setCurrentGameId(gameId);
      Promise.all([
        getCurrentRoom(),
        getCurrentActions(),
        getCurrentPlayer(),
      ]).then(([room, actions, player]) => {
        setRoom(room);
        setActions(actions);
        setPlayer(player);
      });
    } else {
      setCurrentGameId("");
      setRoom(undefined);
      setActions([]);
    }
  }, [gameId]);

  const options = [<option key="empty" value=""></option>];

  gameIds
    .sort((a, b) => a.localeCompare(b))
    .forEach((id) =>
      options.push(
        <option key={id} value={id}>
          {id}
        </option>,
      ),
    );

  if (!ready) {
    return <GetReadyScreen onReadyClicked={() => setReady(true)} />;
  }

  const allowGeneratePlayer =
    !player || player.character.stats.health!.current === 0;

  const renderGameIds = (openingPage: boolean) => (
    <>
      {player && gameIds.length === 0 && (
        <button className="generate-button" onClick={onClickGetGameIds}>
          Get game IDs
        </button>
      )}
      <div className="game-ids">
        <span className="title">Current Game</span>
        <div className="id-and-generate">
          {gameIds.length > 0 && (
            <select
              className={`game-id-select ${
                openingPage ? "opening-page-ids" : ""
              }`}
              value={gameId || ""}
              onChange={(event) => {
                if (event.currentTarget.value) {
                  setGameId(event.currentTarget.value);
                } else {
                  setGameId(undefined);
                }
              }}
            >
              {options}
            </select>
          )}
          {player && (
            <button className="generate-button" onClick={onClickGenerateGame}>
              New Game
            </button>
          )}
        </div>
      </div>
    </>
  );

  if (room && player) {
    return (
      <GameScreen
        room={room}
        player={player}
        events={events}
        actions={actions}
        allowGeneratePlayer={allowGeneratePlayer}
        onClickGeneratePlayer={onClickGeneratePlayer}
        gameIdSelector={renderGameIds(false)}
      />
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={goblin} className="App-logo" alt="logo" />
        <p>Underworld Server</p>
      </header>
      <div className="body">
        <button className="generate-button" onClick={onClickGeneratePlayer}>
          Generate new player character
        </button>
        {renderGameIds(true)}
      </div>
    </div>
  );
};
