import React from "react";
import Card from "./Card";

interface CardData {
  id: number;
  name: string;
  type: string;
  desc: string;
  atk?: number;
  def?: number;
  level?: number;
  race?: string;
  attribute?: string;
  card_images: {
    image_url: string;
  }[];
  userId: string;
}

interface CardListProps {
  cards: CardData[];
  loading: boolean;
  hasMore: boolean;
}

const CardList: React.FC<CardListProps> = ({ cards, loading, hasMore }) => {
  return (
    <div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} userId={card.userId}/>
        ))}
      </div>
      {loading && <div className="text-center mt-4">Loading...</div>}
      {!hasMore && (
        <div className="text-center mt-4">No more cards to load.</div>
      )}
    </div>
  );
};

export default CardList;
