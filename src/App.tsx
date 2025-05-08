import { useEffect, useState } from "react";
import "./App.scss";
import { PlayersList } from "./components/PlayersList/PlayersList";
import type { PlayerType } from "./types/PlayerType";

function App() {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [errorMesage, setErrorMesage] = useState("");
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    try {
      const localStoragePlayers = localStorage.getItem("players");

      if (!localStoragePlayers) {
        throw new Error();
      }

      const parsedPlayers: PlayerType[] = JSON.parse(localStoragePlayers);

      setPlayers(parsedPlayers);
      setErrorMesage(parsedPlayers.length === 0 ? "Игроки не найдены" : "");
    } catch {
      setPlayers([]);
      setErrorMesage("Игроки не найдены");
    }
  }, []);

  const handleSaveButton = () => {
    setIsAddingPlayer(false);

    if (inputName.trim()) {
      const newPlayer: PlayerType = {
        id: Date.now(),
        name: inputName,
        numberOfWins: 0,
        gameScore: 0,
      };

      const listPlayers = [...players, newPlayer];
      setPlayers(listPlayers);
      localStorage.setItem("players", JSON.stringify(listPlayers));

      if (listPlayers.length > 0) {
        setErrorMesage("");
      }

      setInputName("");
    }
  };

  const handleCancelButton = () => {
    setIsAddingPlayer(false);
    setInputName("");
  };
  

  return (
    <>
      <div className="app">
        <div className="app__content">
          <h1 className="app__title">Players:</h1>
          {errorMesage ? (
            <>
              <div className="app__error-mesage">{errorMesage}</div>
            </>
          ) : (
            <PlayersList
              players={players}
              setPlayers={setPlayers}
              setErrorMesage={setErrorMesage}
            />
          )}

          {isAddingPlayer ? (
            <>
              <div className="app__add-input-container">
                <input
                  type="text"
                  className="app__input"
                  value={inputName}
                  onChange={(e) => {
                    setInputName(e.target.value);
                  }}
                  autoFocus
                />
                <div className="app__add-input-container-buttons">
                  <button
                    type="button"
                    className="app__add-button"
                    onClick={handleSaveButton}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="app__add-button"
                    onClick={() => {
                      handleCancelButton();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          ) : (
            <button
              type="button"
              className="app__add-button"
              onClick={() => {
                setIsAddingPlayer(true);
              }}
            >
              Add Player
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
