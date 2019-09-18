import moment from 'moment'
import { sortNotes, getNotes } from './notes'
import { getFilters } from "./filters";

const appDOM = document.querySelector('#app')

const renderDOM = (arrayOfObjects) => {
    arrayOfObjects.forEach(({ title, uniqueID, lastEdited }) => {
        const anchorEl = document.createElement('a')
        const textEl = document.createElement('p')
        const momentEl = document.createElement('p')

        textEl.textContent = `${title}  `
        textEl.classList.add('list-item__title')
        anchorEl.setAttribute('href', `/edit.html#${uniqueID}`)
        anchorEl.classList.add('list-item')
        momentEl.textContent = generateLastEdited(lastEdited)
        momentEl.classList.add('list-item__subtitle')

        anchorEl.appendChild(textEl)
        anchorEl.appendChild(momentEl)
        appDOM.appendChild(anchorEl)
    });
}

const renderNotes = () => {
    const { searchText, sortBy } = getFilters()
    const notes = sortNotes(sortBy)

    if (notes.length > 0) {
        const filteredNotes = notes.filter(({ title, body }) => {
            title = title.toLowerCase()
            body = body.toLowerCase()
            const isTitleMatch = title.includes(searchText.toLowerCase())
            const isBodyMatch = body.includes(searchText.toLowerCase())
            return isTitleMatch || isBodyMatch
        })

        appDOM.innerHTML = ''
        renderDOM(filteredNotes)

    } else {
        const emptyNotes = document.createElement('p')
        emptyNotes.textContent = 'No notes to show.'
        emptyNotes.classList.add('empty-message')
        appDOM.appendChild(emptyNotes)
    }


}

const renderEdit = (noteID) => {
    const noteTitle = document.querySelector('#note-title')
    const noteBody = document.querySelector('#note-body')
    const lastEdit = document.querySelector('#last-edit')
    const notes = getNotes()
    const note = notes.find((eachNote) => eachNote.uniqueID === noteID)

    if (note === undefined) {
        location.assign('/index.html')
    }

    noteTitle.value = note.title
    noteBody.value = note.body
    lastEdit.textContent = generateLastEdited(note.lastEdited)
}

const generateLastEdited = (timestamp) => `Last edited ${moment.unix(timestamp).fromNow()}.`



export { renderNotes, renderEdit, generateLastEdited }