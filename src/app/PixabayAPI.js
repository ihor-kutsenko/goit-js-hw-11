import Notiflix from 'notiflix';
import axios from "axios";

const API_KEY = '37204496-df431910de8bd473c8d385424'


export default async function fetchImages(name, pageNumber) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`);
    
    return response.data;
    
   }
  catch (error) {
    console.log(error);
    Notiflix.Notify.warning('error');
  }
}