import { Helmet } from 'react-helmet-async';
import Slider from '../components/Slider.jsx';
import { Link } from 'react-router-dom';
import PackageCard from '../components/PackageCard.jsx';
import { packagesVisible } from '../data/selectors.js';

export default function Home() {
  return (
    <>
      <Helmet><title>Pacotes de Viagens • Home</title></Helmet>
      <section className="hero">
        <h2 className="section-title">Descubra o mundo com ofertas imperdíveis</h2>
        <Slider />
      </section>

      <section>
        <h3 className="section-title">Pacotes em destaque</h3>
        <div className="grid">
          {packagesVisible.slice(0, 4).map((p) => (
            <PackageCard key={p.id} {...p} />
          ))}
        </div>
        <p style={{ marginTop: '.8rem' }}>
          <Link to="/pacotes" className="btn">Ver todos os pacotes</Link>
        </p>
      </section>
    </>
  );
}