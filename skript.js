const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const messagesDiv = document.getElementById('messages');

sendBtn.addEventListener('click', async () => {
    const text = userInput.value;
    if (!text) return;

    addMessage('You', text);
    userInput.value = '';

    const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    addMessage('AI', data.reply);
});

function addMessage(user, text) {
    const msgDiv = document.createElement('div');
    msgDiv.innerHTML = `<b>${user}:</b> ${text}`;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
