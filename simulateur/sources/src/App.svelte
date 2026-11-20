<script>
  import { onDestroy } from 'svelte';
  import { textes, cibles } from './textes.js';
  import tous from './pays185.json';

  const langue = import.meta.env.VITE_LANGUE || 'fr';
  const t = textes[langue];
  const loc = langue === 'fr' ? 'fr-FR' : langue;
  const fmt = (v) => v.toLocaleString(loc, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const md = (v) => `${fmt(v)} ${t.unite}`;
  const sep = langue === 'fr' ? ' : ' : ': ';

  // pays du plus petit au plus grand PIB, avec le cumul
  const pays = [...tous].sort((a, b) => a.pib - b.pib);
  const cumul = [0];
  pays.forEach((p, i) => cumul.push(cumul[i] + p.pib));
  const maxPour = (v) => cumul.findIndex((c) => c > v) - 1; // pays maximum sans dépasser

  let cibleId = 'tot';
  let n = 10;
  let anim = null;

  $: cible = cibles.find((c) => c.id === cibleId).v;
  $: max = maxPour(cible);
  $: borne = Math.min(pays.length, Math.round(max * 1.6) + 2);
  $: echelle = cible * 1.5; // la cible occupe les deux tiers de la jauge
  $: somme = cumul[n];
  $: etat = n < max ? 'encore' : n === max ? 'juste' : 'trop';
  $: dernier = n > 0 ? pays[n - 1] : null;
  $: segments = pays.slice(0, n).map((p, i) => ({ ...p, x: (cumul[i] / echelle) * 100, w: (p.pib / echelle) * 100, i }));
  $: ligne = (cible / echelle) * 100;
  $: remplissage = (n / borne) * 100;

  function changerCible(id) {
    stop();
    cibleId = id;
    n = Math.max(1, Math.round(maxPour(cibles.find((c) => c.id === id).v) / 5));
  }

  function stop() { if (anim) { cancelAnimationFrame(anim); anim = null; } }

  function voirReponse() {
    stop();
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { n = max; return; }
    const depart = n, d0 = performance.now(), duree = Math.min(1600, 40 * Math.abs(max - depart) + 300);
    const pas = (now) => {
      const k = Math.min(1, (now - d0) / duree);
      n = Math.round(depart + (max - depart) * (1 - Math.pow(1 - k, 3)));
      anim = k < 1 ? requestAnimationFrame(pas) : null;
    };
    anim = requestAnimationFrame(pas);
  }

  onDestroy(stop);
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
    <span class="n" class:ok={etat === 'juste'} class:ko={etat === 'trop'}>{t.pays(n)}</span>
    <span class="detail">{t.pibCumule}{sep}<b>{md(somme)}</b> / {md(cible)}</span>
  </div>

  <div class="jauge">
    <div class="remplie">
    {#each segments as s (s.iso3)}
      <div class="seg" class:alt={s.i % 2} class:depasse={cumul[s.i + 1] > cible} style="left:{s.x}%;width:{s.w}%" title="{s[langue]} · {md(s.pib)}"></div>
    {/each}
    </div>
    <div class="cible" class:visible={etat === 'trop'} style="left:{ligne}%"><span>{t.cibles[cibleId]}</span></div>
  </div>

  <label class="curseur">
    <span class="sr">{t.curseur}</span>
    <input type="range" min="0" max={borne} step="1" bind:value={n} on:input={stop} style="--p:{remplissage}%" aria-valuetext={t.pays(n)} />
  </label>
  <div class="bornes"><span>0</span><span>{borne}</span></div>

  <p class="message {etat}" aria-live="polite">
    {#if etat === 'encore'}{t.encore(md(cible - somme))}
    {:else if etat === 'juste'}{t.juste(max)}
    {:else}{t.trop(pays[max][langue], md(somme - cible), max + 1)}{/if}
  </p>
  <p class="dernier">{dernier ? t.dernier(dernier[langue], md(dernier.pib)) : t.aucun}</p>

  <div class="actions">
    <button on:click={voirReponse} disabled={n === max}>{t.reponse}</button>
  </div>

  {#if n > 0}
    <p class="liste"><span>{t.liste}{sep.trimEnd()}</span> {pays.slice(0, n).map((p) => p[langue]).join(', ')}.</p>
  {/if}

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
  .cibles { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin-bottom: 16px; }
  .cibles button { border: 1px solid var(--filet); background: #fff; border-radius: 3px; padding: 7px 10px; text-align: left; line-height: 1.25; }
  .cibles b { display: block; font-family: 'Sanomat', Georgia, serif; font-size: 14.5px; }
  .cibles small { color: var(--gris); font-size: 12px; }
  .cibles button[aria-pressed='true'] { border-color: var(--rouge); box-shadow: inset 0 0 0 1px var(--rouge); }
  .cibles button[aria-pressed='true'] b { color: var(--rouge); }
  .score { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 14px; margin-bottom: 26px; }
  .n { font-family: 'Sanomat', Georgia, serif; font-weight: 700; font-size: 32px; line-height: 1; color: var(--encre); white-space: nowrap; min-width: 4.2ch; }
  .n.ok { color: var(--rouge); }
  .n.ko { color: #8f0f24; }
  .detail { font-size: 13.5px; color: var(--gris); }
  .detail b { color: var(--encre); font-weight: 600; }
  .jauge { position: relative; height: 54px; background: #f3f3f4; border-radius: 2px; }
  .remplie { position: absolute; inset: 0; overflow: hidden; border-radius: 2px; }
  .seg { position: absolute; top: 0; bottom: 0; background: #c4c4c9; box-shadow: inset -1px 0 0 #fff; }
  .seg.alt { background: #adadb3; }
  .seg.depasse { background: repeating-linear-gradient(45deg, #dd203c 0 2px, #f7c9d1 2px 5px); }
  .cible { position: absolute; top: -18px; bottom: -6px; border-left: 2px solid var(--rouge); opacity: 0; transition: opacity 0.3s; pointer-events: none; }
  .cible.visible { opacity: 1; }
  .cible span { position: absolute; top: 0; right: 5px; white-space: nowrap; font-size: 11.5px; font-weight: 600; color: var(--rouge); line-height: 1; }
  .curseur { display: block; margin-top: 14px; padding: 0 14px; }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  input[type='range'] { width: 100%; height: 28px; margin: 0; background: transparent; -webkit-appearance: none; appearance: none; cursor: pointer; }
  input[type='range']::-webkit-slider-runnable-track { height: 4px; border-radius: 2px; background: linear-gradient(to right, var(--encre) var(--p), #dcdcdc var(--p)); }
  input[type='range']::-moz-range-track { height: 4px; border-radius: 2px; background: #dcdcdc; }
  input[type='range']::-moz-range-progress { height: 4px; border-radius: 2px; background: var(--encre); }
  input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; width: 24px; height: 24px; margin-top: -10px; border-radius: 50%; background: var(--rouge); border: 3px solid #fff; box-shadow: 0 0 0 1px var(--rouge), 0 1px 4px rgba(0, 0, 0, 0.2); }
  input[type='range']::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: var(--rouge); border: 3px solid #fff; box-shadow: 0 0 0 1px var(--rouge); }
  input[type='range']:focus-visible { outline: 2px solid var(--rouge); outline-offset: 2px; }
  .bornes { display: flex; justify-content: space-between; font-size: 11.5px; color: var(--gris); margin-top: 2px; padding: 0 14px; }
  .message { font-size: 15px; margin: 12px 0 2px; min-height: 1.4em; }
  .message.juste { font-family: 'Sanomat', Georgia, serif; font-weight: 700; font-size: 17px; color: var(--rouge); }
  .message.trop { color: #8f0f24; }
  .dernier { font-size: 13px; color: var(--gris); margin: 0 0 12px; }
  .actions button { border: 1px solid var(--encre); background: var(--encre); color: #fff; border-radius: 3px; padding: 8px 14px; font-size: 13.5px; font-weight: 500; min-height: 40px; }
  .actions button:disabled { opacity: 0.3; cursor: default; }
  .liste { font-size: 12px; line-height: 1.5; color: var(--gris); margin: 14px 0 0; max-height: 6em; overflow-y: auto; }
  .liste span { color: var(--encre); font-weight: 600; }
  .source { border-top: 1px solid var(--filet); margin-top: 14px; padding-top: 7px; font-size: 11.5px; color: var(--gris); line-height: 1.4; }
  button:focus-visible { outline: 2px solid var(--rouge); outline-offset: 1px; }
  @media (max-width: 600px) {
    .cibles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .n { font-size: 28px; }
  }
</style>
