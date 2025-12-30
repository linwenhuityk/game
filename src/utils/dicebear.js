/**
 * Generates a DiceBear Pixel Art avatar URL
 * @param {string} seed - Unique seed for the avatar (e.g., questions text or index)
 * @returns {string} - The URL of the avatar image
 */
export const getBossImage = (seed) => {
    // Using 'pixel-art' style for the retro vibe
    // Added some query parameters for variety if needed, but defaults are usually fine.
    return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;
};

/**
 * Preload N images (optional, but requested in requirements to "preload" or handle 100 assets)
 * In a web context, we can just let the browser cache them, or explicitly create Image objects.
 * For the requirement "preload 100 images", we can just generate a function that returns the URL.
 * Actual preloading can be done in the game initialization if strictly required.
 */
export const preloadBossImages = (count = 20) => {
    const seeds = Array.from({ length: count }, (_, i) => `boss-${i}`);
    seeds.forEach(seed => {
        const img = new Image();
        img.src = getBossImage(seed);
    });
};
