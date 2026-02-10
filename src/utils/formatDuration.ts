
export function formatDuration(runtime?: number) {
  if (!runtime) return "";

  const h = Math.floor(runtime / 60);
  const m = runtime % 60;

  if (h === 0) return `${m}min`;
  return `${h}h : ${m}m`;
}
