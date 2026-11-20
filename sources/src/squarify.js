// Treemap « squarified » (Bruls, Huizing, van Wijk, 2000).
// items : [{ v, ... }] triés par valeur décroissante ; renvoie les rectangles {x, y, w, h, ...}.
export function squarify(items, x, y, w, h) {
  const out = [];
  const total = items.reduce((s, i) => s + i.v, 0);
  if (!total || w <= 0 || h <= 0) return out;
  const echelle = (w * h) / total;
  let reste = items.map((i) => ({ ...i, a: i.v * echelle }));
  const pire = (rangee, cote) => {
    const s = rangee.reduce((a, r) => a + r.a, 0);
    const max = Math.max(...rangee.map((r) => r.a));
    const min = Math.min(...rangee.map((r) => r.a));
    return Math.max((cote * cote * max) / (s * s), (s * s) / (cote * cote * min));
  };
  while (reste.length) {
    const cote = Math.min(w, h);
    let rangee = [reste[0]];
    let i = 1;
    while (i < reste.length && pire([...rangee, reste[i]], cote) <= pire(rangee, cote)) {
      rangee.push(reste[i]);
      i++;
    }
    reste = reste.slice(i);
    const s = rangee.reduce((a, r) => a + r.a, 0);
    if (w >= h) {
      const lw = s / h;
      let yy = y;
      for (const r of rangee) { const lh = r.a / lw; out.push({ ...r, x, y: yy, w: lw, h: lh }); yy += lh; }
      x += lw; w -= lw;
    } else {
      const lh = s / w;
      let xx = x;
      for (const r of rangee) { const lw = r.a / lh; out.push({ ...r, x: xx, y, w: lw, h: lh }); xx += lw; }
      y += lh; h -= lh;
    }
  }
  return out;
}
