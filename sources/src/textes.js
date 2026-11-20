// Tous les textes du graphique, par langue.
// Chiffres : prospectus d'Anthropic (S-1/A, 10 nov. 2026), clôture Bloomberg du 19 nov. 2026 (97,17 $),
// FMI WEO octobre 2026 (NGDPD 2026). Calculs : voir README.

export const textes = {
  fr: {
    titre: "Les fondateurs et employés d'Anthropic détiennent collectivement plus que le PIB de 57 pays",
    chapo: "Après l'introduction en bourse de l'entreprise jeudi 19 novembre.",
    unite: 'Md$',
    gaucheTitre: "Fondateurs et employés d'Anthropic",
    gaucheSous: '7 cofondateurs et environ 5 300 employés · 433,4 Md$',
    employes: 'environ 5 300 employés (options et actions)',
    employesCourt: 'environ 5 300 employés',
    fondateurs: '7 cofondateurs',
    droiteTitre: '57 plus petites économies',
    droiteSous: 'PIB 2026 cumulé · 423,5 Md$, de Tuvalu à la Macédoine du Nord',
    nommes: (n, r) => `${n} pays nommés, ${r} autres trop petits pour l'être`,
    note: "Note : estimation du Grand Continent, qui valorise au cours de clôture du 19 novembre (97,17 dollars) les actions des sept cofondateurs et les options (nettes du prix d'exercice moyen de 2,91 dollars) et actions gratuites attribuées aux employés, y compris non acquises. Les surfaces sont proportionnelles aux montants et comparées au PIB prévu en 2026 par le FMI pour les 57 plus petites économies membres de l'ONU.",
    source: "Sources : prospectus d'Anthropic (S-1/A, 10 novembre 2026), Bloomberg, FMI (World Economic Outlook, octobre 2026) · Graphique : Le Grand Continent"
  },
  es: {
    titre: 'Los fundadores y empleados de Anthropic poseen en conjunto más que el PIB de 57 países',
    chapo: 'Tras la salida a bolsa de la empresa el jueves 19 de noviembre.',
    unite: 'mil M$',
    gaucheTitre: 'Fundadores y empleados de Anthropic',
    gaucheSous: '7 cofundadores y unos 5.300 empleados · 433,4 mil M$',
    employes: 'unos 5.300 empleados (opciones y acciones)',
    employesCourt: 'unos 5.300 empleados',
    fondateurs: '7 cofundadores',
    droiteTitre: 'Las 57 economías más pequeñas',
    droiteSous: 'PIB acumulado en 2026 · 423,5 mil M$, de Tuvalu a Macedonia del Norte',
    nommes: (n, r) => `${n} países con nombre, otros ${r} demasiado pequeños para tenerlo`,
    note: 'Nota: estimación del Grand Continent, que valora al precio de cierre del 19 de noviembre (97,17 dólares) las acciones de los siete cofundadores y las opciones (netas del precio de ejercicio medio de 2,91 dólares) y acciones gratuitas concedidas a los empleados, incluidas las no consolidadas. Las superficies son proporcionales a los importes y se comparan con el PIB previsto para 2026 por el FMI de las 57 economías más pequeñas miembros de la ONU.',
    source: 'Fuentes: folleto de salida a bolsa de Anthropic (S-1/A, 10 de noviembre de 2026), Bloomberg, FMI (World Economic Outlook, octubre de 2026) · Gráfico: El Grand Continent'
  },
  it: {
    titre: 'I fondatori e i dipendenti di Anthropic possiedono complessivamente più del PIL di 57 paesi',
    chapo: 'Dopo la quotazione in borsa della società, giovedì 19 novembre.',
    unite: 'mld $',
    gaucheTitre: 'Fondatori e dipendenti di Anthropic',
    gaucheSous: '7 cofondatori e circa 5.300 dipendenti · 433,4 mld $',
    employes: 'circa 5.300 dipendenti (opzioni e azioni)',
    employesCourt: 'circa 5.300 dipendenti',
    fondateurs: '7 cofondatori',
    droiteTitre: 'Le 57 economie più piccole',
    droiteSous: 'PIL 2026 cumulato · 423,5 mld $, da Tuvalu alla Macedonia del Nord',
    nommes: (n, r) => `${n} paesi indicati, altri ${r} troppo piccoli per esserlo`,
    note: "Nota: stima del Grand Continent, che valuta al prezzo di chiusura del 19 novembre (97,17 dollari) le azioni dei sette cofondatori e le opzioni (al netto del prezzo di esercizio medio di 2,91 dollari) e le azioni gratuite assegnate ai dipendenti, comprese quelle non ancora maturate. Le superfici sono proporzionali agli importi e confrontate con il PIL previsto per il 2026 dal FMI per le 57 economie più piccole membri dell'ONU.",
    source: 'Fonti: prospetto di Anthropic (S-1/A, 10 novembre 2026), Bloomberg, FMI (World Economic Outlook, ottobre 2026) · Grafico: Il Grand Continent'
  }
};

// Valeurs (milliards de dollars)
export const valeurs = { employes: 270.8, fondateurs: 162.6, total: 433.4, pays: 423.5 };
