// script.js
let words = JSON.parse(localStorage.getItem('words')) || [];

function addWord() {
    const swedishWord = document.getElementById('swedish-word').value;
    const foreignWord = document.getElementById('foreign-word').value;

    if (swedishWord && foreignWord) {
        words.push({ swedish: swedishWord, foreign: foreignWord });
        updateWordList();
        saveWords();
        document.getElementById('swedish-word').value = '';
        document.getElementById('foreign-word').value = '';
    } else {
        alert('Fyll i båda fälten.');
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addWord();
    }
}

function updateWordList() {
    const wordList = document.getElementById('word-list');
    wordList.innerHTML = '';

    words.forEach((word, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${word.swedish} - ${word.foreign}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Ta bort';
        deleteButton.onclick = () => removeWord(index);
        listItem.appendChild(deleteButton);
        wordList.appendChild(listItem);
    });
}

function removeWord(index) {
    words.splice(index, 1);
    updateWordList();
    saveWords();
}

function clearWords() {
    words = [];
    updateWordList();
    saveWords();
}

function startPractice() {
    if (words.length === 0) {
        alert('Lägg till några glosor först.');
        return;
    }
    localStorage.setItem('words', JSON.stringify(words));
    window.location.href = 'practice.html';
}

function saveWords() {
    localStorage.setItem('words', JSON.stringify(words));
}

// Add event listeners for input fields
document.getElementById('swedish-word').addEventListener('keydown', handleKeyPress);
document.getElementById('foreign-word').addEventListener('keydown', handleKeyPress);

// Update list when page loads
updateWordList();
