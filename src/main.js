import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery, params } from "./js/pixabay-api";
import refs from "./js/refs";
import {
    createGallery,
    showLoader,
    hideLoader,
    clearGallery,
    showLoadMoreButton,
    hideLoadMoreButton,
} from "./js/render-functions";
import { smoothScrollLoadMore } from "./js/helpers";
import caution from './img/icons/caution.svg';
import error from './img/icons/error.svg';

let query = '';
let page = 1;
let totalHits = 0;

refs.form.addEventListener("submit", handleSubmit);
refs.loadMoreBtn.addEventListener("click", handleLoadMore);

async function handleSubmit(event) {
    event.preventDefault();

    const searchValue = event.target.elements.search_text.value.trim();

    if (!searchValue) {
        iziToast.warning({
            messageColor: '#fff',
            iconUrl: caution,
            iconColor: '#ffffffff',
            maxWidth: '350px',
            position: 'topRight',
            color: '#ffa000',
            message: "You forgot to type your request",
        });
        return;
    }

    query = searchValue;
    page = 32;
    totalHits = 0;

    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);

        if (!data.hits.length) {
            iziToast.error({
                messageColor: '#fff',
                iconColor: '#fff',
                maxWidth: '350px',
                iconUrl: error,
                position: 'topRight',
                color: '#ef4040',
                message: "Sorry, there are no images matching your search query. Please try again!"
            });
            return;
        }

        createGallery(data.hits);
        totalHits = data.totalHits;

        if (totalHits > params.per_page) {
            showLoadMoreButton();
        }

    } catch (error) {
        iziToast.error({
            messageColor: '#fff',
            iconColor: '#fff',
            maxWidth: '350px',
            iconUrl: error,
            position: 'topRight',
            color: '#ef4040',
            message: "An error occurred while fetching images"
        });
        console.error(error.message);
    } finally {
        hideLoader();
        event.target.reset();
    }
}


async function handleLoadMore() {
    page++;
    refs.loadMoreBtn.disabled = true;
    hideLoadMoreButton();
    showLoader();

    try {
        console.log(page);

        const data = await getImagesByQuery(query, page);
        createGallery(data.hits);
        smoothScrollLoadMore();

        const totalPages = Math.ceil(totalHits / params.per_page);
        if (page < totalPages) {
            showLoadMoreButton();
        } else {
            iziToast.warning({
                messageColor: '#fff',
                iconUrl: caution,
                iconColor: '#ffffffff',
                maxWidth: '350px',
                position: 'topRight',
                color: '#ffa000',
                message: "We're sorry, but you've reached the end of search results."
            });
        }

    } catch (error) {
        iziToast.error({
            messageColor: '#fff',
            iconColor: '#fff',
            maxWidth: '350px',
            iconUrl: error,
            position: 'topRight',
            color: '#ef4040',
            message: "Failed to load more images."
        });
        console.error(error.message);
    } finally {
        hideLoader();
        refs.loadMoreBtn.disabled = false;
    }
}