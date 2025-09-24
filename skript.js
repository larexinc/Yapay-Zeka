
const quoteElement = document.getElementById('quote');
const inputText = document.getElementById('inputText');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');

let startTime;
let timerInterval;
let isTyping = false;

const quotes = [
    "Hızlı yazma becerisi bilgisayar kullanımında büyük bir avantaj sağlar.",
    "Doğru parmak yerleşimi yazma hızını etkiler.",
    "Düzenli pratik yapmak hızınızı artırır.",
    "Yazma hızınızı ölçmek gelişiminizi takip etmenize yardımcı olur."
];

function startTest() {
    if (!isTyping) {
        isTyping = true;
        startTime = new Date();
        startTimer();
        quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }

    const typedText = inputText.value;
    const originalText = quoteElement.textContent;

    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === originalText[i]) {
            correctChars++;
        }
    }

    const accuracy = typedText.length ? Math.round((correctChars / typedText.length) * 100) : 0;
    accuracyElement.textContent = `Doğruluk: ${accuracy}%`;

    if (typedText === originalText) {
        clearInterval(timerInterval);
        const elapsedTime = (new Date() - startTime) / 1000 / 60; // dakika
        const wordsTyped = typedText.split(' ').length;
        const wpm = Math.round(wordsTyped / elapsedTime);
        wpmElement.textContent = `WPM: ${wpm}`;
    }
}

function startTimer() {
    let seconds = 0;
    let minutes = 0;

    timerInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        timerElement.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    }, 1000);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function resetTest() {
    clearInterval(timerInterval);
    isTyping = false;
    inputText.value = '';
    timerElement.textContent = '00:00';
    wpmElement.textContent = 'WPM: 0';
    accuracyElement.textContent = 'Doğruluk: 0%';
    quoteElement.textContent = "Başlamak için metni yazın...";
}
