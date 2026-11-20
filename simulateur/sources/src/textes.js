// Textes du simulateur, par langue.
// Valeurs : prospectus d'Anthropic (S-1/A, 10 nov. 2026), clôture du 19 nov. 2026 (97,17 $), FMI WEO oct. 2026.

export const cibles = [
  { id: 'tot', v: 433.4 },
  { id: 'fond', v: 162.6 },
  { id: 'sal', v: 270.8 },
  { id: 'un', v: 23.2 }
];

export const textes = {
  fr: {
    titre: "Combien de pays faut-il pour égaler les fondateurs et employés d'Anthropic ?",
    chapo: "Remplissez la jauge avec le PIB de pays, sans dépasser la valeur des parts des fondateurs et employés d'Anthropic après l'introduction en bourse. Combien de pays parviendrez-vous à réunir ?",
    unite: 'Md$',
    cibles: { tot: 'Fondateurs et employés', fond: '7 cofondateurs', sal: 'Employés', un: '1 cofondateur (moyenne)' },
    pays: (n) => `${n} pays`,
    reste: (r) => `il reste ${r}`,
    depasse: 'dépassé',
    chercher: 'Chercher un pays',
    hasard: 'Au hasard',
    remplir: 'Les plus petits d\'abord',
    recommencer: 'Recommencer',
    debut: 'Cliquez sur un pays pour verser son PIB dans la jauge.',
    ajoute: (p, v) => `+ ${p} (${v})`,
    retire: (p) => `− ${p}`,
    tropGros: (p, v, r) => `${p} (${v}) : ne rentre pas, il ne reste que ${r}.`,
    fini: (n, max) => `Plus aucun pays ne rentre. Vous avez réuni ${n} pays ; le maximum possible est de ${max}.`,
    record: (n) => `Record égalé : ${n} pays, le maximum possible.`,
    unSeul: (p, v) => `Un seul pays s'en approche : ${p} (${v}).`,
    aucun: 'Aucun pays ne correspond.',
    legende: 'PIB 2026 prévu par le FMI · cliquez de nouveau sur un pays pour le retirer',
    note: "Note : estimation du Grand Continent, qui valorise au cours de clôture du 19 novembre (97,17 dollars) les actions des sept cofondateurs et les options (nettes du prix d'exercice moyen de 2,91 dollars) et actions gratuites attribuées aux employés, y compris non acquises. PIB 2026 prévus par le FMI pour les 185 membres de l'ONU couverts.",
    source: 'Sources : Anthropic (S-1/A, 10 novembre 2026), Bloomberg, FMI · Graphique : Le Grand Continent'
  },
  es: {
    titre: '¿Cuántos países hacen falta para igualar a los fundadores y empleados de Anthropic?',
    chapo: 'Llene el indicador con el PIB de países, sin superar el valor de las participaciones de los fundadores y empleados de Anthropic tras su salida a bolsa. ¿Cuántos países logrará reunir?',
    unite: 'mil M$',
    cibles: { tot: 'Fundadores y empleados', fond: '7 cofundadores', sal: 'Empleados', un: '1 cofundador (media)' },
    pays: (n) => (n === 1 ? '1 país' : `${n} países`),
    reste: (r) => `quedan ${r}`,
    depasse: 'superado',
    chercher: 'Buscar un país',
    hasard: 'Al azar',
    remplir: 'Primero los más pequeños',
    recommencer: 'Reiniciar',
    debut: 'Haga clic en un país para añadir su PIB al indicador.',
    ajoute: (p, v) => `+ ${p} (${v})`,
    retire: (p) => `− ${p}`,
    tropGros: (p, v, r) => `${p} (${v}): no cabe, solo quedan ${r}.`,
    fini: (n, max) => `Ya no cabe ningún país. Ha reunido ${n} países; el máximo posible es ${max}.`,
    record: (n) => `Récord igualado: ${n} países, el máximo posible.`,
    unSeul: (p, v) => `Un solo país se le acerca: ${p} (${v}).`,
    aucun: 'Ningún país coincide.',
    legende: 'PIB 2026 previsto por el FMI · vuelva a hacer clic en un país para retirarlo',
    note: 'Nota: estimación del Grand Continent, que valora al precio de cierre del 19 de noviembre (97,17 dólares) las acciones de los siete cofundadores y las opciones (netas del precio de ejercicio medio de 2,91 dólares) y acciones gratuitas concedidas a los empleados, incluidas las no consolidadas. PIB de 2026 previstos por el FMI para los 185 miembros de la ONU cubiertos.',
    source: 'Fuentes: Anthropic (S-1/A, 10 de noviembre de 2026), Bloomberg, FMI · Gráfico: El Grand Continent'
  },
  it: {
    titre: 'Quanti paesi servono per eguagliare i fondatori e i dipendenti di Anthropic?',
    chapo: "Riempite l'indicatore con il PIL di vari paesi, senza superare il valore delle partecipazioni dei fondatori e dei dipendenti di Anthropic dopo la quotazione in borsa. Quanti paesi riuscirete a riunire?",
    unite: 'mld $',
    cibles: { tot: 'Fondatori e dipendenti', fond: '7 cofondatori', sal: 'Dipendenti', un: '1 cofondatore (media)' },
    pays: (n) => (n === 1 ? '1 paese' : `${n} paesi`),
    reste: (r) => `restano ${r}`,
    depasse: 'superato',
    chercher: 'Cerca un paese',
    hasard: 'A caso',
    remplir: 'Prima i più piccoli',
    recommencer: 'Ricomincia',
    debut: "Cliccate su un paese per aggiungere il suo PIL all'indicatore.",
    ajoute: (p, v) => `+ ${p} (${v})`,
    retire: (p) => `− ${p}`,
    tropGros: (p, v, r) => `${p} (${v}): non ci sta, restano solo ${r}.`,
    fini: (n, max) => `Non ci sta più nessun paese. Avete riunito ${n} paesi; il massimo possibile è ${max}.`,
    record: (n) => `Record eguagliato: ${n} paesi, il massimo possibile.`,
    unSeul: (p, v) => `Un solo paese ci si avvicina: ${p} (${v}).`,
    aucun: 'Nessun paese corrisponde.',
    legende: 'PIL 2026 previsto dal FMI · cliccate di nuovo su un paese per toglierlo',
    note: "Nota: stima del Grand Continent, che valuta al prezzo di chiusura del 19 novembre (97,17 dollari) le azioni dei sette cofondatori e le opzioni (al netto del prezzo di esercizio medio di 2,91 dollari) e le azioni gratuite assegnate ai dipendenti, comprese quelle non ancora maturate. PIL 2026 previsti dal FMI per i 185 membri dell'ONU coperti.",
    source: 'Fonti: Anthropic (S-1/A, 10 novembre 2026), Bloomberg, FMI · Grafico: Il Grand Continent'
  }
};
