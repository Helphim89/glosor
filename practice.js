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

    document.getElementById('word-to-translate').textContent = currentWord.swedish;
    document.getElementById('swedish-translation').value = '';
    document.getElementById('foreign-translation').value = '';
    document.getElementById('feedback').textContent = '';
}

function checkAnswer() {
    const swedishInput = document.getElementById('swedish-translation').value;
    const foreignInput = document.getElementById('foreign-translation').value;

    const correctSwedish = currentWord.swedish;
    const correctForeign = currentWord.foreign;
    let result;

    if (swedishInput.toLowerCase() === correctSwedish.toLowerCase() && foreignInput.toLowerCase() === correctForeign.toLowerCase()) {
        document.getElementById('feedback').textContent = 'Rätt på båda språken!';
        document.getElementById('feedback').style.color = 'green';
        result = { swedish: swedishInput, foreign: foreignInput, correct: true };
    } else {
        document.getElementById('feedback').textContent = `Fel! Rätt svar är: ${correctSwedish} - ${correctForeign}`;
        document.getElementById('feedback').style.color = 'red';
        result = { swedish: swedishInput, foreign: foreignInput, correct: false };
    }

    results.push(result);
    updateResultsList();

    setTimeout(loadNewWord, 1500); // Ladda ett nytt ord efter 1,5 sekunder
}

function updateResultsList() {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    results.forEach((result) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${result.swedish} - ${result.foreign}`;
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

function goBack() {
    window.location.href = 'index.html';
}
