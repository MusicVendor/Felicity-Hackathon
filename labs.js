// Store API key and get DOM elements
const API_KEY = "AIzaSyBGNMCcgP1lT8CKofF7wPU8_3CpBLz-HE0"; // Replace with your actual API Key
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatIcon = document.getElementById("chat-icon");
const widgetContainer = document.getElementById("widget-container");
const minimizeButton = document.getElementById("minimize-button");
const closeButton = document.getElementById("close-button");

// Chat widget state
let isChatOpen = false;

/**
 * Initializes the chat application
 */
function initChat() {
    // Add pulse animation to chat icon
    chatIcon.classList.add("pulse");
    
    // Add event listeners for chat controls
    chatIcon.addEventListener("click", toggleChat);
    minimizeButton.addEventListener("click", closeChat);
    closeButton.addEventListener("click", closeChat);
    
    // Add chat functionality event listeners
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
}

/**
 * Toggles the chat widget open/closed
 */
function toggleChat() {
    if (isChatOpen) {
        closeChat();
    } else {
        openChat();
    }
}

/**
 * Opens the chat widget
 */
function openChat() {
    widgetContainer.classList.add("active");
    chatIcon.style.display = "none";
    isChatOpen = true;
    
    // Focus the input field
    setTimeout(() => {
        userInput.focus();
    }, 300);
    
    // Remove pulse animation
    chatIcon.classList.remove("pulse");
}

/**
 * Closes the chat widget
 */
function closeChat() {
    widgetContainer.classList.remove("active");
    chatIcon.style.display = "flex";
    isChatOpen = false;
}

/**
 * Sends the user's message to the API and displays the response
 */
async function sendMessage() {
    // Get and validate user input
    let message = userInput.value.trim();
    if (message === "") return;
    
    // Display the user's message in the chat box
    appendUserMessage(message);
    
    // Clear the input field after sending
    userInput.value = "";
    
    try {
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate API request (for demo purposes)
        // In production, this would be a real API call
        setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // For demo purposes, return lab-related responses
            const botReply = generateLabResponse(message);
            appendAssistantMessage(botReply);
        }, 1500);
        
    } catch (error) {
        // Log the full error to console for debugging
        console.error("Error:", error);
        
        // Remove typing indicator if it exists
        removeTypingIndicator();
        
        // Display a user-friendly error message in the chat
        appendAssistantMessage(`Sorry, I encountered an error: ${error.message || "Unable to fetch response"}`);
    }
}

/**
 * Generate simple lab-related responses (for demo)
 * In a real implementation, this would be replaced with an actual API call
 */
function generateLabResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes("data structure") || message.includes("data structures")) {
        return "Our Data Structures lab offers interactive experiments on arrays, linked lists, trees, graphs, and various sorting algorithms. Would you like me to help you with a specific concept?";
    } else if (message.includes("machine learning")) {
        return "The Machine Learning lab provides interactive experiments on classification, regression, clustering, and neural networks. Which topic are you interested in exploring?";
    } else if (message.includes("electronics") || message.includes("digital") || message.includes("analog")) {
        return "We have both Digital and Analog Electronics labs. Digital covers logic gates, flip-flops, and digital circuits, while Analog covers op-amps, oscillators, and filter design. Which specific experiment would you like to learn about?";
    } else if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
        return "Hello! I'm your Virtual Lab Assistant. I can help you with experiments in Data Structures, Machine Learning, Digital Electronics, and Analog Electronics. What would you like to explore today?";
    } else {
        return "I can assist you with our Virtual Labs in Data Structures, Machine Learning, Digital Electronics, and Analog Electronics. Please let me know which subject you're interested in or ask a specific question about any experiment.";
    }
}

/**
 * Adds a user message to the chat box
 * @param {string} text - The message content
 */
function appendUserMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "user-message";
    
    // Format the message with markdown-like syntax
    text = formatText(text);
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-sender">You</div>
            <div class="message-text">${text}</div>
        </div>
        <div class="user-avatar">
            <i class="fas fa-user"></i>
        </div>
    `;
    
    chatBox.appendChild(messageDiv);
    scrollToBottom();
}

/**
 * Adds an assistant message to the chat box
 * @param {string} text - The message content
 */
function appendAssistantMessage(text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "assistant-message";
    
    // Format the message with markdown-like syntax and code blocks
    text = formatText(text);
    
    messageDiv.innerHTML = `
        <div class="assistant-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="message-sender">Virtual Lab Assistant</div>
            <div class="message-text">${text}</div>
        </div>
    `;
    
    chatBox.appendChild(messageDiv);
    scrollToBottom();
}

/**
 * Formats text with markdown-like syntax and code blocks
 * @param {string} text - The raw text to format
 * @returns {string} - The formatted HTML
 */
function formatText(text) {
    // Replace code blocks with styled divs
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, language, code) {
        language = language || 'plaintext';
        return `
            <div class="code-block-header">
                <span>${language}</span>
            </div>
            <div class="code-block">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        `;
    });
    
    // Format inline code
    text = text.replace(/`([^`]+)`/g, '<code style="background:#f0f0f0;padding:2px 4px;border-radius:3px;font-family:monospace;">$1</code>');
    
    // Format bold text
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Format italic text
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Convert line breaks to <br> tags
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

/**
 * Shows a typing indicator to indicate the assistant is working
 */
function showTypingIndicator() {
    const indicatorDiv = document.createElement("div");
    indicatorDiv.className = "assistant-message typing-indicator-container";
    indicatorDiv.id = "typing-indicator";
    
    indicatorDiv.innerHTML = `
        <div class="assistant-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="message-sender">Virtual Lab Assistant</div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    chatBox.appendChild(indicatorDiv);
    scrollToBottom();
}

/**
 * Removes the typing indicator
 */
function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
        chatBox.removeChild(indicator);
    }
}

/**
 * Scrolls the chat box to the bottom
 */
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Initialize the chat when the document is loaded
document.addEventListener("DOMContentLoaded", initChat);

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', function() {
    const isDark = document.body.classList.toggle('dark-mode');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
});

document.addEventListener('DOMContentLoaded', function() {
    // Toggle active state for filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Simulate dropdown functionality
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');
    filterDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            alert('Filter dropdown clicked: ' + this.textContent);
        });
    });
    
    // Clear button functionality
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', function() {
        alert('Filters cleared');
    });
    
    // Lab button click
    const labButtons = document.querySelectorAll('.lab-button');
    labButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Navigating to lab...');
        });
    });
});