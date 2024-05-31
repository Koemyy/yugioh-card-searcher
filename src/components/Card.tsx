import React, { useState, useEffect } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.ts"
import { FaStar } from "react-icons/fa";

interface CardProps {
  card: {
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
  };
  userId:string,
}

function getUserId(): string {
  const cookieString = document.cookie;
  console.log("Cookie String:", cookieString); // Logging cookie string for debugging
  const userId = cookieString
    .split("; ")
    .find((row) => row.startsWith("user_id="))
    ?.split("=")[1];
  console.log("Extracted User ID:", userId); // Logging extracted user ID
  return userId ? userId.split(";")[0] : "";
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const userId = getUserId();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (userId) {
        const docRef = doc(
          db,
          "favorites",
          userId,
          "cards",
          card.id.toString()
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsFavorite(true);
        }
      } else {
        console.error("User ID is not available");
      }
    };

    checkFavoriteStatus();
  }, [userId, card.id]);

  const handleFavoriteClick = async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const docRef = doc(db, "favorites", userId, "cards", card.id.toString());

    try {
      if (isFavorite) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { ...card });
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const cardTypeColors: Record<string, string> = {
    "Effect Monster": "bg-orange-500",
    "Normal Monster": "bg-yellow-500",
    "Pendulum Monster": "bg-green-500",
    "Spell Card": "bg-green-500",
    "Ritual Monster": "bg-blue-200",
    "Link Monster": "bg-blue-700",
    "Fusion Monster": "bg-purple-500",
    "Trap Card": "bg-pink-500",
    "Synchro Monster": "bg-gray-200",
    Token: "bg-gray-400",
    "XYZ Monster": "bg-black",
  };

  const cardColor = cardTypeColors[card.type] || "bg-gray-500";

  return (
    <div
      className={`relative max-w-sm rounded overflow-hidden shadow-lg ${cardColor} p-4`}
    >
      <img
        src={card.card_images[0].image_url}
        alt={card.name}
        width={400}
        height={580}
        className="rounded"
      />
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={handleFavoriteClick}
      >
        <FaStar color={isFavorite ? "yellow" : "gray"} size={24} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{card.name}</div>
        <p className="text-white text-base">{card.desc}</p>
        {card.atk !== undefined && (
          <p className="text-white text-base">ATK: {card.atk}</p>
        )}
        {card.def !== undefined && (
          <p className=" text-white text-base">DEF: {card.def}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
