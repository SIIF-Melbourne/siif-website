function createPost(postData) {
  // Create the HTML structure
  const postElement = document.createElement('div');
  postElement.classList.add('post');
  const humanDate = new Date(postData.date).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Use 24-hour time format
  });

  postElement.innerHTML = `
    <div class="post-header">
      <div class="post-profile">
        <img class="post-icon" src="/assets/icons/siifund_unimelb.jpg" />
        <p class="post-user">siifund_unimelb</p>
      </div>
      <p class="post-date">${humanDate}</p>
    </div>
    <div class="swiper">
      <div class="swiper-wrapper">
        ${Array.from({length: postData.count}, (_, i) => (i + 1).toString().padStart(2, '0')).map(imageNum => `
          <img src="http://127.0.0.1:5000/image?blob_name=${postData.id}-${imageNum}" alt="Image" draggable="false" class="swiper-slide"/>
        `).join('')}
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="pagination-wrapper">
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="post-caption">${postData.description}</div>
  `;

  return postElement;
}

async function fetchAndRenderPosts() {
  try {
    const response = await fetch('http://127.0.0.1:5000/image?blob_name=_metadata');
    const posts = (await response.json()).sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    posts.forEach(post => {
      const postElement = createPost(post);
      feed.appendChild(postElement);
    });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.publication-tab');
  const contentContainers = document.querySelectorAll('.publication-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      contentContainers.forEach(container => container.classList.remove('active'));
      const contentId = this.getAttribute('data-content');
      document.getElementById(contentId).classList.add('active');
    });
  });

  fetchAndRenderPosts().then(() =>  {
    var swiper = new Swiper(".swiper", {
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        slideChange: function () {
          swiper.allowSlidePrev = !this.isBeginning
          swiper.allowSlideNext = !this.isEnd
        },
        init: function() {
          this.on('paginationRender', () => {
            document.querySelectorAll('.swiper-pagination').forEach((e) => {
              e.parentElement.style.display = e.children.length === 1 ? 'none' : 'flex'
            })
          })
        },
      }
    });
  })
});