import React, { useState } from 'react';
import axios from 'axios';

const ArticleSummarizer = () => {
    const [url, setUrl] = useState('');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSummary('');

        try {
            const response = await axios.post('https://api.example.com/summarize', {
                url: url,
            }, {
                headers: {
                    'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY',
                    'x-rapidapi-host': 'api.example.com',
                    'Content-Type': 'application/json',
                },
            });

            setSummary(response.data.summary); // Adjust based on the API response structure
        } catch (err) {
            setError('Error fetching summary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter article URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <button type="submit">Summarize</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {summary && (
                <div>
                    <h2>Summary:</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default ArticleSummarizer;
