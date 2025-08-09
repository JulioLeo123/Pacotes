import { Helmet } from 'react-helmet-async';
import PackageCard from '../components/PackageCard.jsx';
import { packagesVisible } from '../data/selectors.js';

export default function Pacotes() {
  return (
    <section>
      <Helmet><title>Pacotes • Pacotes de Viagens</title></Helmet>
      <h2 className="section-title">Todos os pacotes</h2>
      <div className="grid">
        {packagesVisible.map((p) => (
          <PackageCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
