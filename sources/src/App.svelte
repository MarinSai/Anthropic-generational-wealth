<script>
  import { textes, valeurs } from './textes.js';
  import pays from './pays57.json';
  import { squarify } from './squarify.js';
  import { onMount } from 'svelte';

  const langue = import.meta.env.VITE_LANGUE || 'fr';
  const t = textes[langue];
  const fmt = (v) => v.toLocaleString(langue === 'fr' ? 'fr-FR' : langue, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  let largeur = 0; // largeur d'une colonne
  let colonne;
  // Mesure par ResizeObserver (et non bind:clientWidth, qui insère une iframe cachée
  // parfois bloquée selon le navigateur ou le contexte d'intégration).
  onMount(() => {
    const mesurer = () => { if (colonne) largeur = Math.round(colonne.getBoundingClientRect().width); };
    mesurer();
    let ro;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(mesurer); ro.observe(colonne); }
    addEventListener('resize', mesurer);
    if (document.fonts) document.fonts.ready.then(mesurer);
    return () => { ro && ro.disconnect(); removeEventListener('resize', mesurer); };
  });
  let ecran = 1040;

  $: empile = ecran <= 600;
  $: petit = largeur < 260;
  // pixels de hauteur par milliard de dollars (les deux blocs ont la même largeur)
  $: k = empile ? Math.min((largeur * 0.9) / valeurs.total, 420 / valeurs.total)
                : Math.min((largeur * 1.15) / valeurs.total, 560 / valeurs.total);
  $: hG = valeurs.total * k;
  $: hD = valeurs.pays * k;
  $: hE = valeurs.employes * k;
  $: decalage = empile ? 0 : hG - hD;

  $: tuiles = largeur ? etiqueter(squarify(
      [...pays].sort((a, b) => b.pib - a.pib).map((p) => ({ ...p, v: p.pib })), 0, 0, largeur, hD), petit) : [];
  $: nommes = tuiles.filter((r) => r.lignes).length;

  function etiqueter(rects, petit) {
    return rects.map((r) => {
      const nom = r[langue];
      const t = r.rang / 57; // gris clair (petits pays) → gris moyen (plus gros)
      const c = Math.round(238 - 34 * t);
      const fill = `rgb(${c},${c},${c + 3})`;
      const min = petit ? 44 : 58;
      if (r.w <= min || r.h <= (petit ? 24 : 30)) return { ...r, lignes: null, fill };
      const fs = Math.max(9.5, Math.min(petit ? 11.5 : 13, r.w / 8));
      const tient = (s) => s.length * fs * 0.56 <= r.w - 8;
      let lignes = null;
      if (tient(nom)) lignes = [nom];
      else {
        const m = nom.match(/^(.+?[- ])(.+)$/);
        if (m && tient(m[1].trim()) && tient(m[2]) && r.h > 3 * fs + 10) lignes = [m[1].trim(), m[2]];
      }
      return { ...r, lignes, fs, fill };
    });
  }

  $: fsG = petit ? 13 : 17;
  $: fsG2 = petit ? 11.5 : 13.5;
</script>

<svelte:window bind:innerWidth={ecran} />

<section class="bloc">
  <h1>{t.titre}</h1>
  <p class="chapo">{t.chapo}</p>

  <div class="duo">
    <div bind:this={colonne}>
      <h3>{t.gaucheTitre}</h3>
      <p class="s">{t.gaucheSous}</p>
      {#if largeur}
        <svg viewBox="0 0 {largeur} {hG}" style="height:{hG}px" role="img" aria-label={t.gaucheSous}>
          <rect x="0" y="0" width={largeur} height={hE} fill="#dd203c" />
          <rect x="0" y={hE} width={largeur} height={hG - hE} fill="#8f0f24" />
          <line x1="0" x2={largeur} y1={hE} y2={hE} stroke="#fff" stroke-width="1.5" />
          <text class="fort" x="10" y={petit ? 20 : 28} font-size={fsG}>{`${fmt(valeurs.employes)} ${t.unite}`}</text>
          <text class="leger" x="10" y={(petit ? 20 : 28) + (petit ? 16 : 20)} font-size={fsG2}>{petit ? t.employesCourt : t.employes}</text>
          <text class="fort" x="10" y={hE + (petit ? 20 : 28)} font-size={fsG}>{`${fmt(valeurs.fondateurs)} ${t.unite}`}</text>
          <text class="leger" x="10" y={hE + (petit ? 20 : 28) + (petit ? 16 : 20)} font-size={fsG2}>{t.fondateurs}</text>
        </svg>
      {/if}
    </div>

    <div>
      <h3>{t.droiteTitre}</h3>
      <p class="s">{t.droiteSous}</p>
      {#if largeur}
        <svg viewBox="0 0 {largeur} {empile ? hD : hG}" style="height:{empile ? hD : hG}px" role="img" aria-label={t.droiteSous}>
          {#if !petit && !empile}
            <text class="compte" x={largeur - 4} y={decalage - 6} text-anchor="end">{t.nommes(nommes, 57 - nommes)}</text>
          {/if}
          <g transform="translate(0,{decalage})">
            {#each tuiles as r (r.iso3)}
              <rect x={r.x} y={r.y} width={Math.max(r.w, 0)} height={Math.max(r.h, 0)} fill={r.fill} stroke="#fff" stroke-width="1">
                <title>{`${r[langue]}${langue === 'fr' ? ' : ' : ': '}${fmt(r.pib)} ${t.unite}`}</title>
              </rect>
              {#if r.lignes}
                {#each r.lignes as l, j}
                  <text class="nom" x={r.x + 5} y={r.y + r.fs + 3 + j * (r.fs + 2)} font-size={r.fs}>{l}</text>
                {/each}
                <text class="val" x={r.x + 5} y={r.y + (r.lignes.length + 1) * (r.fs + 2) + 3} font-size={r.fs - 1}>{fmt(r.pib)}</text>
              {/if}
            {/each}
          </g>
        </svg>
      {/if}
    </div>
  </div>

  <div class="source">{t.note}<br />{t.source}</div>
</section>

<style>
  :global(:root) { --rouge: #dd203c; --encre: #141414; --gris: #6e6e73; --filet: #dcdcdc; --marge: 16px; }
  :global(html.embarque) { --marge: 0; }
  :global(*) { box-sizing: border-box; }
  :global(body) { margin: 0; background: #fff; color: var(--encre); font-family: 'National', Helvetica, Arial, sans-serif; }
  .bloc { max-width: 1040px; margin: 0 auto; padding: 18px var(--marge) 22px; }
  h1 { font-family: 'Sanomat', Georgia, serif; font-weight: 700; font-size: clamp(21px, 3.2vw, 28px); line-height: 1.12; margin: 0 0 8px; text-wrap: balance; }
  .chapo { font-size: 15px; line-height: 1.42; color: var(--gris); margin: 0 0 16px; max-width: 760px; }
  .duo { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(14px, 4vw, 48px); align-items: end; }
  h3 { font-family: 'Sanomat', Georgia, serif; font-weight: 700; font-size: 15px; margin: 0 0 2px; line-height: 1.2; }
  .s { font-size: 12.5px; color: var(--gris); margin: 0 0 8px; line-height: 1.3; min-height: 2.6em; }
  svg { display: block; width: 100%; overflow: visible; }
  text { font-family: 'National', Helvetica, Arial, sans-serif; pointer-events: none; }
  .fort { font-family: 'Sanomat', Georgia, serif; font-weight: 700; fill: #fff; }
  .leger { fill: #fff; }
  .nom { font-weight: 600; fill: #141414; }
  .val { fill: #4a4a4f; }
  .compte { font-size: 11.5px; fill: var(--gris); }
  .source { border-top: 1px solid var(--filet); margin-top: 12px; padding-top: 7px; font-size: 11.5px; color: var(--gris); line-height: 1.4; }
  @media (max-width: 600px) {
    .duo { grid-template-columns: minmax(0, 1fr); gap: 22px; }
    .s { min-height: 0; }
  }
</style>
