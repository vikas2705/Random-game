import { CardWithEmojiType } from "../..";
import { CardWithEmoji } from "../CardWithEmoji";

type CardsListProps = {
  cardsWithEmojis: CardWithEmojiType[];
  onRevealCard: (index: number) => void;
};

export const CardsRenderer = ({
  cardsWithEmojis,
  onRevealCard,
}: CardsListProps) => {
  return (
    <div className="cards-container">
      {cardsWithEmojis.map((card) => {
        const { emoji, number } = card;
        return (
          <div key={`${emoji}-${number}`}>
            <CardWithEmoji card={card} onRevealCard={onRevealCard} />
          </div>
        );
      })}
    </div>
  );
};
