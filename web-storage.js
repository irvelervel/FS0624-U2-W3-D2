// I motori di web storage (e le conseguenti API sviluppate per il loro utilizzo)
// nascono con la standardizzazione di HTML5, al fine di espandere e migliorare
// una tecnologia esistente (i cookies).
// Migliorano i cookies sotto principalmente due aspetti
// 1) riescono a contenere più informazioni (5MB vs 4KB)
// 2) i cookies non erano stati concepiti con il concetto di "sessione"

// La soluzione è stata introdurre due nuove tecnologie per la memorizzazione di dati
// lato BROWSER a breve/medio termine:
// 1) localStorage (che memorizza dei dati fino al proprio svuotamento)
// 2) sessionStorage (che autodistrugge i dati al termine della sessione aka quando
// il tab o il browser viene chiuso)

// Entrambe queste tecnologie condividono uno spazio totale di circa ~5MB
// e memorizzazione le loro informazioni in "celle" separate per DOMINIO

// 1) e 2) sono tecnologie separate ma condividono le stesse metodologie di interazione

// - setItem() salva una coppia chiave/valore
// - getItem() recupera un valore dato il nome della sua chiave
// - removeItem() elimina una coppia chiave/valore
// - clear() elimina TUTTO il contenuto del local/session storage relativo a quel dominio

// DISCLAIMER: ricordiamoci di non salvare dati particolarmente sensibili o preziosi
// in questi 2 motori di storage, in quanto sono completamente esposti in chiaro
// a qualsiasi utente in grado di utilizzare gli strumenti di sviluppo.
// qualsiasi utente può creare, distruggere e soprattutto MODIFICARE i dati!

// N.B: il local/session storage salvano dati solamente come S T R I N G H E!

// salvare il dato "Stefano" con nome "firstName"
localStorage.setItem('firstName', 'Stefano')
localStorage.setItem('benchmarkResult', 100)
localStorage.setItem('drivingLicense', true)
// dati primitivi vengono salvati correttamente, anche se convertiti automaticamente
// da JS in formato stringa

// con i tipi di dato più complessi però, come array e oggetti, questa "conversione
// automatica" da parte di JS non funziona bene
// per questo motivo viene in nostro aiuto un metodo JS che converte CORRETTAMENTE
// array e oggetti in formato stringa -> JSON.stringify()
localStorage.setItem(
  'arrayOfNames',
  JSON.stringify(['Antonio', 'Diana', 'Giovanni', 'Loic'])
)

localStorage.setItem('object', JSON.stringify({ firstName: 'Stefano' }))
// ma funziona anche
// const yuri = { firstName: 'Yuri' }
// localStorage.setItem('object', JSON.stringify(yuri))

// per salvare nello session storage
sessionStorage.setItem('test', 'ciao')

// come recuperare i dati salvati?
console.log(parseInt(localStorage.getItem('benchmarkResult')) + 100)

// recupero di dati complessi dal local/session storage
const arrayOfNames = JSON.parse(localStorage.getItem('arrayOfNames'))
console.log('ARRAY ORIGINALE', arrayOfNames)

const myName = JSON.parse(localStorage.getItem('object')).firstName
console.log(myName) // 'Stefano'

// eliminare una chiave specifica
// localStorage.removeItem('benchmarkResult') // elimina benchmarkResult dal localStorage
// localStorage.removeItem('arrayOfNames') // elimina arrayOfNames dal localStorage
// localStorage.clear() // svuoterebbe tutto!
localStorage.removeItem('complexData')
