import React, { useEffect, useState } from 'react';
import PixelCard from '../components/PixelCard';
import { submitResult } from '../api/gameApi';

const Result = ({ userId, result, onRetry }) => {
    const [submitting, setSubmitting] = useState(true);

    useEffect(() => {
        const postData = async () => {
            await submitResult({
                userId,
                ...result,
                timestamp: new Date().toISOString()
            });
            setSubmitting(false);
        };
        postData();
    }, [userId, result]);

    const isPassed = result.passed;

    return (
        <div className="page-result">
            <h1 style={{
                color: isPassed ? 'var(--color-success)' : 'var(--color-secondary)',
                fontSize: '2.5rem',
                textShadow: '4px 4px 0 #000',
                marginBottom: '20px'
            }}>
                {isPassed ? "STAGE CLEARED" : "GAME OVER"}
            </h1>

            <PixelCard title="RESULT">
                <div style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                    PLAYER: {userId}
                </div>

                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                    SCORE: {result.score} / {result.maxScore}
                </div>

                <div style={{
                    color: isPassed ? 'var(--color-success)' : 'var(--color-secondary)',
                    border: '2px dashed currentColor',
                    padding: '10px',
                    marginBottom: '20px',
                    display: 'inline-block'
                }}>
                    {isPassed ? "YOU PASSED!" : "TRY AGAIN"}
                </div>

                {submitting && (
                    <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '20px' }}>
                        SAVING RECORD...
                    </div>
                )}

                <button onClick={onRetry} style={{ width: '100%' }}>
                    CONTINUE?
                </button>
            </PixelCard>
        </div>
    );
};

export default Result;
