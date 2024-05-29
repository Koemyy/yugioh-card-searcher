import { useState, useEffect } from 'react';
import Card from './components/Card';
import Navbar from './components/NavBar';
import BannerSection from './components/BannerSection';

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

    fetchCardsData();
  }, [page]);

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
    <div>
      <Navbar />
      <BannerSection
        title="Welcome to Yu-Gi-Oh! Cards"
        subtitle="Explore our collection of Yu-Gi-Oh! cards and find your favorites."
        cta={{ label: "Get Started", link: "#" }}
        imageUrl="https://i.ibb.co/wr9CV2B/img.jpg"
      />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
        {loading && <div className="text-center mt-4">Loading...</div>}
        {!hasMore && (
          <div className="text-center mt-4">No more cards to load.</div>
        )}
      </div>
    </div>
  );
};

export default Home;

