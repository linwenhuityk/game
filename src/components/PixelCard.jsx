import React from 'react';

const PixelCard = ({ children, className = '', title }) => {
    return (
        <div
            className={`pixel-card ${className}`}
            style={{
                border: '4px solid var(--color-border)',
                padding: 'var(--spacing-md)',
                background: '#000',
                boxShadow: '8px 8px 0px 0px rgba(0,0,0,0.5)',
                position: 'relative',
                maxWidth: '600px',
                width: '100%',
                margin: '0 auto',
            }}
        >
            {title && (
                <div style={{
                    background: 'var(--color-primary)',
                    color: 'var(--color-text)',
                    padding: '4px 8px',
                    display: 'inline-block',
                    position: 'absolute',
                    top: '-20px',
                    left: '10px',
                    border: '4px solid var(--color-border)',
                    fontWeight: 'bold',
                }}>
                    {title}
                </div>
            )}
            {children}
        </div>
    );
};

export default PixelCard;
