import { createNote } from './components/notes.js'
import { renderNotes } from './components/render'
import { setFilters } from './components/filters'

document.querySelector('#search').addEventListener('input', (event) => {
    setFilters({
        searchText: event.target.value
    })
    renderNotes()
})

document.querySelector('#sort-by').addEventListener('change', (event) => {
    setFilters({
        sortBy: event.target.value
    })
    renderNotes()
})

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    const id = createNote(event.target.elements.options.value)
    event.target.elements.options.value = ''
    location.assign(`/edit.html#${id}`)
   
})

window.addEventListener('storage', (event) => {
    if (event.key === 'notes') {
        renderNotes()
    }
})

renderNotes()