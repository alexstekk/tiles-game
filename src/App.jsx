import { useEffect } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { useDispatch, useSelector } from "react-redux";
import { disableCards, increaseScore, increaseTurns, markMatchedCards, resetTurns, setCards, setFirstCard, setSecondCard } from "./store";

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
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cardList);
  const firstCard = useSelector((state) => state.firstCard);
  const secondCard = useSelector((state) => state.secondCard);
  const score = useSelector((state) => state.score);
  const disabled = useSelector((state) => state.disabledCards);
  const turns = useSelector((state) => state.turns);

  const randomizeCards = () => {
    const randomizedCards = [...cardList, ...cardList].sort(() => Math.random() - 0.5).map((c, i) => ({ ...c, id: i, isMatched: false }));
    dispatch(setCards(randomizedCards));
    dispatch(setFirstCard(null));
    dispatch(setSecondCard(null));
    dispatch(resetTurns());
  };

  const handleCardClick = (card) => {
    firstCard ? dispatch(setSecondCard(card)) : dispatch(setFirstCard(card));
  };

  const handleTurn = () => {
    dispatch(setFirstCard(null));
    dispatch(setSecondCard(null));
    dispatch(increaseTurns());
    dispatch(disableCards(false));
  };

  useEffect(() => {
    if (score === 8) return alert("You won!");
    if (firstCard && secondCard) {
      dispatch(disableCards(true));
      if (firstCard.src === secondCard.src) {
        dispatch(markMatchedCards(firstCard.src));
        dispatch(increaseScore());
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
