import React, { useState } from 'react';
import { sendMessage } from '../services/chatGPTService';

const ChatGPTComponent: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    const handleSendMessage = async () => {
        if (userInput.trim() === '') return;

        const userMessage = userInput;
        setChatHistory([...chatHistory, { user: userMessage, bot: '' }]);
        setUserInput('');

        const botResponse = await sendMessage(userMessage);
        setChatHistory((prev) => {
            const updatedChat = [...prev];
            updatedChat[updatedChat.length - 1].bot = botResponse;
            return updatedChat;
        });
    };

    return (
        <div className="chatgpt-component">
            <div className="chat-history">
                {chatHistory.map((chat, index) => (
                    <div key={index}>
                        <strong>User:</strong> {chat.user}
                        <br />
                        <strong>Bot:</strong> {chat.bot}
                        <hr />
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatGPTComponent;