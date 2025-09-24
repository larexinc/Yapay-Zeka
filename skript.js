// Basit tarayıcı içi sohbet simülasyonu
let currentChannel = 'genel';
const channels = {
  genel: [],
  oyun: [],
  muzik: []
};

function changeChannel(channel) {
  currentChannel = channel;
  document.getElementById('currentChannel').textContent = channel;
  document.querySelectorAll('.channels li').forEach(li => li.classList.remove('active'));
  event.target.classList.add('active');
  renderMessages();
}

function sendMsg() {
  const input = document.getElementById('msgInput');
  const text = input.value.trim();
  if (!text) return;
  channels[currentChannel].push({ user: 'Sen', text });
  input.value = '';
  renderMessages();
}

function renderMessages() {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';
  channels[currentChannel].forEach(m => {
    const div = document.createElement('div');
    div.className = 'msg';
    div.innerHTML = `<span class="user">${m.user}:</span> ${m.text}`;
    messagesDiv.appendChild(div);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

renderMessages();
