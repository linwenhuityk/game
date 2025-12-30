import React, { useState, useEffect } from 'react';
import PixelCard from '../components/PixelCard';
import { getBossImage } from '../utils/dicebear';
import { fetchQuestions } from '../api/gameApi';

const Game = ({ userId, onFinish }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const QUESTION_COUNT = parseInt(import.meta.env.VITE_QUESTION_COUNT || 5);
    const PASS_THRESHOLD = parseInt(import.meta.env.VITE_PASS_THRESHOLD || 3);

    useEffect(() => {
        const loadGame = async () => {
            try {
                setLoading(true);
                const data = await fetchQuestions(userId, QUESTION_COUNT);
                if (data && data.length > 0) {
                    setQuestions(data);
                } else {
                    setError("No questions found.");
                }
            } catch (err) {
                setError("Failed to load questions.");
            } finally {
                setLoading(false);
            }
        };
        loadGame();
    }, [userId]);

    const handleAnswer = (option, correct) => {
        // Check correctness. The 'correct' field from GAS might be the option text or index.
        // Assuming GAS returns the correct answer text or letter (A, B, C, D).
        // Let's assume exact match for now.

        let isCorrect = false;
        // Handle if 'correct' is simple string match or needs normalization
        if (correct && option === correct) {
            isCorrect = true;
        }

        const newScore = isCorrect ? score + 1 : score;
        setScore(newScore);

        if (currentIdx + 1 < questions.length) {
            setCurrentIdx(currentIdx + 1);
        } else {
            // Game Over
            onFinish({
                score: newScore,
                maxScore: questions.length,
                passed: newScore >= PASS_THRESHOLD,
                attempts: 1 // Logic to track attempts could be outside or complex
            });
        }
    };

    if (loading) return <div className="loading">LOADING STAGE...</div>;
    if (error) return <div className="error">{error}</div>;

    const currentQ = questions[currentIdx];
    // Generate a consistent seed based on question ID or content so the boss is deterministic per question
    const bossSeed = currentQ.id ? `boss-${currentQ.id}` : `boss-${currentIdx}`;

    return (
        <div className="page-game">
            <div style={{ marginBottom: '20px' }}>
                <img
                    src={getBossImage(bossSeed)}
                    alt="Boss"
                    style={{ width: '120px', height: '120px', imageRendering: 'pixelated' }}
                />
                <div style={{ marginTop: '8px', color: 'var(--color-secondary)', textShadow: '2px 2px #000' }}>
                    STAGE {currentIdx + 1}/{questions.length}
                </div>
            </div>

            <PixelCard title={`Q${currentIdx + 1}`}>
                <div style={{ marginBottom: '20px', lineHeight: '1.5' }}>
                    {currentQ.question}
                </div>

                <div style={{ display: 'grid', gap: '10px' }}>
                    {currentQ.options && currentQ.options.map((opt, idx) => (
                        <button key={idx} onClick={() => handleAnswer(opt, currentQ.correct)}>
                            {opt}
                        </button>
                    ))}
                </div>
            </PixelCard>
        </div >
    );
};

export default Game;
