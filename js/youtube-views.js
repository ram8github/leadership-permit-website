// Fetch YouTube video view count
async function getYouTubeViews() {
    const videoId = 'plRjAYaDbTE';
    const apiKey = 'AIzaSyBaBVlSKewuyaiuOlq59hz3XkujgQ3PLyY';
    
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`
        );
        const data = await response.json();
        
        if (data.items && data.items[0]) {
            const views = parseInt(data.items[0].statistics.viewCount);
            const formattedViews = views.toLocaleString();
            document.getElementById('video-views').innerHTML = `👁️ ${formattedViews} views`;
        } else {
            // Fallback if API fails
            document.getElementById('video-views').innerHTML = '👁️ 146,000+ views';
        }
    } catch (error) {
        console.error('YouTube API error:', error);
        // Fallback to static count if API fails
        document.getElementById('video-views').innerHTML = '👁️ 146,000+ views';
    }
}

// Load views when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', getYouTubeViews);
} else {
    getYouTubeViews();
}
