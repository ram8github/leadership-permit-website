// Fetches live YouTube view count via a Netlify serverless function.
// The YouTube API key is stored in Netlify environment variables — never in this file.
// Setup: Netlify → Site Settings → Environment Variables → add YOUTUBE_API_KEY

async function getYouTubeViews() {
    const el = document.getElementById('video-views');
    if (!el) return;

    try {
        const response = await fetch('/.netlify/functions/youtube-views');

        if (!response.ok) throw new Error('Function returned ' + response.status);

        const data = await response.json();

        if (data.views) {
            el.innerHTML = '👁️ ' + data.views.toLocaleString() + ' views';
        } else {
            throw new Error('No views in response');
        }
    } catch (err) {
        // Fallback to static count if anything fails
        el.innerHTML = '👁️ 146,000+ views';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', getYouTubeViews);
} else {
    getYouTubeViews();
}
