
import fetchImages from './PixabayAPI';
import renderGalleryCard from './renderGalleryCard';

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from "axios";



const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more')





form.addEventListener('submit', createGallery);


let pageNumber = 1;
let name;

    
async function createGallery(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  pageNumber = 1;
  name = event.target.searchQuery.value;
  const searchResult = await fetchImages(name, pageNumber);

  if (searchResult.hits.length === 0) {
    Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
    
  } else {
    try {
      
      
      const markup = await renderGalleryCard(searchResult.hits);
      
      gallery.insertAdjacentHTML('beforeend', markup);

      const lightbox = new SimpleLightbox('.gallery a');

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
  // console.log(nextPage);
  const nextMarkup = await renderGalleryCard(nextPage.hits);
  gallery.insertAdjacentHTML('beforeend', nextMarkup);

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
  
   
  
}