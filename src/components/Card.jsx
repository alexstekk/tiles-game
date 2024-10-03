export const Card = ({ card, handleCardClick, isFlipped, disabled }) => {
  const handleClick = () => {
    !disabled && handleCardClick(card);
  };
  return (
    <div className={`card${isFlipped ? " flipped" : ""}`}>
      <img
        className="front"
        src={card.src}
        alt="card front side"
      />
      <img
        className="back"
        src="./img/back.jpg"
        alt="card back side"
        onClick={handleClick}
      />
    </div>
  );
};
