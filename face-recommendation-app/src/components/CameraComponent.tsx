import React, { useRef, useState } from 'react';
import { captureImage } from '../services/faceRecognitionService';

const CameraComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [image, setImage] = useState<string | null>(null);

    const startCamera = async () => {
        if (videoRef.current) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        }
    };

    const takePicture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext('2d');
            context?.drawImage(videoRef.current, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            setImage(dataUrl);
            captureImage(dataUrl); // Pass the captured image to the face recognition service
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay onLoadedMetadata={startCamera} />
            <button onClick={takePicture}>Capture</button>
            {image && <img src={image} alt="Captured" />}
        </div>
    );
};

export default CameraComponent;