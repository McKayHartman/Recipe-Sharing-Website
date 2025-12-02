// this componoent creates a horizontal scrolling marquee of food images


export default function Marquee() {
	// images from src/assets/marquee_images
  const images = [
    "chchpcookie.jpg",
    "figcheesebread.jpg",
    "pho.jpg",
    "stew.jpg",
    "tomatopizza.jpg",
    "steak.jpg",
    "oysters.jpg",
    "wrap.jpg",
  ];

  return (
    <div className="overflow-hidden w-full">
      <div className="flex animate-marquee whitespace-nowrap">
        {images.concat(images).map((img, idx) => (
          <img
            key={idx}
            src={`../assets/marquee_images/${img}`}
            alt={img}
            className="inline-block h-auto max-h-60 w-auto m-0 p-0"
          />
        ))}
      </div>
    </div>
  );
}
