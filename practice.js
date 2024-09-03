let currentWordIndex = 0;
let words = JSON.parse(localStorage.getItem('words')) || [];

function loadNewWord() {
    if (currentWordIndex < words.length) {
        const currentWord = words[currentWordIndex];
        document.getElementById('foreign-translation').value = '';
        document.getElementById('swedish-translation').value = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('play-swedish').style.display = 'block';
    } else {
        alert('Du har nått slutet av ordlistan.');
        goBack();
    }
}

function toggleSwedish() {
    let includeSwedish = document.getElementById('include-swedish').checked;
    document.getElementById('swedish-translation').style.display = includeSwedish ? 'block' : 'none';
}

function playSwedishSound() {
    const currentWord = words[currentWordIndex];
    const speech = new SpeechSynthesisUtterance(currentWord.swedish);
    speech.lang = 'sv-SE';
    window.speechSynthesis.speak(speech);
}

function checkAnswer() {
    const currentWord = words[currentWordIndex];
    const userTranslation = document.getElementById('foreign-translation').value;
    const userSwedish = document.getElementById('swedish-translation').value;
    let correct = true;

    if (userTranslation.toLowerCase() !== currentWord.foreign.toLowerCase()) {
        correct = false;
    }

    if (document.getElementById('include-swedish').checked && userSwedish.toLowerCase() !== currentWord.swedish.toLowerCase()) {
        correct = false;
    }

    if (correct) {
        document.getElementById('feedback').textContent = 'Rätt!';
        document.getElementById('feedback').style.color = 'green';
    } else {
        document.getElementById('feedback').textContent = `Fel! Rätt svar är: ${currentWord.swedish} - ${currentWord.foreign}`;
        document.getElementById('feedback').style.color = 'red';
    }

    currentWordIndex++;
}

function goBack() {
    window.location.href = 'index.html';
}
