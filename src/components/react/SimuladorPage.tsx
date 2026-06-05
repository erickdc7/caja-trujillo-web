import { useState, useMemo } from 'react';

export default function SimuladorPage() {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Crédito personal' },
    { id: 'negocio', label: 'Crédito negocio' },
    { id: 'plazo', label: 'Plazo fijo' },
  ];

  function handleTabKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    let newIndex = currentIndex;
    if (e.key === 'ArrowRight') newIndex = (currentIndex + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') newIndex = 0;
    else if (e.key === 'End') newIndex = tabs.length - 1;
    else return;
    e.preventDefault();
    setActiveTab(tabs[newIndex].id);
    const btn = document.getElementById(`sim-tab-${tabs[newIndex].id}`);
    if (btn) btn.focus();
  }

  return (
    <div>
      {/* Tabs */}
      <div style={s.tabList} role="tablist" aria-label="Tipo de simulación">
        {tabs.map((t) => (
          <button key={t.id} role="tab" id={`sim-tab-${t.id}`}
            aria-selected={activeTab === t.id}
            aria-controls={`sim-panel-${t.id}`}
            tabIndex={activeTab === t.id ? 0 : -1}
            onClick={() => setActiveTab(t.id)}
            onKeyDown={handleTabKeyDown}
            style={{ ...s.tab, ...(activeTab === t.id ? s.tabActive : s.tabInactive) }}
            onMouseEnter={(e) => { if (activeTab !== t.id) { e.currentTarget.style.backgroundColor = '#FFF5F5'; e.currentTarget.style.color = '#FF0901'; } }}
            onMouseLeave={(e) => { if (activeTab !== t.id) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#7A7A88'; } }}>
            {t.label}
          </button>
        ))}
      </div>

      <div id="sim-panel-personal" role="tabpanel" aria-labelledby="sim-tab-personal" hidden={activeTab !== 'personal'}>
        {activeTab === 'personal' && <CreditSimForm tea={28.5} maxAmount={50000} minAmount={500} maxMonths={48} label="personal" />}
      </div>
      <div id="sim-panel-negocio" role="tabpanel" aria-labelledby="sim-tab-negocio" hidden={activeTab !== 'negocio'}>
        {activeTab === 'negocio' && <CreditSimForm tea={32} maxAmount={100000} minAmount={1000} maxMonths={48} label="negocio" />}
      </div>
      <div id="sim-panel-plazo" role="tabpanel" aria-labelledby="sim-tab-plazo" hidden={activeTab !== 'plazo'}>
        {activeTab === 'plazo' && <PlazoFijoSim />}
      </div>
    </div>
  );
}

/* ── Simulador de crédito ── */
function CreditSimForm({ tea, maxAmount, minAmount, maxMonths, label }: { tea: number; maxAmount: number; minAmount: number; maxMonths: number; label: string }) {
  const [amount, setAmount] = useState(Math.round(maxAmount / 4));
  const [months, setMonths] = useState(12);
  const [showTable, setShowTable] = useState(false);

  const fmt = (n: number) => 'S/ ' + n.toLocaleString('es-PE', { minimumFractionDigits: 0 });

  const calc = useMemo(() => {
    const tem = Math.pow(1 + tea / 100, 1 / 12) - 1;
    const cuota = Math.round((amount * tem * Math.pow(1 + tem, months)) / (Math.pow(1 + tem, months) - 1));
    const totalPagar = cuota * months;
    const totalInteres = totalPagar - amount;
    // Amortization
    const rows: { n: number; capital: number; interes: number; cuota: number; saldo: number }[] = [];
    let saldo = amount;
    for (let i = 1; i <= months; i++) {
      const int = Math.round(saldo * tem);
      const cap = cuota - int;
      saldo = Math.max(0, saldo - cap);
      rows.push({ n: i, capital: cap, interes: int, cuota, saldo });
    }
    return { tem, cuota, totalPagar, totalInteres, rows };
  }, [amount, months, tea]);

  const plazos = [6, 12, 18, 24, 36, 48].filter((m) => m <= maxMonths);

  return (
    <div className="sim-grid">
      {/* Form */}
      <div style={s.formCard}>
        <label style={s.formLabel}>Monto del crédito</label>
        <div style={s.amountBig}>{fmt(amount)}</div>
        <input type="range" min={minAmount} max={maxAmount} step={100} value={amount} onChange={(e) => setAmount(+e.target.value)} style={s.slider} aria-label={`Monto: ${fmt(amount)}`} />
        <div style={s.rangeLimits}><span>{fmt(minAmount)}</span><span>{fmt(maxAmount)}</span></div>

        <label style={s.formLabel}>Plazo en meses</label>
        <select value={months} onChange={(e) => setMonths(+e.target.value)} style={s.selectLight} aria-label="Plazo">
          {plazos.map((m) => <option key={m} value={m}>{m} meses</option>)}
        </select>

        <label style={s.formLabel}>Tipo de crédito</label>
        <select style={s.selectLight} aria-label="Tipo de crédito">
          <option>Personal</option>
          <option>Con garantía</option>
          <option>Negocio</option>
        </select>
      </div>

      {/* Result */}
      <div style={s.resultCard} aria-live="polite" aria-atomic="true">
        <span style={s.resultLabel}>Cuota mensual estimada</span>
        <div style={s.resultBig}>{fmt(calc.cuota)}</div>
        <div style={s.metricsGrid}>
          <div><span style={s.metricLabel}>TEA</span><span style={s.metricVal}>{tea}%</span></div>
          <div><span style={s.metricLabel}>TEM</span><span style={s.metricVal}>{(calc.tem * 100).toFixed(2)}%</span></div>
          <div><span style={s.metricLabel}>Total a pagar</span><span style={s.metricVal}>{fmt(calc.totalPagar)}</span></div>
          <div><span style={s.metricLabel}>Interés total</span><span style={s.metricVal}>{fmt(calc.totalInteres)}</span></div>
        </div>
        <p style={s.disclaimer}>Simulación referencial. Las condiciones finales serán determinadas tras la evaluación crediticia.</p>
        <a href="/simuladores" style={s.ctaBtn}>
          Solicitar este crédito
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: 4 }}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>

        {/* Amortización */}
        <button onClick={() => setShowTable(!showTable)} style={s.toggleBtn} aria-expanded={showTable} aria-controls="amort-table">
          {showTable ? 'Ocultar' : 'Ver'} tabla de amortización
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', marginLeft: 4 }}><path d="m6 9 6 6 6-6"/></svg>
        </button>
        {showTable && (
          <div style={s.tableWrap} id="amort-table">
            <table style={s.table}>
              <thead><tr style={s.thRow}><th style={s.th}>N°</th><th style={s.th}>Capital</th><th style={s.th}>Interés</th><th style={s.th}>Cuota</th><th style={s.th}>Saldo</th></tr></thead>
              <tbody>
                {calc.rows.slice(0, 12).map((r) => (
                  <tr key={r.n} style={r.n % 2 === 0 ? s.trAlt : {}}><td style={s.td}>{r.n}</td><td style={s.td}>{fmt(r.capital)}</td><td style={s.td}>{fmt(r.interes)}</td><td style={s.td}>{fmt(r.cuota)}</td><td style={s.td}>{fmt(r.saldo)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Simulador Plazo Fijo ── */
function PlazoFijoSim() {
  const [monto, setMonto] = useState(10000);
  const [dias, setDias] = useState(360);
  const [moneda, setMoneda] = useState('PEN');

  const fmt = (n: number) => (moneda === 'PEN' ? 'S/ ' : 'US$ ') + n.toLocaleString('es-PE', { minimumFractionDigits: 2 });

  const calc = useMemo(() => {
    const teaMap: Record<string, Record<number, number>> = {
      PEN: { 30: 4.5, 60: 5.0, 90: 5.5, 180: 6.5, 360: 8.0 },
      USD: { 30: 1.5, 60: 2.0, 90: 2.5, 180: 3.0, 360: 4.0 },
    };
    const tea = teaMap[moneda]?.[dias] ?? 5.0;
    const interes = monto * (Math.pow(1 + tea / 100, dias / 360) - 1);
    const total = monto + interes;
    return { tea, interes: Math.round(interes * 100) / 100, total: Math.round(total * 100) / 100 };
  }, [monto, dias, moneda]);

  return (
    <div className="sim-grid">
      <div style={s.formCard}>
        <label style={s.formLabel}>Monto a depositar</label>
        <div style={s.amountBig}>{fmt(monto)}</div>
        <input type="range" min={1000} max={500000} step={1000} value={monto} onChange={(e) => setMonto(+e.target.value)} style={s.slider} aria-label={`Monto: ${fmt(monto)}`} />
        <div style={s.rangeLimits}><span>{fmt(1000)}</span><span>{fmt(500000)}</span></div>
        <label style={s.formLabel}>Plazo (días)</label>
        <select value={dias} onChange={(e) => setDias(+e.target.value)} style={s.selectLight} aria-label="Plazo en días">
          {[30, 60, 90, 180, 360].map((d) => <option key={d} value={d}>{d} días</option>)}
        </select>
        <label style={s.formLabel}>Moneda</label>
        <select value={moneda} onChange={(e) => setMoneda(e.target.value)} style={s.selectLight} aria-label="Moneda">
          <option value="PEN">Soles (PEN)</option>
          <option value="USD">Dólares (USD)</option>
        </select>
      </div>
      <div style={s.resultCard}>
        <span style={s.resultLabel}>Intereses generados</span>
        <div style={s.resultBig}>{fmt(calc.interes)}</div>
        <div style={s.metricsGrid}>
          <div><span style={s.metricLabel}>TEA aplicada</span><span style={s.metricVal}>{calc.tea}%</span></div>
          <div><span style={s.metricLabel}>Monto final</span><span style={s.metricVal}>{fmt(calc.total)}</span></div>
          <div><span style={s.metricLabel}>Plazo</span><span style={s.metricVal}>{dias} días</span></div>
          <div><span style={s.metricLabel}>Moneda</span><span style={s.metricVal}>{moneda}</span></div>
        </div>
        <p style={s.disclaimer}>Simulación referencial. Las tasas pueden variar. Consulta en agencia.</p>
        <a href="/para-ti/plazo-fijo" style={s.ctaBtn}>Abrir plazo fijo</a>
      </div>
    </div>
  );
}

/* ── Estilos ── */
const s: Record<string, React.CSSProperties> = {
  tabList: { display: 'inline-flex', flexWrap: 'wrap' as const, backgroundColor: '#fff', border: '1px solid #E0E0E8', padding: 5, borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.06)', gap: 2, marginBottom: 32 },
  tab: { padding: '9px 22px', fontSize: 13.5, fontWeight: 600, fontFamily: "'Inter', sans-serif", border: 'none', borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: 'nowrap' as const },
  tabActive: { backgroundColor: '#FF0901', color: '#fff', boxShadow: '0 2px 8px rgba(255,9,1,0.25)' },
  tabInactive: { backgroundColor: 'transparent', color: '#7A7A88' },
  simGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' },
  formCard: { padding: 32, border: '1px solid #E0E0E8', borderRadius: 20 },
  formLabel: { display: 'block', fontSize: 12, fontWeight: 600, color: '#5A5A66', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 6, marginTop: 18 },
  amountBig: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 32, color: '#1A1A1E', letterSpacing: '-0.04em', marginBottom: 12 },
  slider: { width: '100%', height: 6, appearance: 'none' as const, background: '#E0E0E8', borderRadius: 3, outline: 'none', cursor: 'pointer', marginBottom: 6 },
  rangeLimits: { display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9E9EAC', marginBottom: 4 },
  selectLight: { width: '100%', padding: '10px 14px', border: '1px solid #E0E0E8', borderRadius: 8, fontSize: 14, fontWeight: 500, color: '#1A1A1E', background: '#fff', cursor: 'pointer', outline: 'none' },
  resultCard: { backgroundColor: '#0F0F12', padding: 32, borderRadius: 20, color: '#fff' },
  resultLabel: { display: 'block', color: '#9E9EAC', textTransform: 'uppercase' as const, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', marginBottom: 8 },
  resultBig: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 48, color: '#fff', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 24 },
  metricsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 },
  metricLabel: { display: 'block', fontSize: 11, color: '#7A7A88', marginBottom: 2 },
  metricVal: { display: 'block', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff' },
  disclaimer: { fontSize: 11, color: '#5A5A66', fontStyle: 'italic', margin: '12px 0 16px', lineHeight: 1.5 },
  ctaBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', background: '#FF0901', color: '#fff', padding: 12, borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: 'none', border: 'none', cursor: 'pointer', marginBottom: 12 },
  toggleBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: 'rgba(255,255,255,0.55)', padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  tableWrap: { marginTop: 12, overflowX: 'auto' as const, borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: 12 },
  thRow: { backgroundColor: 'rgba(255,255,255,0.06)' },
  th: { padding: '8px 10px', textAlign: 'left' as const, color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
  td: { padding: '7px 10px', color: 'rgba(255,255,255,0.70)', borderTop: '1px solid rgba(255,255,255,0.05)' },
  trAlt: { backgroundColor: 'rgba(255,255,255,0.03)' },
};
