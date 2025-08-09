import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Ir para a página inicial">
          <span className="logo" aria-hidden />
          <span>Pacotes de Viagens</span>
        </Link>
        <nav className="nav" aria-label="principal">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/pacotes">Pacotes</NavLink>
          <NavLink to="/passagens">Passagens</NavLink>
          <NavLink to="/hoteis">Hotéis</NavLink>
          <NavLink to="/cruzeiros">Cruzeiros</NavLink>
          <NavLink to="/clube">Clube</NavLink>
          <NavLink to="/destinos">Destinos</NavLink>
          <NavLink to="/login">Entrar</NavLink>
          <Link to="/cadastro" className="cta">Criar conta</Link>
        </nav>
      </div>
    </header>
  );
}
