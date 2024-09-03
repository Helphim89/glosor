let words = JSON.parse(localStorage.getItem('words')) || [];

function addWord() {
    const swedishWord = document.getElementById('swedish-word').value;
    const foreignWord = document.getElementById('foreign-word').value;
    if (swedishWord && foreignWord) {
        words.push({ swedish: swedishWord, foreign: foreignWord });
        localStorage.setItem('words', JSON.stringify(words));
        updateWordList();
        document.getElementById('swedish-word').value = '';
        document.getElementById('foreign-word').value = '';
    } else {
        alert('Fyll i både svenska ordet och ordet på annat språk.');
    }
}

function updateWordList() {
    const list = document.getElementById('word-list');
    list.innerHTML = '';
    words.forEach((word, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${word.swedish} - ${word.foreign}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Ta bort';
        deleteButton.onclick = () => {
            words.splice(index, 1);
            localStorage.setItem('words', JSON.stringify(words));
            updateWordList();
        };
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });
}

function clearWords() {
    words = [];
    localStorage.setItem('words', JSON.stringify(words));
    updateWordList();
}

function startPractice() {
    if (words.length === 0) {
        alert('Lägg till några ord först.');
        return;
    }
    window.location.href = 'practice.html';
}
