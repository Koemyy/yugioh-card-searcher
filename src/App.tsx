import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Navbar from "./components/NavBar";
import BannerSection from "./components/BannerSection";

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

const Home = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchCardsData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=${
          (page - 1) * 20
        }`
      );
      const data = await res.json();
      setCards((prevCards) => [...prevCards, ...data.data]);
      setLoading(false);
      if (data.data.length === 0) {
        setHasMore(false);
      }
    };

    if (!searchQuery) {
      fetchCardsData();
    }
  }, [page, searchQuery]);

  const handleSearch = async () => {
    setLoading(true);
    setHasMore(false); // Disable pagination during search
    if (searchTerm) {
      const res = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${searchTerm}`
      );
      const data = await res.json();
      setCards(data.data);
      setLoading(false);
    } else {
      setPage(1);
      setCards([]);
      setHasMore(true); // Re-enable pagination when clearing search
      setLoading(false);
    }
    setSearchQuery(searchTerm);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, hasMore]);

  return (
    <div style={{ fontFamily: "Didact Gothic" }}>
      <Navbar />
      <BannerSection
        title="Welcome to Yu-Gi-Oh! Cards"
        subtitle="Explore our collection of Yu-Gi-Oh! cards and find your favorites."
        cta={{ label: "Get Started", link: "#card-list" }}
        imageUrl="https://cdn.croct.io/workspace/customer-assets/358c56ab-5e63-4a67-9e93-c394c60edec5/dc4bba68-76fc-4d9d-838c-df4639cb1084"
      />
      <div className="container mx-auto p-4">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search for cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded mr-2"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Search
          </button>
        </div>
        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        )}
        {!hasMore && !loading && searchTerm === "" && (
          <div className="text-center mt-4">No more cards to load.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
