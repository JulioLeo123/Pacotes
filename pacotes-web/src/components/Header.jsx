import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
          {!currentUser ? (
            <>
              <NavLink to={`/login?from=${encodeURIComponent(location.pathname + location.search)}`}>Entrar</NavLink>
              <Link to={`/cadastro?from=${encodeURIComponent(location.pathname + location.search)}`} className="cta">Criar conta</Link>
            </>
          ) : (
            <div className="user">
              <NavLink to="/minha-conta">Minha conta</NavLink>
              <span className="muted">Olá, {currentUser.name.split(' ')[0]}</span>
              <button className="btn" onClick={() => { logout(); navigate('/'); }}>Sair</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
