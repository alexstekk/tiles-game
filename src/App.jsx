import { useCallback, useEffect } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { useDispatch, useSelector } from "react-redux";
import { disableCards, increaseScore, increaseTurns, markMatchedCards, resetCards, resetGame, setCards, setFirstCard, setSecondCard } from "./store";
import { Line } from "rc-progress";

const cardList = [
  {
    src: "./img/01.svg",
  },
  {
    src: "./img/02.svg",
  },
  {
    src: "./img/03.svg",
  },
  {
    src: "./img/04.svg",
  },
  {
    src: "./img/05.svg",
  },
  {
    src: "./img/06.svg",
  },
  {
    src: "./img/07.svg",
  },
  {
    src: "./img/08.svg",
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

  const randomizeCards = useCallback(() => {
    const randomizedCards = [...cardList, ...cardList].sort(() => Math.random() - 0.5).map((c, i) => ({ ...c, id: i, isMatched: false }));
    dispatch(setCards(randomizedCards));
    dispatch(resetCards());
  }, [dispatch]);

  const handleCardClick = (card) => {
    firstCard ? dispatch(setSecondCard(card)) : dispatch(setFirstCard(card));
  };

  const handleTurn = useCallback(() => {
    dispatch(resetCards());
    dispatch(increaseTurns());
    dispatch(disableCards(false));
  }, [dispatch]);

  useEffect(() => {
    if (score === 8) {
      alert("You won!");
      dispatch(resetGame());
      return;
    }
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
  }, [firstCard, secondCard, score, dispatch, handleTurn]);

  useEffect(() => {
    randomizeCards();
  }, [randomizeCards]);

  return (
    <div className="app">
      <h1>Tile game</h1>
      <p className="autor">coded by <a href="https://t.me/AlexStekk">alexstekk</a></p>
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
      {cards.length ? (
        <div>
          <Line
            percent={(100 * score) / 8}
            strokeWidth={2}
            trailWidth={2}
            strokeColor="#2f832f"
          />
          <p>
            Turns: {turns} | Score: {score} of 8
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
