
import axios from 'axios';

const API_KEY = '47379272-a961c7172d29abe92af06f616';

export const params = {
  key: API_KEY,
  q: 'yellow+flower',
};

const BASE_URL = `https://pixabay.com/api/`;

export async function fetchRequest(url = BASE_URL, customParams = {}) {
  try {
    const response = await axios.get(url, {
      params: { ...params, ...customParams },
    });
    return response.data;
  } catch (error) {
    throw new Error("Sorry, no results found for your query. Please try another search term.");
  }
}