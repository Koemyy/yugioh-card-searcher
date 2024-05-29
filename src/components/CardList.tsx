import React, { useEffect, useState } from "react";
import Card from "./Card";
import { fetchCards } from "../utils/fetchCards";

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
}

const CardList = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadCards = async () => {
      setLoading(true);
      const data = await fetchCards();
      setCards(data);
      setLoading(false);
    };

    loadCards();
  }, []);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setLoading(true);
    if (term) {
      const res = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${term}`
      );
      const data = await res.json();
      setCards(data.data);
    } else {
      const data = await fetchCards();
      setCards(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for cards..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-400 rounded"
        />
      </div>
      <div id="card-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
