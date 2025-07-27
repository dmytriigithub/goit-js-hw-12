import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import caution from '../img/icons/caution.svg';
import error from '../img/icons/error.svg';

export function errorMessage(message) {
    iziToast.error({
        messageColor: '#fff',
        iconColor: '#fff',
        maxWidth: '350px',
        iconUrl: error,
        position: 'topRight',
        color: '#ef4040',
        message
    });
}
export function warningMessage(message) {
    iziToast.warning({
        messageColor: '#fff',
        iconUrl: caution,
        iconColor: '#ffffffff',
        maxWidth: '350px',
        position: 'topRight',
        color: '#ffa000',
        message
    });
}

export function smoothScrollLoadMore() {
    const galleryCard = document.querySelector('.gallery-item');

    if (!galleryCard) return;

    const cardHeight = galleryCard.getBoundingClientRect().height;

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth'
    });
}