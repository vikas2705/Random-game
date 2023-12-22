import { useEffect, useState } from "react";
import { getEmojisInRandomOrder } from "../../common/utils/geteEmojis";
import { CardsRenderer } from "./components/CardsRenderer";

export type CardWithEmojiType = {
  emoji: string;
  number: number;
  revealed?: boolean;
  isCorrectlyRevealed?: boolean;
};

/**
 *
 * 1. if one is opened, let it be opened
 * 2. if another is opened,
 *  --- check if both are same.
 *  --- if yes, mark both as correctly Revealed.
 *  --- let them be opened
 *  -- reset current opened
 *
 * 3. if both are different,
 *   -- close both of them
 *   -- reset current opened
 *
 * 4. if at any time, all are correctly revealed, show "you won the game".
 *
 *
 */

export const RandomCardGame = () => {
  const [cardsList, setCardsList] = useState<CardWithEmojiType[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [currentlyOpened, setCurrentlyOpened] = useState<number[]>([]);

  useEffect(() => {
    resetNewGame();
  }, []);

  useEffect(() => {
    let isOver = true;

    if (cardsList.length === 0) {
      return;
    }

    for (let index = 0; index < cardsList.length; index++) {
      if (!cardsList[index].isCorrectlyRevealed) {
        isOver = false;
        break;
      }
    }

    if (isOver) {
      setGameOver(true);
    }
  }, [cardsList]);

  useEffect(() => {
    if (currentlyOpened.length === 2) {
      const index1 = currentlyOpened[0];
      const index2 = currentlyOpened[1];

      const isSameCard = cardsList[index1].emoji === cardsList[index2].emoji;
      if (isSameCard) {
        /**
         *  --- check if both are same.
         *  --- if yes, mark both as correctly Revealed.
         *  --- let them be opened
         *  -- reset current opened
         */
        alert("Correct, Good guess!");
        setCardsList((prev) => {
          const cloneList = [...prev];
          const card1 = {
            ...cloneList[index1],
            revealed: true,
            isCorrectlyRevealed: true,
          };
          cloneList[index1] = card1;

          const card2 = {
            ...cloneList[index2],
            revealed: true,
            isCorrectlyRevealed: true,
          };
          cloneList[index2] = card2;
          return cloneList;
        });
        setCurrentlyOpened([]);
      } else {
        /***
         * if both are different,
         *   -- close both of them
         *   -- reset current opened
         */
        alert("Incorrect, Both cards are different!");
        setCardsList((prev) => {
          const cloneList = [...prev];
          const card1 = {
            ...cloneList[index1],
            revealed: false,
          };
          cloneList[index1] = card1;

          const card2 = {
            ...cloneList[index2],
            revealed: false,
          };
          cloneList[index2] = card2;
          return cloneList;
        });
        setCurrentlyOpened([]);
      }
    }
  }, [currentlyOpened]);

  const resetNewGame = () => {
    setGameOver(false);
    const cardList = getEmojisInRandomOrder();
    const cardsWithEmojis = cardList.map((card, index) => {
      return { emoji: card, number: index + 1, revealed: false };
    });
    setCardsList(cardsWithEmojis);
  };

  const handleRevealCard = (index: number) => {
    // reveal the current card
    setCardsList((prev) => {
      const cloneList = [...prev];
      const card = { ...cloneList[index - 1], revealed: true };
      cloneList[index - 1] = card;
      return cloneList;
    });

    // push the card to currentlyOpened
    setCurrentlyOpened((prev) => {
      const clone = [...prev];
      clone.push(index - 1);
      return clone;
    });

    /*setTimeout(() => {
      setCardsList((prev) => {
        const cloneList = [...prev];
        const card = { ...cloneList[index - 1], revealed: false };
        cloneList[index - 1] = card;
        return cloneList;
      });
    }, 5000);*/
  };

  console.log({ cardsList });
  console.log({ currentlyOpened });

  if (gameOver) {
    return (
      <div className="card-game-wrapper">
        <h1>Welcome to Random Card Game</h1>

        <h2>Congratulations, You Won!</h2>
        <button onClick={resetNewGame}>Start new Game</button>
      </div>
    );
  }

  return (
    <div className="card-game-wrapper">
      <h1>Welcome to Random Card Game</h1>

      <CardsRenderer
        cardsWithEmojis={cardsList}
        onRevealCard={handleRevealCard}
      />
    </div>
  );
};

/**
 * 16 cards
 *
 * very card -- 1 emoji
 *
 *
 * 8 emojis
 *
 * :) :( :D :/ :* :'( :p :]
 * :) :( :D :/ :* :'( :p :]
 *
 *
 */
