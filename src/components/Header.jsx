export default function Header({ data }) {
  const { gameStarted, win, time, resetGame } = data;
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);

  return (
    <header>
      <h1>Welcome to a memory game!</h1>
      <div>
        {win ? (
          <div className="win-message">
            <p>
              Congratulations! You won! Your time: {minutes}:{seconds}.
            </p>
            <button className="reset-btn" onClick={resetGame}>
              Reset
            </button>
          </div>
        ) : (
          <p>
            {gameStarted
              ? `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
              : "Start your game by clicking a card. Good luck!"}
          </p>
        )}
      </div>
    </header>
  );
}
