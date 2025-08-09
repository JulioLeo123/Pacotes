import { Helmet } from 'react-helmet-async';
import PackageCard from '../components/PackageCard.jsx';
import { getPackagesSortedByPriceAsc } from '../data/selectors.js';

export default function Destinos() {
  // Exemplo: ordenar por preço crescente
  const items = getPackagesSortedByPriceAsc();

  return (
    <section>
      <Helmet><title>Destinos • Pacotes de Viagens</title></Helmet>
      <h2 className="section-title">Destinos populares</h2>
      <div className="grid">
        {items.map((p) => (
          <PackageCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
