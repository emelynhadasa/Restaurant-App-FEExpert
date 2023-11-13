import RestoSource from '../data/resto-source';

const addReview = async (url, name, review) => {
  const data = {
    id: url.id,
    name,
    review,
  };

  const date = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const reviewContainer = document.querySelector('.reviews-container');
  const newReview = `
   <div class="card-reviews">
        <figure>
          <img
            src="./images/profile.jpg"
            alt="${name}"
            class="reviewer-photo"
          />
          <figcaption class="reviewer-name">${name}</figcaption>
        </figure>
        <div class="review-text-detail">
        <p class="review">${review}</p>
        <p class="date-review">${date}</p>
        </div>
      </div>
  `;

  const response = await RestoSource.postReview(data);
  if (response.error) {
    alert(response.message);
    return;
  }
  reviewContainer.innerHTML += newReview;
};

export default addReview;
