import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig.ts";
import Card from "./Card.js";

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-white mb-4">Your Favorite Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteCards.map((card) => (
          <Card key={card.id} card={card} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
