// Netlify serverless function: /netlify/functions/youtube-views
// Proxies the YouTube Data API so the API key never appears in client-side code.
// The key is stored in Netlify → Site Settings → Environment Variables as:
//   YOUTUBE_API_KEY = your_key_here

exports.handler = async function(event, context) {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const videoId = 'plRjAYaDbTE';

    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'API key not configured' })
        };
    }

    try {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`YouTube API returned ${response.status}`);
        }

        const data = await response.json();

        if (!data.items || !data.items[0]) {
            throw new Error('No video data returned');
        }

        const views = parseInt(data.items[0].statistics.viewCount, 10);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                // Cache for 1 hour — avoids hammering the API on every page load
                'Cache-Control': 'public, max-age=3600'
            },
            body: JSON.stringify({ views })
        };
    } catch (err) {
        return {
            statusCode: 502,
            body: JSON.stringify({ error: err.message })
        };
    }
};
