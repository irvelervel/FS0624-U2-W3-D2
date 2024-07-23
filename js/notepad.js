// recupero i riferimenti dei 3 pulsanti del form
const saveButton = document.getElementById('save')
const loadButton = document.getElementById('load')
const resetButton = document.getElementById('reset')

const textarea = document.getElementById('notepad-textarea') // <textarea></textarea>

// saveButton: se premuto deve salvare l'attuale contenuto della textarea nel localStorage
const save = function () {
  console.log('cliccato save')
  // recupero il contenuto attuale del campo textarea
  const textareaValue = textarea.value
  // ora lo salvo nel localStorage
  localStorage.setItem('notepad-content', textareaValue)
}

saveButton.addEventListener('click', save)

// loadButton: se presente, ricaricherà il contenuto salvato nel localStorage dentro l'input
const load = function () {
  console.log('cliccalo load')
  // controllare se esiste già un valore salvato nel localStorage
  const retrievedValue = localStorage.getItem('notepad-content')
  if (retrievedValue) {
    // entro qui dentro solo se retrivedValue NON è null!
    // riassegno il suo valore alla textarea
    textarea.value = retrievedValue
  }
}

loadButton.addEventListener('click', load)

const reset = function () {
  // svuota la textarea
  textarea.value = ''
  // eliminiamo anche il contenuto del localStorage
  localStorage.removeItem('notepad-content')
  alert('memoria svuotata')
}

resetButton.addEventListener('click', reset)
