export default function Header({ data }) {
  const { gameStarted, win, time, resetGame } = data;
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);

  return (
    <header>
      <h1>Welcome to a memory game!</h1>
      <p>
        {gameStarted
          ? `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
          : "0:00"}
      </p>
      <div>
        {win ? (
          <div>
            <p>Congratulations! You won</p>
            <button onClick={resetGame}>Reset</button>
          </div>
        ) : (
          ""
        )}{" "}
      </div>
    </header>
  );
}
