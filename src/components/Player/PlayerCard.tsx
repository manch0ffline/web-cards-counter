import type React from "react";
import type { PlayerType } from "../../types/PlayerType";
import { Loader } from "../Loader/Loader";
import { useState } from "react";
import { NumberOfWinsEnum } from "../../types/NumberOfWins";
import { GameScore } from "../../types/GameScore";
import { WindowOfDelete } from "../WindowOfDelete/WindowOfDelete";

type Props = {
  player: PlayerType;
  players: PlayerType[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerType[]>>;
  setErrorMesage: (mess: string) => void;
};

export const PlayerCard: React.FC<Props> = ({
  player,
  players,
  setPlayers,
  setErrorMesage,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [windowOfDelete, setWindowOfDelete] = useState(false);

  const handleNumberOfWins = (type: NumberOfWinsEnum) => {
    const updatedPlayers = players.map((plr) => {
      if (plr.id === player.id) {
        return {
          ...plr,
          numberOfWins:
            type === "plus"
              ? plr.numberOfWins + 1
              : Math.max(plr.numberOfWins - 1, 0),
          gameScore: 0,
        };
      }

      return { ...plr, gameScore: 0 };
    });
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  const handleGameScore = (count: GameScore) => {
    const updatedPlayers = players.map((plr) => {
      if (plr.id === player.id) {
        return {
          ...plr,
          gameScore: plr.gameScore + count,
        };
      }
      return plr;
    });
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  const deletePlayer = (playerId: number) => {
    const filteredPlayers = players.filter((plr) => plr.id !== playerId);
    setIsDeleting(true);

    setTimeout(() => {
      setPlayers((prev: PlayerType[]) => prev.filter((p) => p.id !== playerId));

      localStorage.setItem("players", JSON.stringify(filteredPlayers));

      if (filteredPlayers.length === 0) {
        setErrorMesage("Игроки не найдены");
      }
      setIsDeleting(false);
    }, 500);
  };

  const handleDeleteButton = (type: boolean) => {
    if (type) {
      setWindowOfDelete(false);
      deletePlayer(player.id);
    } else {
      setWindowOfDelete(false);
      setIsDeleting(false);
    }
  };

  return (
    <>
      {windowOfDelete ? (
        <WindowOfDelete handleDeleteButton={handleDeleteButton} />
      ) : (
        <div className="player">
          <div className="player__top">
            <div className="player__name">{player.name}</div>
            <i
              className="fa-regular fa-circle-xmark player__icon"
              onClick={() => {
                setWindowOfDelete(true);
              }}
            ></i>
          </div>

          <div className="player__number-of-wins">
            <h3 className="player__h3">Количесто побед:</h3>
            <div className="player__number-of-wins__container">
              <i
                className="fa-regular fa-circle-down player__icon"
                onClick={() => {
                  handleNumberOfWins(NumberOfWinsEnum.minus);
                }}
              ></i>
              {player.numberOfWins}
              <i
                className="fa-regular fa-circle-up player__icon"
                onClick={() => {
                  handleNumberOfWins(NumberOfWinsEnum.plus);
                }}
              ></i>
            </div>
          </div>

          <div className="player__line"></div>

          <div className="player__game-score">
            <div className="player__top">
              <h3 className="player__h3">Очки текущей игры:</h3>
              <span>{player.gameScore}</span>
            </div>
            <div className="player__add-score-buttons">
              <button
                type="button"
                className="player__add-button"
                onClick={() => {
                  handleGameScore(GameScore["plus-10"]);
                }}
              >
                +10
              </button>
              <button
                type="button"
                className="player__add-button"
                onClick={() => {
                  handleGameScore(GameScore["plus-15"]);
                }}
              >
                +15
              </button>
              <button
                type="button"
                className="player__add-button"
                onClick={() => {
                  handleGameScore(GameScore["plus-20"]);
                }}
              >
                +20
              </button>
              <button
                type="button"
                className="player__add-button"
                onClick={() => {
                  handleGameScore(GameScore["minus-20"]);
                }}
              >
                -20
              </button>
            </div>
          </div>
          {isDeleting && <Loader />}
        </div>
      )}
    </>
  );
};
