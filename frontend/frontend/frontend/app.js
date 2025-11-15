const API_URL = "https://gp4-to-v1-api.onrender.com/chat";

const chat = document.getElementById("chat");
const promptInput = document.getElementById("prompt");

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = "msg " + sender;

    if (text.includes("```")) {
        const clean = text.replace(/```/g, "");
        div.innerHTML = `<pre><code>${clean}</code></pre>`;
    } else {
        div.innerText = text;
    }

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
    const userText = promptInput.value.trim();
    if (!userText) return;

    addMessage(userText, "user");
    promptInput.value = "";

    addMessage("GP4_TO_V1 écrit…", "bot");

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
    });

    const data = await res.json();
    chat.lastChild.innerText = data.reply;
}

document.getElementById("send").onclick = sendMessage;
promptInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});
