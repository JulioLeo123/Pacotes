import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { packages } from '../data/packages.js';
import { currencyBRL, maskCardNumber, maskCVC, maskExp } from '../lib/format.js';
import { useAuth } from '../context/AuthContext';

const schema = z.object({
  cardName: z.string().min(3, 'Nome obrigatório'),
  cardNumber: z.string().min(19, 'Número inválido'),
  exp: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'MM/AA'),
  cvc: z.string().min(3, 'CVC inválido'),
});

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [params] = useSearchParams();
  const id = params.get('id');

  const selected = useMemo(() => packages.find((p) => p.id === id), [id]);
  const [cardNumber, setCardNumber] = useState('');
  const [exp, setExp] = useState('');
  const [cvc, setCvc] = useState('');

  useEffect(() => {
    if (!currentUser) {
      const from = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?from=${from}`, { replace: true });
    }
  }, [currentUser, location.pathname, location.search, navigate]);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { cardName: '', cardNumber: '', exp: '', cvc: '' },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 900));
    navigate('/finalizacao', { state: { selected } });
  };

  return (
    <section>
      <Helmet><title>Pagamento • Pacotes</title></Helmet>
      <h2 className="section-title">Pagamento</h2>
      {selected && (
        <p className="muted" style={{ marginBottom: '1rem' }}>
          Você está comprando: <strong>{selected.title}</strong> — {currencyBRL(selected.price)}
        </p>
      )}

      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>
          Nome no cartão
          <input type="text" {...register('cardName')} />
          {errors.cardName && <span className="muted" role="alert">{errors.cardName.message}</span>}
        </label>

        <label>
          Número do cartão
          <input
            type="text"
            inputMode="numeric"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={(e) => {
              const v = maskCardNumber(e.target.value);
              setCardNumber(v);
              setValue('cardNumber', v, { shouldValidate: true });
            }}
          />
          {errors.cardNumber && <span className="muted" role="alert">{errors.cardNumber.message}</span>}
        </label>

        <div className="actions" style={{ padding: 0 }}>
          <label style={{ flex: 1 }}>
            Validade (MM/AA)
            <input
              type="text"
              placeholder="12/30"
              value={exp}
              onChange={(e) => {
                const v = maskExp(e.target.value);
                setExp(v);
                setValue('exp', v, { shouldValidate: true });
              }}
            />
            {errors.exp && <span className="muted" role="alert">{errors.exp.message}</span>}
          </label>

          <label style={{ flex: 1 }}>
            CVC
            <input
              type="text"
              inputMode="numeric"
              placeholder="123"
              value={cvc}
              onChange={(e) => {
                const v = maskCVC(e.target.value);
                setCvc(v);
                setValue('cvc', v, { shouldValidate: true });
              }}
            />
            {errors.cvc && <span className="muted" role="alert">{errors.cvc.message}</span>}
          </label>
        </div>

        <div className="actions">
          <button type="button" className="btn" onClick={() => navigate(-1)}>Cancelar</button>
          <button type="submit" className="cta" disabled={isSubmitting}>
            {isSubmitting ? 'Processando...' : 'Pagar'}
          </button>
        </div>
      </form>
    </section>
  );
}