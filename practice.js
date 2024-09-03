let currentWordIndex = 0;
let words = JSON.parse(localStorage.getItem('words')) || [];

function loadNewWord() {
    if (currentWordIndex < words.length) {
        document.getElementById('translation').value = '';
        document.getElementById('feedback').textContent = '';
        currentWordIndex++;
    } else {
        alert('Du har nått slutet av ordlistan.');
        goBack();
    }
}

function playSound() {
    if (currentWordIndex > 0) {
        const currentWord = words[currentWordIndex - 1];
        const speech = new SpeechSynthesisUtterance(currentWord.swedish);
        speech.lang = 'sv-SE';
        window.speechSynthesis.speak(speech);
    }
}

function checkAnswer() {
    if (currentWordIndex > 0) {
        const currentWord = words[currentWordIndex - 1];
        const userTranslation = document.getElementById('translation').value;
        if (userTranslation.toLowerCase() === currentWord.foreign.toLowerCase()) {
            document.getElementById('feedback').textContent = 'Rätt!';
            document.getElementById('feedback').style.color = 'green';
        } else {
            document.getElementById('feedback').textContent = `Fel! Rätt svar är: ${currentWord.foreign}`;
            document.getElementById('feedback').style.color = 'red';
        }
    }
}

function goBack() {
    window.location.href = 'index.html';
}

// Automatically load the first word when the page loads
window.onload = function() {
    if (words.length > 0) {
        loadNewWord();
    } else {
        alert('Det finns inga ord att öva på. Lägg till några ord först.');
        goBack();
    }
};
