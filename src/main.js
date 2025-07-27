import { getImagesByQuery, params } from "./js/pixabay-api";
import refs from "./js/refs";
import { createGallery, showLoader, hideLoader, clearGallery, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';
import { smoothScrollLoadMore, errorMessage, warningMessage } from "./js/helpers";

let input = null;
let page = 1;
let totalHits = 0;


refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    input = form.elements.search_text.value.trim();
    clearGallery();
    hideLoadMoreButton();
    hideLoader();

    if (input) {
        showLoader();
        try {
            const data = await getImagesByQuery(input, page = 1)
            if (data.hits.length) {
                createGallery(data.hits);
                if (data.hits.length < data.totalHits) {
                    showLoadMoreButton();
                }
                totalHits = data.totalHits

            } else {
                errorMessage('Sorry, there are no images matching your search query. Please try again!');
            }
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            hideLoader();
        };
    } else {
        warningMessage('You forgot type your request');
    }
    form.reset();
}

async function onLoadMore() {
    showLoader();
    hideLoadMoreButton();
    refs.loadMoreBtn.disabled = true;

    try {
        page++;
        const data = await getImagesByQuery(input, page)
        const totalPage = totalHits / params.per_page;

        createGallery(data.hits);
        smoothScrollLoadMore();

        if (page >= totalPage) {
            hideLoadMoreButton();
            warningMessage("We're sorry, but you've reached the end of search results.");
        }
        else {
            showLoadMoreButton()
        }
    }
    catch (err) {
        console.log(err.message);
    }
    finally {
        hideLoader();
        refs.loadMoreBtn.disabled = false;
    };
}