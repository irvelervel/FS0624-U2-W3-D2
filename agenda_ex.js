// CREIAMO DEI CONTATTI A PARTIRE DAL FORM

// creo la classe per gli oggetti della rubrica
class Contact {
  constructor(_firstName, _lastName, _phone) {
    this.firstName = _firstName
    this.lastName = _lastName
    this.phone = _phone
  }
}

const createListFromArray = function (array) {
  const unorderedList = document.getElementById('phone-list') // <ul></ul>

  // per evitare che i risultati si "accumulino", è meglio SVUOTARE la lista
  // per sicurezza ogni volta
  unorderedList.innerHTML = ''

  // a questo punto la lista va riempita con tanti <li> quanti sono gli elementi
  // della mia "memoria"
  //
  // ciclo contactsList (la memoria) per capire QUANTI <li> creare
  for (let i = 0; i < array.length; i++) {
    // quest'operazione verrà ripetuta per OGNI elemento della memoria
    // creo un <li> vuoto
    const newLi = document.createElement('li') // <li>  </li>
    // ora lo riempio con i dati dell'elemento singolo della memoria
    newLi.innerText =
      array[i].firstName + ' ' + array[i].lastName + ' | ' + array[i].phone

    // AGGIUNGO NEL <li> UN BOTTONE ELIMINA
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('btn', 'btn-danger')
    deleteButton.innerHTML = '<i class="bi bi-trash-fill"></i>'
    deleteButton.addEventListener('click', function (e) {
      console.log('CLICCATA LA X', e.target)
      console.log(e.target.closest('li'))
      console.log('i', i)

      // sfrutto la i, ovvero l'indice del for in cui sono inserito
      // per eliminare UN elemento dal mio array di contatti
      array.splice(i, 1)
      // salvo nel localStorage la versione aggiornata del mio array,
      // in modo da mantenere sincronizzati DOM e localStorage
      localStorage.setItem('rubrica', JSON.stringify(array))
      // richiamo questa stessa funzione di generazione DOM,
      // che rigenererà la lista con un array più corto e riposizionando
      // correttamente tutti gli indici
      createListFromArray(array)

      // un binario morto è stato cercare di eliminare manualmente dal DOM
      // il <li> associato al bottone cliccato, ma non siamo riusciti
      // a manipolare l'array di conseguenza
      // e.target.closest('li').remove()
    })
    newLi.appendChild(deleteButton)

    // Stefano Casasola | 123123
    // <li>Stefano Casasola | 123123</li>
    newLi.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'justify-content-between'
    )
    // <li class="list-group-item">Stefano Casasola | 123123</li>
    // ora, passo finale, appendo l'<li> appena creato e finito
    // nella lista non ordinata
    unorderedList.appendChild(newLi)
  }
}

// MEMORIA DELL'APP (elenco telefonico)

// ho già una rubrica di contatti in localStorage? allora il mio array di contatti
// che creo nella pagina NON PARTE DA VUOTO, ma parte dalla rubrica precedente.
// se NON HO una rubrica già salvata, parto da array vuoto
const contactsList = localStorage.getItem('rubrica')
  ? JSON.parse(localStorage.getItem('rubrica'))
  : []

// eseguiamo del codice alla pressione del tasto SALVA CONTATTO

document
  .getElementsByTagName('form')[0] // prende il primo e unico form della pagina
  .addEventListener('submit', function (e) {
    // dobbiamo bloccare il comportamento di default del form, per evitare
    // che la pagina si aggiorni

    e.preventDefault() // <-- fondamentale

    // recuperiamo i riferimenti ai 3 campi input
    const firstNameInput = document.getElementById('firstName')
    const lastNameInput = document.getElementById('lastName')
    const phoneInput = document.getElementById('phone')

    // recuperiamo i VALORI dei 3 riferimenti
    const firstNameValue = firstNameInput.value // es. Stefano
    const lastNameValue = lastNameInput.value // es. Casasola
    const phoneValue = phoneInput.value // es. 123123

    console.log('firstNameValue:', firstNameValue)
    console.log('lastNameValue:', lastNameValue)
    console.log('phoneValue:', phoneValue)

    // creiamo con una classe un oggetto di tipo "Elemento rubrica"
    const element = new Contact(firstNameValue, lastNameValue, phoneValue)

    console.log('creo in rubrica', element)

    // devo salvare questo contatto in una memoria
    contactsList.push(element) // inserisco l'ultimo elemento appena creato

    // dopo aver aggiornato l'array dei contatti telefonici, è qui che
    // ne salverò una copia del localStorage
    localStorage.setItem('rubrica', JSON.stringify(contactsList))

    // ricreo la lista telefonica (la <ul>)
    // prendo un riferimento alla <ul> iniziale vuota

    // LA FUNZIONE ERA QUA
    // MANIP. DEL DOM
    createListFromArray(contactsList)

    // resetto il form
    // firstNameInput.value = ''
    // lastNameInput.value = ''
    // phoneInput.value = ''
    document.getElementsByTagName('form')[0].reset() // più elegante :)
  })

// controlliamo se nel localStorage esiste una voce "rubrica"
const savedRubrica = localStorage.getItem('rubrica')
if (savedRubrica) {
  // se entriamo qui vuol dire che abbiamo dei contatti da ripristinare!
  // dobbiamo ri-trasformare la stringa savedRubrica in un array di oggetti
  const arrayOfContacts = JSON.parse(savedRubrica)
  console.log(arrayOfContacts)
  createListFromArray(arrayOfContacts)
}
