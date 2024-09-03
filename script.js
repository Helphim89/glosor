// script.js
let words = [];

function addWord() {
    const swedishWord = document.getElementById('swedish-word').value;
    const foreignWord = document.getElementById('foreign-word').value;

    if (swedishWord && foreignWord) {
        words.push({ swedish: swedishWord, foreign: foreignWord });
        updateWordList();
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
}

function clearWords() {
    words = [];
    updateWordList();
}

function startPractice() {
    if (words.length === 0) {
        alert('Lägg till några glosor först.');
        return;
    }
    sessionStorage.setItem('words', JSON.stringify(words));
    window.location.href = 'practice.html';
}

// Lägg till eventlyssnare för inmatningsfälten
document.getElementById('swedish-word').addEventListener('keydown', handleKeyPress);
document.getElementById('foreign-word').addEventListener('keydown', handleKeyPress);
