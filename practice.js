// practice.js
let currentWord;
let currentLanguage;

window.onload = function() {
    loadNewWord();
}

function loadNewWord() {
    const words = JSON.parse(sessionStorage.getItem('words'));
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];

    // Slumpa om svenska eller engelska ska visas
    currentLanguage = Math.random() < 0.5 ? 'swedish' : 'foreign';
    const wordToTranslate = currentLanguage === 'swedish' ? currentWord.swedish : currentWord.foreign;

    document.getElementById('word-to-translate').textContent = wordToTranslate;
    document.getElementById('translation').value = '';
    document.getElementById('feedback').textContent = '';
}

function checkAnswer() {
    const translation = document.getElementById('translation').value;
    const correctTranslation = currentLanguage === 'swedish' ? currentWord.foreign : currentWord.swedish;

    if (correctTranslation.toLowerCase() === translation.toLowerCase()) {
        document.getElementById('feedback').textContent = 'Rätt!';
        document.getElementById('feedback').style.color = 'green';
    } else {
        document.getElementById('feedback').textContent = `Fel! Rätt svar är: ${correctTranslation}`;
        document.getElementById('feedback').style.color = 'red';
    }

    setTimeout(loadNewWord, 1500); // Ladda ett nytt ord efter 1,5 sekunder
}

function playSound() {
    const wordToTranslate = currentLanguage === 'swedish' ? currentWord.swedish : currentWord.foreign;

    const speech = new SpeechSynthesisUtterance(wordToTranslate);
    speech.lang = currentLanguage === 'swedish' ? 'sv-SE' : 'en-US';
    window.speechSynthesis.speak(speech);
}

function goBack() {
    window.location.href = 'index.html';
}
