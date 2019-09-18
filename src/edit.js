import { removeNote, updateNote } from './components/notes'
import { renderEdit, generateLastEdited } from './components/render'

const noteTitle = document.querySelector('#note-title')
const noteBody = document.querySelector('#note-body')
const lastEdit = document.querySelector('#last-edit')

const noteID = location.hash.substring(1)

renderEdit(noteID)

noteTitle.addEventListener('input', (event) => {
    const note = updateNote(noteID, {
        title: event.target.value
    })
    lastEdit.textContent = generateLastEdited(note.lastEdited)
})

noteBody.addEventListener('input', (event) => {
    const note = updateNote(noteID, {
        body: event.target.value
    })
    lastEdit.textContent = generateLastEdited(note.lastEdited)
})

document.querySelector('#remove-note').addEventListener('click', () => {
    removeNote(noteID)
    location.assign('/index.html')
})

window.addEventListener('storage', (event) => {
    if (event.key === 'notes') {
        renderEdit(noteID)
    }
})