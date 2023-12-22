import { useEffect, useState } from "react";
import { CardWithEmojiType } from "../..";

type Props = {
  card: CardWithEmojiType;
  onRevealCard: (index: number) => void;
};

export const CardWithEmoji = ({ card, onRevealCard }: Props) => {
  const { emoji, number, revealed, isCorrectlyRevealed } = card;
  if (isCorrectlyRevealed) {
    return <div className="card">{emoji}</div>;
  }

  return (
    <div
      className="card"
      onClick={() => {
        if (!revealed) {
          onRevealCard(number);
        }
      }}>
      {revealed ? <>{emoji}</> : <>{number}</>}
    </div>
  );
};
