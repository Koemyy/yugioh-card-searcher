import React from "react";

interface BannerSectionProps {
  title: string;
  subtitle: string;
  cta: {
    label: string;
    link: string;
  };
  imageUrl: string;
}

const BannerSection: React.FC<BannerSectionProps> = ({
  title,
  subtitle,
  cta,
  imageUrl,
}) => {
  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-6">{subtitle}</p>
        <a
          href={cta.link}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {cta.label}
        </a>
        <img src={imageUrl} alt="Banner" className="mt-8 max-w-full h-auto" />
      </div>
    </section>
  );
};

export default BannerSection;
