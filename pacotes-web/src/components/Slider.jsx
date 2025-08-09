import { useEffect, useState } from 'react';

const images = [
  'https://img.freepik.com/free-photo/view-red-cottages-by-coastline-hamnoy-lofoten-islands-norway_181624-33160.jpg?w=1380',
  'https://img.freepik.com/free-photo/roofs-toledo-early-morning_1398-2074.jpg?w=1380',
  'https://img.freepik.com/free-photo/aerial-shot-ocean-surrounded-by-beautiful-cliffs-covered-greens_181624-29757.jpg?w=740',
];

export default function Slider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="slider" role="region" aria-label="Destaques">
      <img src={images[idx]} alt={`Destaque ${idx + 1}`} />
      <div className="dots" role="tablist" aria-label="Navegação de slides">
        {images.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === idx}
            onClick={() => setIdx(i)}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
