// Store API key and get DOM elements
const API_KEY = "df8a69f5739b738a3e38cecea139c64ccf8b6a3e31ab25936b6c94156807e2c2"; // Replace with your Together AI API key
const MODEL = "meta-llama/Llama-3.3-70B-Instruct-Turbo"; // Choose your model
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatIcon = document.getElementById("chat-icon");
const widgetContainer = document.getElementById("widget-container");
const minimizeButton = document.getElementById("minimize-button");
const closeButton = document.getElementById("close-button");

// Chat widget state
let isChatOpen = false;
let conversationHistory = []; 

// Initialize with a system message to define the Virtual Labs assistant's behavior
const systemMessage = {
    role: "system", 
    content: "You are the Virtual Labs Engineering Assistant, designed to help engineering students with virtual laboratory experiments. You can assist with experiment procedures, troubleshoot issues, explain engineering concepts, help with calculations, and provide guidance on lab reports. You're knowledgeable about engineering disciplines including electrical, mechanical, computer science, chemical, and civil engineering experiments. Keep responses clear, educational, and helpful for students conducting virtual lab experiments."
};

function initChat() {
    // Add system message to conversation history
    conversationHistory.push(systemMessage);
    
    chatIcon.classList.add("pulse");
    chatIcon.addEventListener("click", toggleChat);
    minimizeButton.addEventListener("click", closeChat);
    closeButton.addEventListener("click", closeChat);
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
}

function toggleChat() {
    if (isChatOpen) {
        closeChat();
    } else {
        openChat();
    }
}

function openChat() {
    widgetContainer.classList.add("active");
    chatIcon.style.display = "none";
    isChatOpen = true;
    setTimeout(() => userInput.focus(), 300);
    chatIcon.classList.remove("pulse");
    
    // If this is the first time opening, show welcome message
    if (chatBox.childElementCount === 0) {
        appendAssistantMessage("Welcome to Virtual Labs! I'm your engineering lab assistant. How can I help you with your experiments today?");
    }
}

function closeChat() {
    widgetContainer.classList.remove("active");
    chatIcon.style.display = "flex";
    isChatOpen = false;
}

async function sendMessage() {
    let message = userInput.value.trim();
    if (message === "") return;
    appendUserMessage(message);
    userInput.value = "";
    showTypingIndicator();

    try {
        const botReply = await fetchTogetherAIResponse(message);
        removeTypingIndicator();
        appendAssistantMessage(botReply);
    } catch (error) {
        console.error("Error:", error);
        removeTypingIndicator();
        appendAssistantMessage("Sorry, I encountered an error processing your question. Please try again or refresh the page if the issue persists.");
    }
}

async function fetchTogetherAIResponse(userMessage) {
    // Add the user message to conversation history
    conversationHistory.push({ role: "user", content: userMessage });
    
    const url = "https://api.together.xyz/v1/chat/completions";

    const payload = {
        model: MODEL,
        messages: conversationHistory,
        max_tokens: 800,
        temperature: 0.7,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            const assistantMessage = data.choices[0].message.content.trim();
            // Add the assistant's response to conversation history
            conversationHistory.push({ role: "assistant", content: assistantMessage });
            return assistantMessage;
        } else {
            return "I'm not sure how to respond to that engineering question. Could you please rephrase?";
        }
    } catch (error) {
        console.error("Error fetching Together AI response:", error);
        return "Sorry, I encountered a technical issue. Please try again later.";
    }
}

function appendUserMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "user-message";
    messageDiv.innerHTML = `<div class="message-content"><div class="message-sender">Student</div><div class="message-text">${text}</div></div><div class="user-avatar"><i class="fas fa-user-graduate"></i></div>`;
    chatBox.appendChild(messageDiv);
    scrollToBottom();
}

function appendAssistantMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "assistant-message";
    // Process text to format code examples or equations
    const formattedText = formatLabContent(text);
    messageDiv.innerHTML = `<div class="assistant-avatar"><i class="fas fa-microscope"></i></div><div class="message-content"><div class="message-sender">Virtual Lab Assistant</div><div class="message-text">${formattedText}</div></div>`;
    chatBox.appendChild(messageDiv);
    scrollToBottom();
}

// Helper function to format lab content - detecting code blocks and equations
function formatLabContent(text) {
    // Convert markdown code blocks to HTML
    text = text.replace(/```(\w*)([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>');
    
    // Convert inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Handle line breaks
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

function showTypingIndicator() {
    const indicatorDiv = document.createElement("div");
    indicatorDiv.className = "assistant-message typing-indicator-container";
    indicatorDiv.id = "typing-indicator";
    indicatorDiv.innerHTML = `<div class="assistant-avatar"><i class="fas fa-microscope"></i></div><div class="message-content"><div class="message-sender">Virtual Lab Assistant</div><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>`;
    chatBox.appendChild(indicatorDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
        chatBox.removeChild(indicator);
    }
}

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to reset conversation history
function resetConversation() {
    conversationHistory = [systemMessage]; // Keep the system message
    while (chatBox.firstChild) {
        chatBox.removeChild(chatBox.firstChild);
    }
    appendAssistantMessage("I've reset our conversation. How can I help with your lab experiments?");
}

// Add a reset button
function addResetButton() {
    const resetButton = document.createElement("button");
    resetButton.id = "reset-button";
    resetButton.className = "control-button";
    resetButton.innerHTML = '<i class="fas fa-trash"></i>';
    resetButton.title = "Clear conversation";
    document.querySelector(".chat-controls").prepend(resetButton);
    resetButton.addEventListener("click", resetConversation);
}

document.addEventListener("DOMContentLoaded", () => {
    initChat();
    addResetButton();
    
    // Optional: Add suggestion buttons for common questions
    addSuggestionButtons();
});

// Function to add suggestion buttons
function addSuggestionButtons() {
    const suggestionArea = document.createElement("div");
    suggestionArea.className = "suggestion-buttons";
    suggestionArea.innerHTML = `
        <div class="suggestion-label">Common Questions:</div>
        <button class="suggestion-btn" onclick="askSuggestion('How do I start the circuit simulation?')">Circuit Simulation Help</button>
        <button class="suggestion-btn" onclick="askSuggestion('How do I analyze my experimental data?')">Data Analysis Tips</button>
        <button class="suggestion-btn" onclick="askSuggestion('What should I include in my lab report?')">Lab Report Guide</button>
    `;
    
    document.querySelector(".chat-input-area").before(suggestionArea);
}

// Function to ask a suggestion question
function askSuggestion(question) {
    userInput.value = question;
    sendMessage();
}