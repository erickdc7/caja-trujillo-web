import { useState, useMemo } from 'react';

interface Props {
  initialAmount?: number;
  maxAmount?: number;
  minAmount?: number;
  maxMonths?: number;
  tea?: number;
  productName?: string;
  ctaHref?: string;
}

export default function CreditSimulator({
  initialAmount = 5000,
  maxAmount = 50000,
  minAmount = 500,
  maxMonths = 36,
  tea = 28.5,
  productName = 'Crédito personal',
  ctaHref = '/simuladores',
}: Props) {
  const [amount, setAmount] = useState(initialAmount);
  const [months, setMonths] = useState(12);

  /* ── Cálculos financieros ── */
  const result = useMemo(() => {
    const tem = Math.pow(1 + tea / 100, 1 / 12) - 1;
    const cuota = Math.round(
      (amount * tem * Math.pow(1 + tem, months)) /
        (Math.pow(1 + tem, months) - 1),
    );
    const totalPagar = cuota * months;
    const totalInteres = totalPagar - amount;
    return { tem, cuota, totalPagar, totalInteres };
  }, [amount, months, tea]);

  /* ── Plazos disponibles ── */
  const plazos: number[] = [];
  for (let m = 6; m <= maxMonths; m += 6) {
    plazos.push(m);
  }
  if (!plazos.includes(maxMonths)) plazos.push(maxMonths);

  /* ── Formateo de moneda ── */
  const fmt = (n: number) =>
    'S/ ' + n.toLocaleString('es-PE', { minimumFractionDigits: 0 });

  return (
    <div style={styles.card}>
      {/* Header */}
      <span style={styles.header}>Simulador de crédito</span>

      {/* Label + Monto */}
      <label style={styles.label} htmlFor="sim-amount">
        ¿Cuánto necesitas?
      </label>
      <div style={styles.amount}>{fmt(amount)}</div>

      {/* Range slider */}
      <input
        id="sim-amount"
        type="range"
        min={minAmount}
        max={maxAmount}
        step={100}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        style={styles.range}
        aria-label={`Monto del crédito: ${fmt(amount)}`}
      />
      <div style={styles.rangeLimits}>
        <span>{fmt(minAmount)}</span>
        <span>{fmt(maxAmount)}</span>
      </div>

      {/* Plazo */}
      <label style={styles.label} htmlFor="sim-months">
        Plazo en meses
      </label>
      <select
        id="sim-months"
        value={months}
        onChange={(e) => setMonths(Number(e.target.value))}
        style={styles.select}
        aria-label={`Plazo: ${months} meses`}
      >
        {plazos.map((m) => (
          <option key={m} value={m}>
            {m} meses
          </option>
        ))}
      </select>

      {/* Resultados */}
      <div style={styles.results}>
        <div style={styles.row}>
          <span style={styles.rowLabel}>Cuota mensual aprox.</span>
          <span style={styles.rowValueGreen}>{fmt(result.cuota)}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.rowLabel}>TEA referencial</span>
          <span style={styles.rowValue}>{tea}%</span>
        </div>
        <div style={{ ...styles.row, borderBottom: 'none' }}>
          <span style={styles.rowLabel}>Sin garantías hasta S/ 10,000</span>
          <span style={styles.rowValue}>
            {/* Check icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </div>
      </div>

      {/* CTA */}
      <a href={ctaHref} style={styles.cta}>
        Solicitar {productName}
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ marginLeft: 4 }}
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

/* ── Estilos inline (glass card sobre fondo oscuro) ── */
const styles: Record<string, React.CSSProperties> = {
  card: {
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 28,
    padding: 28,
    animation: 'float 6s ease-in-out infinite',
    width: '100%',
    maxWidth: 400,
  },
  header: {
    display: 'block',
    textTransform: 'uppercase' as const,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.09em',
    color: '#FFD040',
    marginBottom: 20,
  },
  label: {
    display: 'block',
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.50)',
    marginBottom: 4,
    fontWeight: 500,
  },
  amount: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 800,
    fontSize: 38,
    color: '#fff',
    letterSpacing: '-0.04em',
    lineHeight: 1.1,
    marginBottom: 12,
  },
  range: {
    width: '100%',
    height: 6,
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
    background: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
    outline: 'none',
    cursor: 'pointer',
    marginBottom: 6,
  },
  rangeLimits: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 10,
    color: 'rgba(255,255,255,0.35)',
    marginBottom: 18,
  },
  select: {
    width: '100%',
    background: 'rgba(255,255,255,0.10)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 6,
    color: '#fff',
    padding: '9px 12px',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    outline: 'none',
    marginBottom: 20,
    appearance: 'none' as const,
  },
  results: {
    marginBottom: 18,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '9px 0',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  rowLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.50)',
    fontWeight: 500,
  },
  rowValue: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 600,
  },
  rowValueGreen: {
    fontSize: 16,
    color: '#6EE7B7',
    fontWeight: 700,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  cta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    background: '#FF0901',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  },
};
