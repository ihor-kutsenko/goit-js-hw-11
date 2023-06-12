
import fetchImages from './PixabayAPI';
import renderGalleryCard from './renderGalleryCard';

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from "axios";



const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const input = document.querySelector('.search-input');
const footer = document.querySelector('.footer');
const title = document.querySelector('.search-title')

let lightbox = new SimpleLightbox('.gallery a',
    {
        overlayOpacity: 1,
        captionDelay: 250,
        nav: true,
        widthRatio: 1,
        heightRatio: 1
    });





form.addEventListener('submit', createGallery);


let pageNumber = 1;
let name;

    
async function createGallery(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  footer.innerHTML = "";
  pageNumber = 1;
  name = event.target.searchQuery.value.trim();
  const searchResult = await fetchImages(name, pageNumber);

  if (!name) {
    
    title.textContent = "";
        loadBtn.classList.add('is-hidden');

    Notiflix.Notify.info('Enter data to search!', {
        position: 'center-center',
        width: '340px',
    });

    
    return;
  }


  if (searchResult.hits.length === 0) {
    Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
    
  } else {
    try {
      
      
      const markup = await renderGalleryCard(searchResult.hits);
      title.textContent = `Hooray! We found ${searchResult.totalHits} images.`
      gallery.insertAdjacentHTML('beforeend', markup);

      lightbox.refresh();
      loadBtn.classList.remove('is-hidden')

      if (searchResult.totalHits < 40){
        loadBtn.classList.add('is-hidden');
      footer.insertAdjacentHTML('beforeend', `<h2 class="result-message">We're sorry, but you've reached the end of search results.</h2>`);
        
} 
      

    } catch (error) {
      Notiflix.Notify.failure('Something went wrong!')
    }

  }

  form.reset();
}


loadBtn.addEventListener('click', loadNextGallery);

async function loadNextGallery(event) {
  event.preventDefault();
  
  pageNumber += 1;
   const nextPage = await fetchImages(name, pageNumber);
  
  const nextMarkup = await renderGalleryCard(nextPage.hits);
  gallery.insertAdjacentHTML('beforeend', nextMarkup);

  
  lightbox.refresh();
  
    if (nextPage.hits.length < 40){
      loadBtn.classList.add('is-hidden')
      footer.insertAdjacentHTML('beforeend', `<h2 class="result-message">We're sorry, but you've reached the end of search results.</h2>`);
    }
  
}


