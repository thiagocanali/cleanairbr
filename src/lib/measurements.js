// Comparações de medições: não equivalem a economia de energia elétrica.
export function compareMeasurements(before, after, unit = '') {
  const a = Number(before), b = Number(after);
  if (before === '' || after === '' || before == null || after == null || !Number.isFinite(a) || !Number.isFinite(b)) return null;
  const difference = b - a;
  return {
    before: a, after: b, difference, unit,
    percent: a === 0 ? null : (difference / Math.abs(a)) * 100,
  };
}
export function formatDifference(value, digits = 1) {
  if (!Number.isFinite(value)) return '—';
  return (value > 0 ? '+' : '') + value.toLocaleString('pt-BR',{minimumFractionDigits:digits,maximumFractionDigits:digits});
}
