import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";

const cardList = [
  {
    src: "/img/01.svg",
  },
  {
    src: "/img/02.svg",
  },
  {
    src: "/img/03.svg",
  },
  {
    src: "/img/04.svg",
  },
  {
    src: "/img/05.svg",
  },
  {
    src: "/img/06.svg",
  },
  {
    src: "/img/07.svg",
  },
  {
    src: "/img/08.svg",
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);

  const randomizeCards = () => {
    const randomizedCards = [...cardList, ...cardList].sort(() => Math.random() - 0.5).map((c, i) => ({ ...c, id: i, isMatched: false }));
    setCards(randomizedCards);
    setFirstCard(null);
    setSecondCard(null);
    setTurns(0);
  };

  const handleCardClick = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  const handleTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (score === 8) return alert("You won!");
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.src === secondCard.src) {
        setCards((prev) => prev.map((card) => (card.src === firstCard.src ? { ...card, isMatched: true } : card)));
        setScore((prev) => prev + 1);
        handleTurn();
      } else {
        setTimeout(handleTurn, 1000);
      }
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    randomizeCards();
  }, []);

  return (
    <div className="app">
      <h1>Tile game</h1>
      <button onClick={randomizeCards}>New game</button>

      <div className="cards-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            handleCardClick={handleCardClick}
            card={card}
            isFlipped={card === firstCard || card === secondCard || card.isMatched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
