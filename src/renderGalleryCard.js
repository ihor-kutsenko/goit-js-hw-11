export default function renderGalleryCard(photos) {
  return photos.map(({ webformatURL, largeImageURL, likes, tags, views, comments, downloads }) => {
    return `<a href='${largeImageURL}' class="card-link ">
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="330px" height="220px" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views</b>
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <b>${downloads}</b>
    </p>
  </div>
</div>
</a>`
  }).join('');
}