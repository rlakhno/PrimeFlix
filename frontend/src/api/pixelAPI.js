const { createClient } = require('pexels');

// Initialize the Pexels client with your API key
const client = createClient('jbH4a0Tfg1s0gbRnNWVZbess9dh9XMubtqci5ej9WzJaJLoKz9EZUfzd');

// Function to search for videos
async function searchVideos(query, perPage = 1, page = 1) {
  try {
    const response = await client.videos.search({ query, per_page: perPage, page });
    for (let i = 0; i < response.videos.length; i++) {
      console.log('Videos:', response.videos[i].video_files);
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
}

// Function to search for images
async function searchImages(query, perPage = 3, page = 1) {
  try {
    const response = await client.photos.search({ query, per_page: perPage, page });
    for (let i = 0; i < response.photos.length; i++) {
      console.log('Images:', response.photos[i].src.original);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

// Exporting functions using module.exports
module.exports = {
  searchVideos,
  searchImages
};



// Example usage
// searchVideos('nature', 1);
// searchImages('mountains', 4);
