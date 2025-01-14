export const recognizeFace = async (image: File): Promise<any> => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('https://api.example.com/face-recognition', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Face recognition failed');
    }

    return response.json();
};

export const getRecommendations = async (faceData: any): Promise<any> => {
    const response = await fetch('https://api.example.com/recommendations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(faceData),
    });

    if (!response.ok) {
        throw new Error('Failed to get recommendations');
    }

    return response.json();
};