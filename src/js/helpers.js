export function smoothScrollLoadMore() {
    const galleryCard = document.querySelector('.gallery-item');

    if (!galleryCard) return;

    const cardHeight = galleryCard.getBoundingClientRect().height;

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth'
    });
}