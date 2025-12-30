import React, { useState } from 'react';
import PixelCard from '../components/PixelCard';

const Home = ({ onStart }) => {
    const [userId, setUserId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId.trim()) {
            onStart(userId);
        }
    };

    return (
        <div className="page-home">
            <h1 style={{
                color: 'var(--color-accent)',
                textShadow: '4px 4px 0 #000',
                fontSize: '3rem',
                marginBottom: '40px'
            }}>
                PIXEL QUIZ
            </h1>

            <PixelCard title="PLAYER LOGIN">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '8px' }}>
                        <label htmlFor="userId">ENTER PLAYER ID:</label>
                        <input
                            id="userId"
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="e.g. HERO-01"
                            autoFocus
                            autoComplete="off"
                        />
                    </div>

                    <button type="submit" style={{ marginTop: '10px' }}>
                        INSERT COIN / START
                    </button>
                </form>
            </PixelCard>

            <div style={{ marginTop: '30px', opacity: 0.7, fontSize: '0.8rem', animation: 'blink 1s infinite' }}>
                PRESS START BUTTON
            </div>

            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default Home;
