// practice.js
let currentWord;
let results = [];

window.onload = function() {
    loadNewWord();
}

function loadNewWord() {
    const words = JSON.parse(localStorage.getItem('words'));
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];

    // Dölja knappen för att spela upp översättningen tills användaren kontrollerar svaret
    document.getElementById('play-foreign').style.display = 'none';
    document.getElementById('foreign-translation').value = '';
    document.getElementById('feedback').textContent = '';
}

function checkAnswer() {
    const foreignInput = document.getElementById('foreign-translation').value;
    const correctForeign = currentWord.foreign;
    let result;

    if (foreignInput.toLowerCase() === correctForeign.toLowerCase()) {
        document.getElementById('feedback').textContent = 'Rätt!';
        document.getElementById('feedback').style.color = 'green';
        result = { foreign: foreignInput, correct: true };
    } else {
        document.getElementById('feedback').textContent = `Fel! Rätt svar är: ${correctForeign}`;
        document.getElementById('feedback').style.color = 'red';
        result = { foreign: foreignInput, correct: false };
    }

    results.push(result);
    updateResultsList();

    // Visa knappen för att spela upp översättningen
    document.getElementById('play-foreign').style.display = 'inline-block';

    setTimeout(loadNewWord, 3000); // Ladda ett nytt ord efter 3 sekunder
}

function updateResultsList() {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    results.forEach((result) => {
        const listItem = document.createElement('li');
        listItem.textContent = result.foreign;
        listItem.className = result.correct ? 'correct' : 'incorrect';
        resultsList.appendChild(listItem);
    });
}

function clearResults() {
    results = [];
    updateResultsList();
}

function playSwedishSound() {
    const speech = new SpeechSynthesisUtterance(currentWord.swedish);
    speech.lang = 'sv-SE';
    window.speechSynthesis.speak(speech);
}

function playForeignSound() {
    const speech = new SpeechSynthesisUtterance(currentWord.foreign);
    speech.lang = 'en-US';  // Byt till det språk som är aktuellt
    window.speechSynthesis.speak(speech);
}

function goBack() {
    window.location.href = 'index.html';
}
