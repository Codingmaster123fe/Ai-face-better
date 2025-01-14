import React, { useState } from 'react';
import CameraComponent from './components/CameraComponent';
import RecommendationComponent from './components/RecommendationComponent';
import ChatGPTComponent from './components/ChatGPTComponent';
import { getRecommendations } from './services/faceRecognitionService';
import { sendChatMessage } from './services/chatGPTService';

const App = () => {
    const [image, setImage] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);

    const handleImageCapture = async (capturedImage) => {
        setImage(capturedImage);
        const recs = await getRecommendations(capturedImage);
        setRecommendations(recs);
    };

    const handleChatSubmit = async (message) => {
        const response = await sendChatMessage(message);
        setChatMessages([...chatMessages, { user: message, bot: response }]);
    };

    return (
        <div>
            <h1>Face Recommendation App</h1>
            <CameraComponent onCapture={handleImageCapture} />
            <RecommendationComponent recommendations={recommendations} />
            <ChatGPTComponent messages={chatMessages} onSend={handleChatSubmit} />
        </div>
    );
};

export default App;