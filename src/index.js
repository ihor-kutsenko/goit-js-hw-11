
import fetchImages from './PixabayAPI';

import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from "axios";



const form = document.querySelector('#search-form');





form.addEventListener('submit', createGallery);


let pageNumber = 1;
let name ;
    
async function createGallery(event) {
  event.preventDefault();
  
  pageNumber = 1;
  name = event.target.searchQuery.value;
  const result = await fetchImages(name, pageNumber);

  form.requestFullscreen();
}
