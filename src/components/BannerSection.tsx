interface BannerSectionProps {
  title: string;
  subtitle: string;
  cta: {
    label: string;
    link: string;
    action: (() => void) | undefined;
  };
  imageUrl: string;
}

const BannerSection = ({
  title,
  subtitle,
  cta,
  imageUrl,
}: BannerSectionProps) => {
  return (
    <section className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-base sm:text-lg mb-6">{subtitle}</p>
        <a
          onClick={cta.action}
          href={cta.link}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {cta.label}
        </a>
        <div className="mt-8 w-full">
          <img
            src={imageUrl}
            alt="Banner"
            width={1600}
            height={700}
            className="mx-auto max-w-full h-auto rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
