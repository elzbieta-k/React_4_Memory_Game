import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { cards } from "./data/cards";
import Header from "./components/Header";

function App() {
  const [cardsSet, setCardsSet] = useState(cards);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(0);
  const [win, setWin] = useState(false);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  //displaying random cards when website loads
  useEffect(() => {
    setCardsSet(shuffleArray(cards));
  }, []);

  //Function that shuffles objects in data array
  function shuffleArray(array) {
    const shuffled = [...array]; // copy so we don’t mutate original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
    }
    return shuffled;
  }

  //Function to handle flipping the card
  function handleFlipp(card) {
    setGameStarted(true);

    //when to cards are flipped, do nothing - wait until they are checked
    if (flipped.length >= 2) return;

    //when the card is already flipped or matched - ignore the click
    if (card.isFlipped || card.isMatched) return;

    //update flipped to true
    const { id, name } = card;
    setFlipped((prev) => [...prev, { id, name }]);

    //update set of cards
    setCardsSet((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  }

  //when a card is flipped checking if two cards match
  useEffect(() => {
    if (flipped.length !== 2) return;

    const [firstCard, secondCard] = flipped;

    if (firstCard.name === secondCard.name) {
      setCardsSet((prev) =>
        prev.map((card) =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isMatched: true }
            : card
        )
      );
      setMatched((prev) => prev + 1);
      setFlipped([]);
    } else {
      setTimeout(() => {
        setCardsSet((prev) =>
          prev.map((card) =>
            card.id === firstCard.id || card.id == secondCard.id
              ? { ...card, isFlipped: false }
              : card
          )
        );

        setFlipped([]);
      }, 1000);
    }
  }, [flipped]);

  //start timer when gameStarted sets to true
  useEffect(() => {
    if (!gameStarted) return;
    const intervalId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [gameStarted]);

  //checking if all cards are matched
  useEffect(() => {
    const allMatched = cardsSet.every((card) => card.isMatched);
    if (allMatched) {
      setWin(true);
      setGameStarted(false);
    }
  }, [cardsSet]);

  //function that reset game
  function resetGame() {
    setTime(0);
    setCardsSet(shuffleArray(cards));
    setWin(false);
  }

  return (
    <>
      <Header data={{ gameStarted, win, time, resetGame }} />
      <main>
        {cardsSet.map((card) => (
          <Card key={card.id} data={{ card, handleFlipp }} />
        ))}
      </main>
    </>
  );
}

export default App;
