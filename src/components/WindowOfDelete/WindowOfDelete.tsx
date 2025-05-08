import type React from "react";

type Props = { handleDeleteButton: (e: boolean) => void };

export const WindowOfDelete: React.FC<Props> = ({ handleDeleteButton }) => {
  return (
    <div className="window-od-delete">
      <h3 className="window-od-delete__title">
        Ты серьёзно хочешь удалить этого БРО?
      </h3>
      <div className="window-od-delete__buttons">
        <button
          type="button"
          className="window-od-delete__button"
          onClick={() => {
            handleDeleteButton(true);
          }}
        >
          Конечно
        </button>
        <button
          type="button"
          className="window-od-delete__button"
          onClick={() => {
            handleDeleteButton(false);
          }}
        >
          Неееет!
        </button>
      </div>
    </div>
  );
};
