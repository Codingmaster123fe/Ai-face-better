import axios from 'axios';

const CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key

export const sendMessageToChatGPT = async (message: string) => {
    try {
        const response = await axios.post(CHATGPT_API_URL, {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error communicating with ChatGPT:', error);
        throw new Error('Failed to get response from ChatGPT');
    }
};