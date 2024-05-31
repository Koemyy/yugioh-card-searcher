import { useContent } from "@croct/plug-react";
import { animateScroll } from "react-scroll";

interface BannerSectionProps {
  title: string;
  subtitle: string;
  cta: {
    label: string;
    action: (() => void) | string | undefined;
  };
  imageUrl: string;
}

export default function BannerSection() {
  const content = useContent<BannerSectionProps>("banner-section", {
    fallback: fallbackContent,
  });

  const scrollToCardList = () => {
    const cardListSection = document.getElementById("card-list");
    if (cardListSection) {
      const offsetTop = cardListSection.offsetTop;
      animateScroll.scrollTo(offsetTop, {
        duration: 800,
        smooth: "easeInOutQuart",
      });
    }
  };

  const handleClick = () => {
    if (content.cta.action === "action") {
      scrollToCardList();
    }
  };

  return (
    <section className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{content.title}</h2>
        <p className="text-base sm:text-lg mb-6">{content.subtitle}</p>
        <a
          onClick={handleClick}
          href={content.cta.action === "action" ? "#" : content.cta.action}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {content.cta.label}
        </a>
        <div className="mt-8 w-full">
          <img
            src={content.image}
            alt="Banner"
            width={1600}
            height={700}
            className="mx-auto max-w-full h-auto rounded"
          />
        </div>
      </div>
    </section>
  );
}

const fallbackContent = {
  title: "Welcome to Yu-Gi-Oh! Cards",
  subtitle:
    "Explore our collection of Yu-Gi-Oh! cards and find your favorites.",
  cta: {
    label: "Get Started",
    action: "#",
  },
  image:
    "https://cdn.croct.io/workspace/customer-assets/358c56ab-5e63-4a67-9e93-c394c60edec5/dc4bba68-76fc-4d9d-838c-df4639cb1084",
};
