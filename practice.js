// practice.js
window.onload = function() {
    const word = JSON.parse(sessionStorage.getItem('currentWord'));
    document.getElementById('word-to-translate').textContent = word.swedish;
}

function checkAnswer() {
    const word = JSON.parse(sessionStorage.getItem('currentWord'));
    const translation = document.getElementById('translation').value;

    if (word.foreign.toLowerCase() === translation.toLowerCase()) {
        document.getElementById('feedback').textContent = 'Rätt!';
        document.getElementById('feedback').style.color = 'green';
    } else {
        document.getElementById('feedback').textContent = `Fel! Rätt svar är: ${word.foreign}`;
        document.getElementById('feedback').style.color = 'red';
    }
}

function goBack() {
    window.location.href = 'index.html';
}
