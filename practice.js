let currentWordIndex = 0;
let words = JSON.parse(localStorage.getItem('words')) || [];
let practiceSwedish = false;

function loadNewWord() {
    if (currentWordIndex < words.length) {
        document.getElementById('translation').value = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('sound-button-container').innerHTML = ''; // Rensa ljudknappen
        currentWordIndex++;
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
        // Justera språkkoden beroende på vilket språk som används
        speech.lang = 'en-US'; // Exempel för engelska
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
        } else {
            document.getElementById('feedback').textContent = `Fel! Rätt svar är: ${correctAnswer}`;
            document.getElementById('feedback').style.color = 'red';
        }
        showSoundButton(); // Visa alltid rätt ord oavsett om svaret var rätt eller fel
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
    // Båda knapparna ska alltid vara synliga, ingen gömning behövs
}

function showSoundButton() {
    const soundButtonContainer = document.getElementById('sound-button-container');
    soundButtonContainer.innerHTML = ''; // Rensa eventuella existerande knappar

    const button = document.createElement('button');
    button.textContent = 'Lyssna på rätt ord';

    // Spela upp rätt ord beroende på vilken språkövning som valts
    button.onclick = practiceSwedish ? playSwedishSound : playForeignSound;

    soundButtonContainer.appendChild(button);
}

// Ladda automatiskt det första ordet när sidan laddas
window.onload = function() {
    if (words.length > 0) {
        loadNewWord();
    } else {
        alert('Det finns inga ord att öva på. Lägg till några ord först.');
        goBack();
    }
};
