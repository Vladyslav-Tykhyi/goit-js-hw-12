// const API_URL ='https://pixabay.com/api/'
// const API_KEY ='47362055-4c26e776b4d447c79837e3674'

// const input = document.querySelector(".form-input")
// export const params = new URLSearchParams({
//   key: API_KEY,
//   q: input.value
// })

const API_KEY = '47379272-a961c7172d29abe92af06f616';

export const params = new URLSearchParams({
  key: API_KEY,
  q: 'yellow+flower',
});

const BASE_URL = `https://pixabay.com/api/?${params}`;

// const base_Url = `${API_URL}?${params}`



export function fetchRequest(url = BASE_URL) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error("Sorry, no results found for your query. Please try another search term.");
    }
    return response.json();
  });
}