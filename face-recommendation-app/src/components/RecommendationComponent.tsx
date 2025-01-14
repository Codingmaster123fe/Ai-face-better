import React from 'react';

const RecommendationComponent: React.FC<{ recommendations: string[] }> = ({ recommendations }) => {
    return (
        <div className="recommendation-container">
            <h2>Recommendations for You</h2>
            <ul>
                {recommendations.length > 0 ? (
                    recommendations.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                ) : (
                    <li>No recommendations available.</li>
                )}
            </ul>
        </div>
    );
};

export default RecommendationComponent;