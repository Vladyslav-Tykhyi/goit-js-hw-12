import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { fetchRequest, params } from "./js/pixabay-api";
import {lightbox ,createMarkup} from "./js/render-functions";

const input = document.querySelector(".form-input")
const btn = document.querySelector(".btn-js")
const gallery = document.querySelector(".gallery")

btn.addEventListener("click", searchClick)

function searchClick(event){
  event.preventDefault()

  const inputMessage = input.value.trim();
  gallery.innerHTML = '<span class="loader"></span>';

  if (!input.value.trim()) {
    iziToast.show({
      message: "Input cannot be empty. Please enter a search term!"
    });
    return;
  }
  params.set('q', inputMessage)
  const base_Url = `https://pixabay.com/api/?${params}`

  fetchRequest(base_Url)
  .then(data =>{
    if (data.hits.length === 0) {
      gallery.innerHTML = '<span class="loader"></span>';
      throw new Error("Sorry, no results found for your query. Please try another search term.");
      
    }
    gallery.innerHTML = createMarkup(data.hits);
    lightbox.refresh();
  }
  )
  .catch(err => {
    iziToast.show({
          message: `${err.message}`
      });
      gallery.innerHTML= ""
  })
  .finally(() => {
    input.value = ""
    
  })
}