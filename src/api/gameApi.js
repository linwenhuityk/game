const GAS_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPT_URL;

/**
 * Fetch questions from Google Apps Script
 * @param {string} userId - User ID to track session
 * @param {number} count - Number of questions to fetch
 * @returns {Promise<Array>} - List of questions
 */
export const fetchQuestions = async (userId, count = 5) => {
    if (!GAS_URL || GAS_URL.includes('xxxxxxxx')) {
        console.warn("GAS URL not set, using mock data.");
        return mockQuestions(count);
    }

    try {
        const response = await fetch(`${GAS_URL}?action=getQuestions&id=${userId}&count=${count}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch questions:", error);
        return mockQuestions(count);
    }
};

/**
 * Submit game result to Google Apps Script
 * @param {object} resultData - { id, passed, score, maxScore, attempts }
 */
export const submitResult = async (resultData) => {
    if (!GAS_URL || GAS_URL.includes('xxxxxxxx')) {
        console.log("Mock submit:", resultData);
        return { success: true };
    }

    try {
        // GAS often requires 'no-cors' for opaque responses depending on deployment, 
        // or POST with simple payloads. standard fetch might fail CORS if not handled in GAS.
        // Usually, we use text/plain or URL encoded for GAS doPost.
        const response = await fetch(GAS_URL, {
            method: "POST",
            body: JSON.stringify(resultData),
        });
        // GAS redirects often cause issues with fetch in strict mode, but client-side redirect following works.
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to submit result:", error);
        return { success: false, error };
    }
};

const mockQuestions = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        question: `Mock Question ${i + 1}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: "Option A" // Simple mock
    }));
};
