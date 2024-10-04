
let currentWord;
let results = [];
let checkSwedish = false;

function loadNewWord() {
    const words = JSON.parse(localStorage.getItem('words'));
    if (!words || words.length === 0) {
        alert('Det finns inga glosor att öva på. Gå tillbaka och lägg till några glosor först.');
        return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];

    document.getElementById('foreign-translation').value = '';
    document.getElementById('swedish-translation').value = '';
    document.getElementById('feedback').textContent = '';
    playSwedishSound();
}

function playSwedishSound() {
    const speech = new SpeechSynthesisUtterance(currentWord.swedish);
    speech.lang = 'sv-SE';
    window.speechSynthesis.speak(speech);
}

function playForeignSound() {
    const selectedLanguage = document.getElementById('foreign-language').value || 'en-US';
    const speech = new SpeechSynthesisUtterance(currentWord.foreign);
    speech.lang = selectedLanguage;
    window.speechSynthesis.speak(speech);
}

function checkAnswer() {
    const foreignInput = document.getElementById('foreign-translation').value.trim();
    const correctForeign = currentWord.foreign;
    let result;

    if (checkSwedish) {
        const swedishInput = document.getElementById('swedish-translation').value.trim();
        const correctSwedish = currentWord.swedish;

        if (swedishInput.toLowerCase() !== correctSwedish.toLowerCase()) {
            document.getElementById('feedback').textContent = `Fel på svenska! Rätt svar är: ${correctSwedish}`;
            document.getElementById('feedback').style.color = 'red';
            result = { swedish: swedishInput, foreign: foreignInput, correct: false };
            results.push(result);
            updateResultsList();
            return;
        }
    }

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
    document.getElementById('play-foreign').style.display = 'inline-block';
}

function loadHistory() {
    const historyList = document.getElementById('history-list');
    const allWords = JSON.parse(localStorage.getItem('allWords')) || {};

    Object.keys(allWords).forEach(date => {
        const dateDiv = document.createElement('div');
        dateDiv.innerHTML = `<h3>${date}</h3>`;
        const wordList = document.createElement('ul');

        allWords[date].forEach(word => {
            const listItem = document.createElement('li');
            listItem.textContent = `${word.swedish} - ${word.foreign}`;
            wordList.appendChild(listItem);
        });

        dateDiv.appendChild(wordList);
        historyList.appendChild(dateDiv);
    });
}

function goBack() {
    window.location.href = 'index.html';
}

function toggleSwedishInput() {
    checkSwedish = document.getElementById('check-swedish').checked;
    document.getElementById('swedish-translation').style.display = checkSwedish ? 'inline-block' : 'none';
}

window.onload = function () {
    loadNewWord();
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }
};
