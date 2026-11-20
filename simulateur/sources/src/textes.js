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
    chapo: "Déplacez le curseur pour additionner le PIB des plus petites économies du monde, jusqu'à atteindre la valeur des parts des fondateurs et employés d'Anthropic après l'introduction en bourse, sans la dépasser.",
    unite: 'Md$',
    cibles: { tot: 'Fondateurs et employés', fond: '7 cofondateurs', sal: 'Employés', un: '1 cofondateur (moyenne)' },
    pays: (n) => `${n} pays`,
    curseur: 'Nombre de pays',
    pibCumule: 'PIB cumulé',
    dernier: (p, v) => `Dernier pays ajouté : ${p} (${v})`,
    aucun: 'Aucun pays ajouté',
    encore: (r) => `Encore ${r} : ajoutez des pays.`,
    juste: (n) => `C'est le compte exact : ${n} pays, le maximum avant de dépasser.`,
    trop: (p, e, k) => `Trop : le PIB cumulé dépasse de ${e}. Le seuil est franchi au ${k}e pays (${p}).`,
    reponse: 'Voir la réponse',
    liste: 'Pays additionnés, du plus petit au plus grand PIB',
    note: "Note : estimation du Grand Continent, qui valorise au cours de clôture du 19 novembre (97,17 dollars) les actions des sept cofondateurs et les options (nettes du prix d'exercice moyen de 2,91 dollars) et actions gratuites attribuées aux employés, y compris non acquises. PIB 2026 prévus par le FMI pour les membres de l'ONU.",
    source: 'Sources : Anthropic (S-1/A, 10 novembre 2026), Bloomberg, FMI · Graphique : Le Grand Continent'
  },
  es: {
    titre: '¿Cuántos países hacen falta para igualar a los fundadores y empleados de Anthropic?',
    chapo: 'Mueva el cursor para sumar el PIB de las economías más pequeñas del mundo hasta alcanzar el valor de las participaciones de los fundadores y empleados de Anthropic tras su salida a bolsa, sin superarlo.',
    unite: 'mil M$',
    cibles: { tot: 'Fundadores y empleados', fond: '7 cofundadores', sal: 'Empleados', un: '1 cofundador (media)' },
    pays: (n) => (n === 1 ? '1 país' : `${n} países`),
    curseur: 'Número de países',
    pibCumule: 'PIB acumulado',
    dernier: (p, v) => `Último país añadido: ${p} (${v})`,
    aucun: 'Ningún país añadido',
    encore: (r) => `Faltan ${r}: añada países.`,
    juste: (n) => `Es la cifra exacta: ${n} países, el máximo antes de superarlo.`,
    trop: (p, e, k) => `Demasiado: el PIB acumulado lo supera en ${e}. El umbral se cruza con el país n.º ${k} (${p}).`,
    reponse: 'Ver la respuesta',
    liste: 'Países sumados, del PIB más pequeño al más grande',
    note: 'Nota: estimación del Grand Continent, que valora al precio de cierre del 19 de noviembre (97,17 dólares) las acciones de los siete cofundadores y las opciones (netas del precio de ejercicio medio de 2,91 dólares) y acciones gratuitas concedidas a los empleados, incluidas las no consolidadas. PIB de 2026 previstos por el FMI para los miembros de la ONU.',
    source: 'Fuentes: Anthropic (S-1/A, 10 de noviembre de 2026), Bloomberg, FMI · Gráfico: El Grand Continent'
  },
  it: {
    titre: 'Quanti paesi servono per eguagliare i fondatori e i dipendenti di Anthropic?',
    chapo: "Spostate il cursore per sommare il PIL delle economie più piccole del mondo fino a raggiungere il valore delle partecipazioni dei fondatori e dei dipendenti di Anthropic dopo la quotazione in borsa, senza superarlo.",
    unite: 'mld $',
    cibles: { tot: 'Fondatori e dipendenti', fond: '7 cofondatori', sal: 'Dipendenti', un: '1 cofondatore (media)' },
    pays: (n) => (n === 1 ? '1 paese' : `${n} paesi`),
    curseur: 'Numero di paesi',
    pibCumule: 'PIL cumulato',
    dernier: (p, v) => `Ultimo paese aggiunto: ${p} (${v})`,
    aucun: 'Nessun paese aggiunto',
    encore: (r) => `Mancano ${r}: aggiungete paesi.`,
    juste: (n) => `È il numero esatto: ${n} paesi, il massimo prima di superarlo.`,
    trop: (p, e, k) => `Troppo: il PIL cumulato lo supera di ${e}. La soglia viene superata al ${k}° paese (${p}).`,
    reponse: 'Vedi la risposta',
    liste: 'Paesi sommati, dal PIL più piccolo al più grande',
    note: "Nota: stima del Grand Continent, che valuta al prezzo di chiusura del 19 novembre (97,17 dollari) le azioni dei sette cofondatori e le opzioni (al netto del prezzo di esercizio medio di 2,91 dollari) e le azioni gratuite assegnate ai dipendenti, comprese quelle non ancora maturate. PIL 2026 previsti dal FMI per i membri dell'ONU.",
    source: 'Fonti: Anthropic (S-1/A, 10 novembre 2026), Bloomberg, FMI · Grafico: Il Grand Continent'
  }
};
