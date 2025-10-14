document.addEventListener("DOMContentLoaded", () => {
  // === Floating Chat Button ===
  const chatButton = document.createElement("div");
  chatButton.id = "chatbot-button";
  chatButton.innerHTML = "💬";
  document.body.appendChild(chatButton);

  // === Chat Container ===
  const chatContainer = document.createElement("div");
  chatContainer.id = "chatbot-container";
  chatContainer.innerHTML = `
    <div class="chatbox">
      <div class="chatbox-header">
        <span>Chat with us 🤖</span>
        <button id="chatbox-close">×</button>
      </div>
      <div id="chatbox-messages" class="chatbox-messages"></div>
      <div class="chatbox-input-area">
        <input id="chatbox-input" type="text" placeholder="Type a message..." />
        <button id="chatbox-send">Send</button>
      </div>
    </div>
  `;
  document.body.appendChild(chatContainer);

  // === CSS ===
  const style = document.createElement("style");
  style.innerHTML = `
    /* 🌿 Floating Chat Button */
    #chatbot-button {
      position: fixed;
      bottom: 25px;
      right: 25px;
      background-color: #008060;
      color: white;
      font-size: 24px;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
      z-index: 9999;
    }
    #chatbot-button:hover {
      background-color: #006c4f;
      transform: scale(1.1);
    }

    /* 💬 Chat Window */
    #chatbot-container {
      position: fixed;
      bottom: 100px;
      right: 25px;
      width: 360px;
      max-width: 95vw;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 6px 25px rgba(0,0,0,0.3);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .chatbox-header {
      background-color: #008060;
      color: white;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      font-size: 15px;
    }

    .chatbox-header button {
      background: transparent;
      border: none;
      color: white;
      font-size: 22px;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .chatbox-header button:hover {
      transform: scale(1.1);
    }

    .chatbox-messages {
      height: 350px;
      overflow-y: auto;
      padding: 10px 12px;
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background-color: #fafafa;
      scroll-behavior: smooth;
    }

    .chatbox-input-area {
      display: flex;
      border-top: 1px solid #ddd;
      background: #fff;
    }

    .chatbox-input-area input {
      flex: 1;
      padding: 12px;
      border: none;
      outline: none;
      font-size: 14px;
      border-radius: 0 0 0 12px;
    }

    .chatbox-input-area button {
      background: #008060;
      color: white;
      border: none;
      padding: 12px 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 0 0 12px 0;
    }
    .chatbox-input-area button:hover {
      background: #006c4f;
    }

    /* 🗨️ Message Bubbles */
    .user-msg, .bot-msg {
      padding: 10px 14px;
      border-radius: 14px;
      max-width: 85%;
      word-wrap: break-word;
      line-height: 1.5;
      white-space: pre-wrap;
      animation: fadeInMsg 0.2s ease-in;
    }

    @keyframes fadeInMsg {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    .user-msg {
      background: #dcf8c6;
      align-self: flex-end;
      margin-left: auto;
    }

    .bot-msg {
      background: #f1f0f0;
      align-self: flex-start;
      margin-right: auto;
    }

    /* 🧠 Markdown Styles */
    .bot-msg b { font-weight: bold; }
    .bot-msg i { font-style: italic; }
    .bot-msg ul { margin-left: 18px; list-style: disc; }

    /* Typing Animation */
    .typing {
      display: inline-block;
      height: 16px;
      width: 4px;
      background: #999;
      animation: blink 1s infinite;
      margin-left: 3px;
    }
    @keyframes blink {
      0%, 50%, 100% { opacity: 1; }
      25%, 75% { opacity: 0; }
    }

    /* 📱 Responsive */
    @media (max-width: 600px) {
      #chatbot-container {
        right: 10px;
        bottom: 80px;
        width: 95vw;
      }
      #chatbot-button {
        bottom: 15px;
        right: 15px;
        width: 55px;
        height: 55px;
        font-size: 22px;
      }
    }
  `;
  document.head.appendChild(style);

  // === Toggle Chat Window ===
  chatButton.addEventListener("click", () => {
    chatContainer.style.display =
      chatContainer.style.display === "flex" ? "none" : "flex";
  });

  document.getElementById("chatbox-close").addEventListener("click", () => {
    chatContainer.style.display = "none";
  });

  // === Chat Functionality ===
  const input = document.getElementById("chatbox-input");
  const send = document.getElementById("chatbox-send");
  const messages = document.getElementById("chatbox-messages");

  const addMessage = (msg, type) => {
    const div = document.createElement("div");
    div.className = type === "user" ? "user-msg" : "bot-msg";
    div.innerHTML = msg; // Supports bold, italic, lists
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  };

  const showTyping = () => {
    const div = document.createElement("div");
    div.className = "bot-msg";
    div.innerHTML = `Typing<span class="typing"></span>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  };

  send.addEventListener("click", async () => {
    const userMsg = input.value.trim();
    if (!userMsg) return;
    addMessage(userMsg, "user");
    input.value = "";

    const typingDiv = showTyping();

    try {
      const res = await fetch("/apps/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      typingDiv.remove();
      addMessage(formatText(data.reply), "bot");
    } catch (err) {
      typingDiv.remove();
      addMessage("⚠️ Something went wrong. Please try again later.", "bot");
    }
  });

  // === Helper: Basic Markdown Support ===
  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold
      .replace(/\*(.*?)\*/g, "<i>$1</i>") // Italic
      .replace(/- (.*?)(\n|$)/g, "<ul><li>$1</li></ul>"); // Lists
  }
});
