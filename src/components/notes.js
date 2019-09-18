import uuidv4 from "uuid/v4";
import moment from 'moment'


let notes = []

const getNotes = () => notes

const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch(error) {
        return []
    }
}

const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.uniqueID === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

const createNote = (title) => {
    const id = uuidv4()
    const timestamp = moment().unix()
    notes.push({
        title,
        body: '',
        uniqueID: id,
        dateCreated: timestamp,
        lastEdited: timestamp
    })
    saveNotes()
    return id
}

const sortNotes = (sortBy) => {
    notes = loadNotes()
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) =>
            a.lastEdited > b.lastEdited ? -1
                : a.lastEdited < b.lastEdited ? 1
                    : 0
        )
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) =>
            a.dateCreated > b.dateCreated ? -1
                : a.dateCreated < b.dateCreated ? 1
                    : 0
        )
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) =>
            a.title.toLowerCase() < b.title.toLowerCase() ? -1
                : a.title.toLowerCase() > b.title.toLowerCase() ? 1
                    : 0
        )
    } else {
        return notes
    }
}

const updateNote = (id, { title, body }) => {
    const note = notes.find((note) => note.uniqueID === id)

    if (!note) {
        return
    }

    if (typeof title === 'string') {
        note.title = title
        note.lastEdited = moment().unix()
    }

    if (typeof body === 'string') {
        note.body = body
        note.lastEdited = moment().unix()
    }
    saveNotes()
    return note
}

notes = loadNotes()

export { sortNotes, getNotes, createNote, removeNote, updateNote }