(function () {
    const api_url = "http://localhost:3000/api/chat";
    const scriptTag = document.currentScript;
    const ownerId = scriptTag.getAttribute("data-owner-id") || "default-id";

    // Inject CSS for animations and scrollbar
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes chat-fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-subtle { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        #shaya-message-area::-webkit-scrollbar { width: 5px; }
        #shaya-message-area::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
    `;
    document.head.appendChild(style);

    // 1. Create the Floating Button
    const button = document.createElement("div");
    button.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: -2px;">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    `;

    Object.assign(button.style, {
        position: "fixed", bottom: "30px", right: "30px",
        width: "64px", height: "64px", borderRadius: "32px",
        backgroundColor: "#2563eb", color: "#fff", display: "flex",
        justifyContent: "center", alignItems: "center", cursor: "pointer",
        zIndex: "999999", boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: "pulse-subtle 3s infinite ease-in-out"
    });
    button.onmouseover = () => button.style.transform = "scale(1.1) rotate(5deg)";
    button.onmouseout = () => button.style.transform = "scale(1) rotate(0deg)";
    document.body.appendChild(button);

    // 2. Create the Chat Window
    const box = document.createElement("div");
    Object.assign(box.style, {
        position: "fixed", bottom: "110px", right: "30px",
        width: "380px", height: "600px", maxHeight: "80vh",
        backgroundColor: "white", borderRadius: "24px",
        display: "none", flexDirection: "column", zIndex: "999999",
        overflow: "hidden", boxShadow: "0 20px 50px -12px rgba(0,0,0,0.15)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        border: "1px solid rgba(0,0,0,0.05)",
        animation: "chat-fade-in 0.4s ease-out"
    });

    box.innerHTML = `
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 25px 20px; position: relative;">
            <div style="font-size: 18px; font-weight: 700; letter-spacing: -0.5px;">Assistant AI</div>
            <div style="font-size: 12px; opacity: 0.8; margin-top: 4px; display: flex; items-center gap: 5px;">
                <span style="width: 8px; height: 8px; background: #4ade80; border-radius: 50%; display: inline-block;"></span>
                Online and ready to help
            </div>
            <span id="chat-close" style="position: absolute; top: 20px; right: 20px; cursor: pointer; opacity: 0.7; hover:opacity: 1; font-size: 20px;">✕</span>
        </div>
        <div id="shaya-message-area" style="flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: #ffffff;"></div>
        <div style="padding: 15px 20px; border-top: 1px solid #f4f4f5; display: flex; gap: 10px; background: white; align-items: center;">
            <input id="chat-input" type="text" placeholder="Ask a question..." style="flex: 1; padding: 12px 16px; border: 1px solid #e4e4e7; border-radius: 12px; outline: none; font-size: 14px; transition: border 0.2s;">
            <button id="chat-send" style="padding: 12px; background: #2563eb; color: white; border: none; border-radius: 12px; cursor: pointer; display: flex; items-center justify-center; transition: background 0.2s;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </div>
        <div style="text-align: center; font-size: 10px; color: #a1a1aa; padding-bottom: 10px; background: white;">Powered by SHAYA.AI</div>
    `;
    document.body.appendChild(box);

    const input = box.querySelector("#chat-input");
    const sendBtn = box.querySelector("#chat-send");
    const messageArea = box.querySelector("#shaya-message-area");
    const closeBtn = box.querySelector("#chat-close");

    button.onclick = () => {
        const isHidden = box.style.display === "none";
        box.style.display = isHidden ? "flex" : "none";
        if (isHidden) input.focus();
    };
    closeBtn.onclick = () => box.style.display = "none";

    function addMessage(text, from) {
        const bubble = document.createElement("div");
        bubble.innerText = text;
        Object.assign(bubble.style, {
            maxWidth: "85%", padding: "12px 16px", borderRadius: from === "user" ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
            fontSize: "14px", lineHeight: "1.5",
            alignSelf: from === "user" ? "flex-end" : "flex-start",
            background: from === "user" ? "#2563eb" : "#f4f4f5",
            color: from === "user" ? "#fff" : "#18181b",
            boxShadow: from === "user" ? "0 4px 15px -5px rgba(37, 99, 235, 0.3)" : "none",
        });
        messageArea.appendChild(bubble);
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    async function handleSend() {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, "user");
        input.value = "";

        const typing = document.createElement("div");
        typing.innerHTML = `<span style="display:flex; gap:3px;"><span style="animation: pulse-subtle 1s infinite;">•</span><span style="animation: pulse-subtle 1s infinite 0.2s;">•</span><span style="animation: pulse-subtle 1s infinite 0.4s;">•</span></span>`;
        typing.style.padding = "10px";
        messageArea.appendChild(typing);

        try {
            const response = await fetch(api_url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ownerId, message: text })
            });
            const data = await response.json();
            messageArea.removeChild(typing);
            addMessage(data.response || "I'm sorry, I couldn't process that.", "ai");
        } catch (error) {
            messageArea.removeChild(typing);
            addMessage("Error connecting to server.", "ai");
        }
    }

    sendBtn.onclick = handleSend;
    input.onkeypress = (e) => { if (e.key === "Enter") handleSend(); };
    input.onfocus = () => input.style.borderColor = "#2563eb";
    input.onblur = () => input.style.borderColor = "#e4e4e7";
})();