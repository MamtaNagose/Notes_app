var notes = [];

function addNote() {
    var noteInput = document.getElementById('noteInput').value;

    if (noteInput.trim() === '') {
        alert('Please enter a note before adding.');
        return;
    }

    var currentDate = new Date();
    var noteObject = {
        content: noteInput,
        date: currentDate.toISOString() // Save the date in ISO format
    };

    notes.push(noteObject);
    displayNotes();

    // Clear the input field
    document.getElementById('noteInput').value = '';
}

function displayNotes() {
    var notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    for (var i = 0; i < notes.length; i++) {
        var noteDiv = document.createElement('div');
        noteDiv.textContent = notes[i].content + ' - ' + formatDateString(notes[i].date);

        // Add buttons for editing and deleting
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function (index) {
            return function () {
                editNote(index);
            };
        }(i);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function (index) {
            return function () {
                deleteNote(index);
            };
        }(i);

        noteDiv.appendChild(editButton);
        noteDiv.appendChild(deleteButton);

        notesList.appendChild(noteDiv);
    }
}

function editNote(index) {
    var updatedNote = prompt('Edit your note:', notes[index].content);

    if (updatedNote !== null) {
        notes[index].content = updatedNote;
        displayNotes();
    }
}

function deleteNote(index) {
    var confirmDelete = confirm('Are you sure you want to delete this note?');

    if (confirmDelete) {
        notes.splice(index, 1);
        displayNotes();
    }
}

function searchNotes() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    var filteredNotes = notes.filter(function (note) {
        return note.content.toLowerCase().includes(searchInput);
    });

    displayFilteredNotes(filteredNotes);
}

function displayFilteredNotes(filteredNotes) {
    var notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    for (var i = 0; i < filteredNotes.length; i++) {
        var noteDiv = document.createElement('div');
        noteDiv.textContent = filteredNotes[i].content + ' - ' + formatDateString(filteredNotes[i].date);

        notesList.appendChild(noteDiv);
    }
}

function formatDateString(dateString) {
    var date = new Date(dateString);
    return date.toLocaleString(); // Format the date as a localized string
}

// Initial display of notes
displayNotes();
