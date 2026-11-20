<script>
  import { onDestroy } from 'svelte';
  import { textes, cibles } from './textes.js';
  import tous from './pays185.json';

  const langue = import.meta.env.VITE_LANGUE || 'fr';
  const t = textes[langue];
  const loc = langue === 'fr' ? 'fr-FR' : langue;
  const fmt = (v) => v.toLocaleString(loc, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const md = (v) => `${fmt(v)} ${t.unite}`;
  const sansAccent = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  const pays = [...tous].sort((a, b) => a.pib - b.pib);

  let cibleId = 'tot';
  let choisis = []; // iso3 dans l'ordre d'ajout
  let recherche = '';
  let message = t.debut;
  let secoue = null;
  let minuteur = null;

  $: cible = cibles.find((c) => c.id === cibleId).v;
  $: pris = new Set(choisis);
  $: total = choisis.reduce((s, i) => s + pays.find((p) => p.iso3 === i).pib, 0);
  $: reste = Math.max(0, cible - total);
  $: max = maximum(cible);
  $: candidats = pays.filter((p) => !pris.has(p.iso3) && p.pib <= reste + 1e-9);
  $: fini = choisis.length > 0 && candidats.length === 0;
  $: unSeul = [...pays].reverse().find((p) => p.pib <= cible);
  $: liste = recherche ? pays.filter((p) => sansAccent(p[langue]).includes(sansAccent(recherche))) : pays;
  $: if (fini && !minuteur) message = choisis.length === max ? t.record(max) : t.fini(choisis.length, max);
  $: segments = (() => {
    let x = 0;
    return choisis.map((i, k) => {
      const p = pays.find((q) => q.iso3 === i);
      const s = { ...p, x: (x / cible) * 100, w: (p.pib / cible) * 100, k };
      x += p.pib;
      return s;
    });
  })();

  function maximum(c) {
    let s = 0, n = 0;
    for (const p of pays) { if (s + p.pib > c) break; s += p.pib; n++; }
    return n;
  }

  function basculer(p) {
    if (minuteur) return;
    if (pris.has(p.iso3)) {
      choisis = choisis.filter((i) => i !== p.iso3);
      message = t.retire(p[langue]);
    } else if (p.pib <= reste + 1e-9) {
      choisis = [...choisis, p.iso3];
      message = t.ajoute(p[langue], md(p.pib));
    } else {
      message = t.tropGros(p[langue], md(p.pib), md(reste));
      secoue = p.iso3;
      setTimeout(() => (secoue = null), 400);
    }
  }

  function hasard() {
    if (minuteur || !candidats.length) return;
    basculer(candidats[Math.floor(Math.random() * candidats.length)]);
  }

  function somme(liste) { return liste.reduce((s, i) => s + pays.find((p) => p.iso3 === i).pib, 0); }
  function prochain() {
    const deja = new Set(choisis);
    const r = cible - somme(choisis);
    return pays.find((p) => !deja.has(p.iso3) && p.pib <= r + 1e-9);
  }

  function remplir() {
    if (minuteur) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let p;
      while ((p = prochain())) choisis = [...choisis, p.iso3];
      return;
    }
    minuteur = setInterval(() => {
      const p = prochain();
      if (!p) { clearInterval(minuteur); minuteur = null; return; }
      choisis = [...choisis, p.iso3];
      message = t.ajoute(p[langue], md(p.pib));
    }, 70);
  }

  function recommencer() {
    clearInterval(minuteur); minuteur = null;
    choisis = []; recherche = ''; message = t.debut;
  }

  function changerCible(id) { cibleId = id; recommencer(); }

  onDestroy(() => clearInterval(minuteur));
</script>

<section class="bloc">
  <h1>{t.titre}</h1>
  <p class="chapo">{t.chapo}</p>

  <div class="cibles" role="group">
    {#each cibles as c}
      <button aria-pressed={cibleId === c.id} on:click={() => changerCible(c.id)}>
        <b>{t.cibles[c.id]}</b><small>{md(c.v)}</small>
      </button>
    {/each}
  </div>

  <div class="score">
    <span class="n">{t.pays(choisis.length)}</span>
    <span class="detail">{md(total)} / {md(cible)} · {t.reste(md(reste))}</span>
  </div>

  <div class="jauge" class:pleine={fini}>
    {#each segments as s (s.iso3)}
      <div class="seg" class:alt={s.k % 2} style="left:{s.x}%;width:{s.w}%" title="{s[langue]} · {md(s.pib)}"></div>
    {/each}
  </div>
  <p class="un-seul">{t.unSeul(unSeul[langue], md(unSeul.pib))}</p>

  <p class="message" class:fin={fini} aria-live="polite">{message}</p>

  <div class="outils">
    <input type="search" placeholder={t.chercher} bind:value={recherche} aria-label={t.chercher} />
    <button on:click={hasard} disabled={!!minuteur || !candidats.length}>{t.hasard}</button>
    <button on:click={remplir} disabled={!!minuteur || !candidats.length}>{t.remplir}</button>
    <button class="sobre" on:click={recommencer}>{t.recommencer}</button>
  </div>
  <p class="legende">{t.legende}</p>

  <div class="puces">
    {#each liste as p (p.iso3)}
      <button
        class="puce"
        class:pris={pris.has(p.iso3)}
        class:trop={!pris.has(p.iso3) && p.pib > reste + 1e-9}
        class:secoue={secoue === p.iso3}
        on:click={() => basculer(p)}
      >
        <span class="nom">{p[langue]}</span><span class="val">{fmt(p.pib)}</span>
      </button>
    {:else}
      <p class="vide">{t.aucun}</p>
    {/each}
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
  .chapo { font-size: 15px; line-height: 1.42; color: var(--gris); margin: 0 0 14px; max-width: 760px; }
  button { font: inherit; color: inherit; cursor: pointer; }
  .cibles { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-bottom: 14px; }
  .cibles button { border: 1px solid var(--filet); background: #fff; border-radius: 3px; padding: 7px 10px; text-align: left; line-height: 1.25; }
  .cibles b { display: block; font-family: 'Sanomat', Georgia, serif; font-size: 14.5px; }
  .cibles small { color: var(--gris); font-size: 12px; }
  .cibles button[aria-pressed='true'] { border-color: var(--rouge); box-shadow: inset 0 0 0 1px var(--rouge); }
  .cibles button[aria-pressed='true'] b { color: var(--rouge); }
  .score { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; margin-bottom: 6px; }
  .n { font-family: 'Sanomat', Georgia, serif; font-weight: 700; font-size: 26px; color: var(--rouge); white-space: nowrap; }
  .detail { font-size: 13px; color: var(--gris); }
  .jauge { position: relative; height: 46px; border: 1.5px solid var(--rouge); border-radius: 3px; background: #fff; overflow: hidden; }
  .jauge.pleine { background: #fbe9ec; }
  .seg { position: absolute; top: 0; bottom: 0; background: #c4c4c9; border-right: 1px solid #fff; transition: left 0.2s, width 0.2s; }
  .seg.alt { background: #a9a9af; }
  .un-seul { font-size: 12px; color: var(--gris); margin: 5px 0 0; }
  .message { min-height: 1.4em; font-size: 14px; margin: 10px 0; }
  .message.fin { font-family: 'Sanomat', Georgia, serif; font-weight: 700; font-size: 16px; color: var(--rouge); }
  .outils { display: flex; flex-wrap: wrap; gap: 8px; }
  .outils input { flex: 1 1 180px; min-width: 0; font: inherit; font-size: 16px; padding: 7px 10px; border: 1px solid var(--filet); border-radius: 3px; }
  .outils button { border: 1px solid var(--encre); background: var(--encre); color: #fff; border-radius: 3px; padding: 7px 12px; font-size: 13.5px; font-weight: 500; }
  .outils button.sobre { background: #fff; color: var(--encre); border-color: var(--filet); }
  .outils button:disabled { opacity: 0.35; cursor: default; }
  .legende { font-size: 11.5px; color: var(--gris); margin: 8px 0 6px; }
  .puces { display: flex; flex-wrap: wrap; gap: 5px; max-height: 300px; overflow-y: auto; padding: 2px; border-top: 1px solid var(--filet); border-bottom: 1px solid var(--filet); padding-block: 8px; }
  .puce { display: inline-flex; gap: 6px; align-items: baseline; border: 1px solid var(--filet); background: #f6f6f7; border-radius: 3px; padding: 4px 8px; font-size: 12.5px; line-height: 1.2; }
  .puce .val { color: var(--gris); font-size: 11.5px; }
  .puce:hover { border-color: var(--encre); }
  .puce.pris { background: var(--rouge); border-color: var(--rouge); color: #fff; }
  .puce.pris .val { color: #fde3e7; }
  .puce.trop { opacity: 0.38; }
  .puce.secoue { animation: secoue 0.35s; }
  @keyframes secoue { 20%, 60% { transform: translateX(-3px); } 40%, 80% { transform: translateX(3px); } }
  .vide { font-size: 13px; color: var(--gris); margin: 6px 2px; }
  .source { border-top: 1px solid var(--filet); margin-top: 12px; padding-top: 7px; font-size: 11.5px; color: var(--gris); line-height: 1.4; }
  button:focus-visible, input:focus-visible { outline: 2px solid var(--rouge); outline-offset: 1px; }
  @media (max-width: 600px) {
    .cibles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .puces { max-height: 260px; }
  }
  @media (prefers-reduced-motion: reduce) { .seg { transition: none; } .puce.secoue { animation: none; } }
</style>
