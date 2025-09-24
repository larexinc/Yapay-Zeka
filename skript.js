const auth = firebase.auth();
const db = firebase.firestore();

let currentServer = null;
let currentUser = null;
let nitroActive = false;

// Anonim giriş ve kullanıcı adı alma
const name = prompt("Kullanıcı adınız:");
auth.signInAnonymously().then(() => {
  currentUser = name || "Misafir";
  document.getElementById("userName").textContent = currentUser;
});

// Sunucu oluştur
document.getElementById("newServerBtn").addEventListener("click", async () => {
  const serverName = prompt("Sunucu ismi:");
  if (!serverName) return;
  await db.collection("servers").add({ name: serverName });
});

// Sunucuları listele
db.collection("servers").onSnapshot(snapshot => {
  const listDiv = document.getElementById("serverList");
  listDiv.innerHTML = "";
  snapshot.forEach(doc => {
    const btn = document.createElement("button");
    btn.textContent = doc.data().name;
    btn.onclick = () => joinServer(doc.id, doc.data().name);
    listDiv.appendChild(btn);
  });
});

// Sunucuya katıl
function joinServer(id, name) {
  currentServer = id;
  document.getElementById("currentServer").textContent = name;
  loadMessages();
}

// Mesaj gönder
document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("msgInput");
  const text = input.value.trim();
  if (!text || !currentServer) return;
  await db.collection("servers").doc(currentServer)
          .collection("messages")
          .add({
            user: currentUser,
            text,
            nitro: nitroActive,
            created: firebase.firestore.FieldValue.serverTimestamp()
          });
  input.value = "";
});

// Mesajları yükle
function loadMessages() {
  const msgDiv = document.getElementById("messages");
  db.collection("servers").doc(currentServer)
    .collection("messages")
    .orderBy("created")
    .onSnapshot(snap => {
      msgDiv.innerHTML = "";
      snap.forEach(doc => {
        const m = doc.data();
        const div = document.createElement("div");
        div.className = "msg";
        div.innerHTML = `<span class="user ${m.nitro ? 'nitro':''}">${m.user}:</span> ${m.text}`;
        msgDiv.appendChild(div);
      });
      msgDiv.scrollTop = msgDiv.scrollHeight;
    });
}

// Nitro kodu
document.getElementById("nitroBtn").addEventListener("click", () => {
  const code = document.getElementById("nitroCode").value.trim();
  if (code === "Voldemort") {
    nitroActive = true;
    alert("🎉 Nitro aktif!");
  } else {
    alert("Kod yanlış!");
  }
});
