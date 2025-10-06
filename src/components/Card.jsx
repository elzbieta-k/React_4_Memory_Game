import { useState, useEffect } from "react";

export default function Card({ data: { card, handleFlipp } }) {
  const { id, name, isFlipped, isMatched, backside, frontside } = card;

  return (
    <button
      className="card"
      id={id}
      name={name}
      onClick={() => handleFlipp(card)}
    >
      <img src={isFlipped ? frontside : backside} alt="" />
    </button>
  );
}
