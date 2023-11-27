import axios from 'axios';

const fetchData = async (url, authTokens) => {
  try {
    const response = await axios.get(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchData;