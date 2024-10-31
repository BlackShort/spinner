import { useState } from 'react';
import './Spinner.css';

export const Spinner = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    const prizes = [100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000];
    const segmentAngle = 360 / prizes.length;

    const spinWheel = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        const spinDegrees = Math.floor(3600 + Math.random() * 360);
        const newRotation = rotation + spinDegrees;
        setRotation(newRotation);

        setTimeout(() => {
            setIsSpinning(false);

            const finalAngle = (newRotation % 360 + 360) % 360;
            const offsetAngle = (finalAngle + segmentAngle / 2) % 360;
            const winningIndex = Math.floor(offsetAngle / segmentAngle);
            const selectedPrize = prizes[(prizes.length - 1 - winningIndex) % prizes.length];

            alert(`You won ${selectedPrize} points!`);
        }, 3000);
    };

    return (
        <div className="wheel-game">
            <div className="pointer"></div>
            <div className="center"></div>
            <div
                className="wheel"
                style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning ? 'transform 3s ease-out' : 'none',
                }}
            >
                {prizes.map((prize, index) => (
                    <div
                        key={index}
                        className="segment"
                        style={{
                            transform: `rotate(${index * segmentAngle}deg)`,
                        }}
                    >
                        <span>{prize}</span>
                    </div>
                ))}
            </div>
            <button onClick={spinWheel} disabled={isSpinning}>Spin</button>
        </div>
    );
};
