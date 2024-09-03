let words = JSON.parse(localStorage.getItem('words')) || [];

function addWord() {
    const swedishWord = document.getElementById('swedish-word').value.trim();
    const foreignWord = document.getElementById('foreign-word').value.trim();

    // Validera att båda fälten är ifyllda och inte bara blanksteg
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
    const swedishList = document.getElementById('swedish-word-list');
    const foreignList = document.getElementById('foreign-word-list');
    swedishList.innerHTML = '';
    foreignList.innerHTML = '';

    words.forEach((word, index) => {
        const swedishListItem = document.createElement('li');
        swedishListItem.textContent = word.swedish;

        const foreignListItem = document.createElement('li');
        foreignListItem.textContent = word.foreign;

        // Lägg till ta bort-knappar
        const deleteButtonSwedish = document.createElement('button');
        deleteButtonSwedish.textContent = 'Ta bort';
        deleteButtonSwedish.onclick = () => {
            words.splice(index, 1);
            localStorage.setItem('words', JSON.stringify(words));
            updateWordList();
        };

        const deleteButtonForeign = document.createElement('button');
        deleteButtonForeign.textContent = 'Ta bort';
        deleteButtonForeign.onclick = () => {
            words.splice(index, 1);
            localStorage.setItem('words', JSON.stringify(words));
            updateWordList();
        };

        // Lägg till ta bort-knappar till båda kolumnerna
        swedishListItem.appendChild(deleteButtonSwedish);
        foreignListItem.appendChild(deleteButtonForeign);

        swedishList.appendChild(swedishListItem);
        foreignList.appendChild(foreignListItem);
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

// Initialisera ordlistan vid sidladdning
window.onload = updateWordList;
