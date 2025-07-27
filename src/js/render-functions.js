import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import refs from "./refs";

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<li class="gallery-item">
            <div class="gallery-item-thumb">
                <a class="gallery-link"href=${largeImageURL}>
                    <img 
                        class="gallery-img"
                        src=${webformatURL}
                        alt=${tags.split(',')[0]}
                        width="360px"
                    />
                </a>
            </div>
            <ul class="gallery-info">
                <li class="gallery-info-item">
                    <p class="gallery-info-title">Likes</p>
                    <p class="gallery-info-value">${likes}</p>
                </li>
                <li class="gallery-info-item">
                    <p class="gallery-info-title">Views</p>
                    <p class="gallery-info-value">${views}</p>
                </li>
                <li class="gallery-info-item">
                    <p class="gallery-info-title">Comments</p>
                    <p class="gallery-info-value">${comments}</p>
            
                </li>
                    <li class="gallery-info-item">
                    <p class="gallery-info-title">Downloads</p>
                    <p class="gallery-info-value">${downloads}</p>
                </li>
            </ul>
        </li>`
    ).join('');

    refs.gallery.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();
};

export function clearGallery() {
    refs.gallery.innerHTML = '';
};

export function showLoader() {
    refs.spinner.classList.remove('loader-box-hidden');
};

export function hideLoader() {
    refs.spinner.classList.add('loader-box-hidden');
};

export function showLoadMoreButton() {
    refs.loadMoreBtn.classList.remove('load-more-btn-hidden');
};
export function hideLoadMoreButton() {
    refs.loadMoreBtn.classList.add('load-more-btn-hidden');
};