// const btnUp = document.querySelector('#to-top-btn');
// const btnUpWrapper = document.querySelector('.btn-up')
import { btnUp } from "./refs";
import { btnUpWrapper } from "./refs";

export default function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    btnUpWrapper.style.display = 'flex';
  } else {
    btnUpWrapper.style.display = 'none';
  }
}
btnUp.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});