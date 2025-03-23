async function fetchInstagramPosts() {
    const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace with your access token
    const userId = 'YOUR_USER_ID'; // Replace with your user ID
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink&access_token=${accessToken}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        return [];
    }
}

async function displayInstagramPosts() {
    const posts = await fetchInstagramPosts();
    const container = document.getElementById('instagram-posts');

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'instagram-post';

        if (post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM') {
            postElement.innerHTML = `
                <a href="${post.permalink}" target="_blank">
                    <img src="${post.media_url}" alt="${post.caption}">
                </a>
                <p>${post.caption}</p>
            `;
        } else if (post.media_type === 'VIDEO') {
            postElement.innerHTML = `
                <a href="${post.permalink}" target="_blank">
                    <video controls>
                        <source src="${post.media_url}" type="video/mp4">
                    </video>
                </a>
                <p>${post.caption}</p>
            `;
        }

        container.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', displayInstagramPosts);