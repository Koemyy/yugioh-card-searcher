import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Card from "./Card";

interface FavoritesProps {
  userId: string;
}

const Favorites: React.FC<FavoritesProps> = ({ userId }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [favoriteCards, setFavoriteCards] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const q = query(collection(db, "favorites", userId, "cards"));
      const querySnapshot = await getDocs(q);
      const favorites = querySnapshot.docs.map((doc) => doc.data());
      setFavoriteCards(favorites);
    };

    fetchFavorites();
  }, [userId]);

  const handleFavoriteToggle = (cardId: number, isFavorite: boolean) => {
    if (!isFavorite) {
      setFavoriteCards((prevFavorites) =>
        prevFavorites.filter((card) => card.id !== cardId)
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white mb-4">Your Favorite Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteCards.map((card, index) => (
          <Card
            key={`${card.id}-${index}`}
            card={card}
            userId={userId}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
