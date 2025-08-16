import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const schema = z.object({
  name: z.string().min(3, 'Informe seu nome'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
});

export default function Cadastro() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register: registerUser } = useAuth();
  const from = new URLSearchParams(location.search).get('from') || '/';
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate(from, { replace: true });
    } catch (e) {
      alert(e.message || 'Falha ao cadastrar');
    }
  };

  return (
    <section>
      <Helmet><title>Criar conta • Pacotes</title></Helmet>
      <h2 className="section-title">Criar conta</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>
          Nome completo
          <input type="text" placeholder="Seu nome" {...register('name')} />
          {errors.name && <span className="muted" role="alert">{errors.name.message}</span>}
        </label>
        <label>
          Email
          <input type="email" placeholder="seu@email.com" {...register('email')} />
          {errors.email && <span className="muted" role="alert">{errors.email.message}</span>}
        </label>
        <label>
          Senha
          <input type="password" placeholder="mín. 6 caracteres" {...register('password')} />
          {errors.password && <span className="muted" role="alert">{errors.password.message}</span>}
        </label>
        <div className="actions">
          <button type="submit" className="cta" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </section>
  );
}