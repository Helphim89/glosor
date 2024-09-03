// script.js
let words = [];

function addWord() {
    const swedishWord = document.getElementById('swedish-word').value;
    const foreignWord = document.getElementById('foreign-word').value;

    if (swedishWord && foreignWord) {
        words.push({ swedish: swedishWord, foreign: foreignWord });
        alert('Glosa tillagd!');
        document.getElementById('swedish-word').value = '';
        document.getElementById('foreign-word').value = '';
    } else {
        alert('Fyll i båda fälten.');
    }
}

function startPractice() {
    if (words.length === 0) {
        alert('Lägg till några glosor först.');
        return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    document.getElementById('word-to-translate').textContent = word.swedish;
    document.getElementById('feedback').textContent = '';
    document.getElementById('translation').value = '';
    document.getElementById('translation').focus();
}

function checkAnswer() {
    const wordToTranslate = document.getElementById('word-to-translate').textContent;
    const translation = document.getElementById('translation').value;
    
    const word = words.find(w => w.swedish === wordToTranslate);
    if (word && word.foreign.toLowerCase() === translation.toLowerCase()) {
        document.getElementById('feedback').textContent = 'Rätt!';
    } else {
        document.getElementById('feedback').textContent = `Fel! Rätt svar är: ${word.foreign}`;
    }
}
