let currentWordIndex = 0;
let words = JSON.parse(localStorage.getItem('words')) || [];
let practiceSwedish = false;

function loadNewWord() {
    if (currentWordIndex < words.length) {
        document.getElementById('translation').value = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('sound-button-container').innerHTML = ''; // Clear sound button
        currentWordIndex++;
        updateSoundButtons();
    } else {
        alert('Du har nått slutet av ordlistan.');
        goBack();
    }
}

function playSwedishSound() {
    if (currentWordIndex > 0) {
        const currentWord = words[currentWordIndex - 1];
        const speech = new SpeechSynthesisUtterance(currentWord.swedish);
        speech.lang = 'sv-SE';
        window.speechSynthesis.speak(speech);
    }
}

function playForeignSound() {
    if (currentWordIndex > 0) {
        const currentWord = words[currentWordIndex - 1];
        const speech = new SpeechSynthesisUtterance(currentWord.foreign);
        // Adjust the language code based on the foreign word's language
        speech.lang = 'en-US'; // Example for English
        window.speechSynthesis.speak(speech);
    }
}

function checkAnswer() {
    if (currentWordIndex > 0) {
        const currentWord = words[currentWordIndex - 1];
        const userTranslation = document.getElementById('translation').value;
        const correctAnswer = practiceSwedish ? currentWord.swedish : currentWord.foreign;
        if (userTranslation.toLowerCase() === correctAnswer.toLowerCase()) {
            document.getElementById('feedback').textContent = 'Rätt!';
            document.getElementById('feedback').style.color = 'green';
            showSoundButton(true);
        } else {
            document.getElementById('feedback').textContent = `Fel! Rätt svar är: ${correctAnswer}`;
            document.getElementById('feedback').style.color = 'red';
            showSoundButton(false);
        }
    }
}

function goBack() {
    window.location.href = 'index.html';
}

function toggleLanguagePractice() {
    practiceSwedish = document.getElementById('toggle-language').checked;
    updateSoundButtons();
}

function updateSoundButtons() {
    document.getElementById('play-swedish-sound').style.display = practiceSwedish ? 'none' : 'inline-block';
}

function showSoundButton(isCorrect) {
    const soundButtonContainer = document.getElementById('sound-button-container');
    soundButtonContainer.innerHTML = ''; // Clear any existing button

    const button = document.createElement('button');
    if (isCorrect) {
        button.textContent = 'Lyssna på ordet';
        button.onclick = practiceSwedish ? playForeignSound : playSwedishSound;
    } else {
        button.textContent = 'Lyssna på rätt ord';
        button.onclick = practiceSwedish ? playSwedishSound : playForeignSound;
    }

    soundButtonContainer.appendChild(button);
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
