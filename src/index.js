import {form, gallery, loadBtn,  footer, title} from './app/refs';
import fetchImages from './app/PixabayAPI';
import renderGalleryCard from './app/renderGalleryCard';
import imagesScroll from './app/imagesScroll';
import scrollFunction from './app/scrollUpFunction';

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from "axios";




 lightbox = new SimpleLightbox('.gallery a',
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
    loadBtn.classList.remove('is-visible');


    Notiflix.Notify.info('Enter data to search!', {
        position: 'center-center',
        width: '340px',
    });

    return;
  }


  if (searchResult.hits.length === 0) {
    Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.", {
        position: 'center-center',
        width: '340px',
    })
    
  } else {

    try {
            
      const markup = await renderGalleryCard(searchResult.hits);
      title.textContent = `Hooray! We found ${searchResult.totalHits} images.`
      gallery.insertAdjacentHTML('beforeend', markup);

      lightbox.refresh();
      loadBtn.classList.remove('is-hidden');
      loadBtn.classList.add('is-visible')


      if (searchResult.totalHits < 40){
        loadBtn.classList.add('is-hidden');
        loadBtn.classList.remove('is-visible');
        footer.insertAdjacentHTML('beforeend', `<h2 class="result-message">We're sorry, but you've reached the end of search results.</h2>`);
        
        } 
      

    } catch (error) {
      Notiflix.Notify.failure('Something went wrong!', {
        position: 'center-center',
        width: '340px',
    })
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

  imagesScroll();

  
  lightbox.refresh();
  
    if (nextPage.hits.length < 40){
      loadBtn.classList.add('is-hidden');
      loadBtn.classList.remove('is-visible');
      footer.insertAdjacentHTML('beforeend', `<h2 class="result-message">We're sorry, but you've reached the end of search results.</h2>`);
    }
  
}


window.addEventListener('scroll', scrollFunction);

