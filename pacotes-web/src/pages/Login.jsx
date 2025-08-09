import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo de 6 caracteres'),
});

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    navigate('/');
  };

  return (
    <section>
      <Helmet><title>Entrar • Pacotes</title></Helmet>
      <h2 className="section-title">Entrar</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>
          Email
          <input type="email" placeholder="seu@email.com" {...register('email')} />
          {errors.email && <span className="muted" role="alert">{errors.email.message}</span>}
        </label>
        <label>
          Senha
          <input type="password" placeholder="••••••••" {...register('password')} />
          {errors.password && <span className="muted" role="alert">{errors.password.message}</span>}
        </label>
        <div className="actions">
          <button type="submit" className="cta" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
          <Link to="/cadastro" className="btn">Criar conta</Link>
        </div>
      </form>
    </section>
  );
}