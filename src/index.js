import { getPhotos } from './getPhotos';
import Notiflix from 'notiflix';
const buttonEl = document.querySelector('button[type=submit]');
const galleryEl = document.querySelector('.gallery');
const inputEl = document.querySelector('.search-form input');
const loadBtn = document.querySelector('.load-more');
let currentPage = 1;

function buildGallery(photos) {
  galleryEl.innerHTML = '';
  let markup;
  markup = photos.hits
    .map(photo => {
      return `<div class="photo-card">
  <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>: ${photo.likes}
    </p>
    <p class="info-item">
      <b>Views</b>: ${photo.views}
    </p>
    <p class="info-item">
      <b>Comments</b>: ${photo.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>: ${photo.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
  galleryEl.innerHTML = markup;

  if (photos.totalHits > 0) {
    Notiflix.Notify.success(`Horray! We found ${photos.totalHits} images.`);
  } else {
    loadBtn.classList.add('is-hidden');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try Again.'
    );
  }
  if (photos.totalHits > 40) {
    loadBtn.classList.remove('is-hidden');
  }
}

async function createAnotherPage() {
  currentPage++;

  const photos = await getPhotos(inputEl.value.trim(), currentPage);

  galleryEl.insertAdjacentHTML(
    'beforeend',
    photos.hits
      .map(photo => {
        return `<div class="photo-card">
  <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>: ${photo.likes}
    </p>
    <p class="info-item">
      <b>Views</b>: ${photo.views}
    </p>
    <p class="info-item">
      <b>Comments</b>: ${photo.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>: ${photo.downloads}
    </p>
  </div>
</div>`;
      })
      .join('')
  );

  if (photos.totalHits > currentPage * 40) {
    loadBtn.classList.remove('is-hidden');
  } else {
    loadBtn.classList.add('is-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
function searchPhotos() {
  currentPage = 1;
  const searchedPhrase = inputEl.value.trim();
  if (searchedPhrase === '') {
    galleryEl.innerHTML = '';
    return;
  }
  getPhotos(searchedPhrase)
    .then(photos => buildGallery(photos))
    .catch(error => console.log(error));
}

buttonEl.addEventListener('click', event => {
  event.preventDefault();
  searchPhotos();
});

loadBtn.addEventListener('click', event => {
  event.preventDefault();
  createAnotherPage();
});
