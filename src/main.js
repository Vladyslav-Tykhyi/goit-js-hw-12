import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { fetchRequest } from "./js/pixabay-api";
import { lightbox, createMarkup } from "./js/render-functions";

const input = document.querySelector(".form-input");
const btn = document.querySelector(".btn-js");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more-btn");

let currentPage = 1;
let searchQuery = "";
let totalHits = 0;

btn.addEventListener("click", searchClick);
loadMoreBtn.addEventListener("click", loadMore);

loadMoreBtn.style.display = "none";

function searchClick(event) {
  event.preventDefault();
  searchQuery = input.value.trim();
  currentPage = 1;
  gallery.innerHTML = "";
  loadMoreBtn.style.display = "none";

  if (!searchQuery) {
    iziToast.show({
      message: "Input cannot be empty. Please enter a search term!",
    });
    return;
  }

  fetchImages();
}

function loadMore() {
  currentPage++;
  fetchImages(true);
}

async function fetchImages(isLoadMore = false) {
  const params = {
    q: searchQuery,
    page: currentPage,
    per_page: 15,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  };

  try {
    const loaderHTML = '<span class="loader"></span>';
    if (!isLoadMore) {
      gallery.innerHTML = loaderHTML;
    } else {
      loadMoreBtn.insertAdjacentHTML('afterend', loaderHTML);
    }

    const data = await fetchRequest(undefined, params);

    const loader = document.querySelector(".loader");
    if (loader) loader.remove();

    if (data.hits.length === 0) {
      if (!isLoadMore) {
        throw new Error("Sorry, no results found for your query. Please try another search term.");
      }
      iziToast.show({
        message: "No more results to load.",
      });
      return;
    }

    totalHits = data.totalHits;

    if (!isLoadMore) {
      gallery.innerHTML = createMarkup(data.hits);
    } else {
      gallery.insertAdjacentHTML("beforeend", createMarkup(data.hits));
      smoothScroll();
    }

    lightbox.refresh();


    const totalPages = Math.ceil(totalHits / params.per_page);
    if (currentPage >= totalPages) {
      loadMoreBtn.style.display = "none";
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMoreBtn.style.display = "block";
    }
  } catch (err) {
    iziToast.show({
      message: `${err.message}`,
    });
    gallery.innerHTML = "";
  } finally {
    const loader = document.querySelector(".loader");
    if (loader) loader.remove();
    input.value = "";
  }
}

function smoothScroll() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}