import type React from "react";
import { PlayerCard } from "../Player/PlayerCard";
import type { PlayerType } from "../../types/PlayerType";

type Props = {
  players: PlayerType[];
  setPlayers: React.Dispatch<React.SetStateAction<PlayerType[]>>; 
  setErrorMesage: (mess: string) => void;
};

export const PlayersList: React.FC<Props> = ({
  players,
  setPlayers,
  setErrorMesage,
}) => {
  return (
    <div className="players-list">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          players={players}
          setPlayers={setPlayers}
          setErrorMesage={setErrorMesage}
        />
      ))}
    </div>
  );
};
