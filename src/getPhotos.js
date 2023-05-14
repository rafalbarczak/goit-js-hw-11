const axios = require('axios').default;

export async function getPhotos(searchedPhrase, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '36369103-19b224c6eb70b87e96c04aa1a',
        q: searchedPhrase,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
