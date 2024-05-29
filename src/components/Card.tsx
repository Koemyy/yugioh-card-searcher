import React from "react";

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
}

const Card: React.FC<CardProps> = ({ card }) => {
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
    "Token": "bg-gray-400",
    "XYZ Monster": "bg-black",
  };

  const cardColor = cardTypeColors[card.type] || "bg-gray-500";

  return (
    <div
      className={`max-w-sm rounded overflow-hidden shadow-lg ${cardColor} p-4`}
    >
      <img
        src={card.card_images[0].image_url}
        alt={card.name}
        width={400}
        height={580}
        className="rounded"
      />
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
