import axios from 'axios';

const API_KEY = '51312083-0c9a0730bd4d2b20e847ab802';
const URL = 'https://pixabay.com/api/';

export const params = {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15
};

export const getImagesByQuery = async (q, page) => {
    const response = await axios.get(URL, {
        params: {
            q,
            page,
            ...params
        }
    })
    console.log(response.data);

    return response.data;
}
