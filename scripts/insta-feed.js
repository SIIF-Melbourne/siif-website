// async function fetchAndRenderPosts() {
//   try {
//     const response = await fetch('http://127.0.0.1:5000/image?blob_name=_metadata');
//     const posts = await response.json();
//     const feed = document.getElementById('feed');
//     feed.innerHTML = '';
//     posts.forEach(post => {
//       const postDiv = document.createElement('div');
//       postDiv.classList.add('post');

//       // --- New: Title and Date Header Bar ---
//       const headerBar = document.createElement('div');
//       headerBar.classList.add('post-header-bar');
//       const titleDiv = document.createElement('div');
//       titleDiv.classList.add('post-title');
//       titleDiv.textContent = post.title || "Untitled Post";
//       const timeDiv = document.createElement('div');
//       timeDiv.classList.add('post-time');
//       if (post.date) {
//         const dateObj = new Date(post.date);
//         timeDiv.textContent = dateObj.toLocaleString(undefined, {
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit',
//         });
//       } else {
//         timeDiv.textContent = '';
//       }
//       headerBar.appendChild(titleDiv);
//       headerBar.appendChild(timeDiv);
//       postDiv.appendChild(headerBar);

//       // Post username header
//       const headerDiv = document.createElement('div');
//       headerDiv.classList.add('post-header');
//       headerDiv.textContent = post.username;
//       postDiv.appendChild(headerDiv);

//       const carouselContainer = document.createElement('div');
//       carouselContainer.classList.add('carousel-container');

//       // Left arrow
//       const leftBtn = document.createElement('button');
//       leftBtn.classList.add('arrow', 'left');
//       leftBtn.innerHTML = '❮';
//       leftBtn.onclick = () => scrollCarousel(leftBtn, -1);
//       carouselContainer.appendChild(leftBtn);

//       // Carousel div
//       const carouselDiv = document.createElement('div');
//       carouselDiv.classList.add('carousel');

//       // Dots container
//       const dotsContainer = document.createElement('div');
//       dotsContainer.classList.add('carousel-dots');

//       for (let i = 1; i <= post.count; i++) {
//         const img = document.createElement('img');
//         img.src = `http://127.0.0.1:5000/image?blob_name=${post.id}-${i.toString().padStart(2, '0')}`;
//         img.alt = `Image ${i}`;
//         img.draggable = false;
//         carouselDiv.appendChild(img);

//         const dot = document.createElement('span');
//         dot.classList.add('dot');
//         dot.dataset.index = i - 1;
//         dotsContainer.appendChild(dot);
//       }
//       carouselContainer.appendChild(carouselDiv);

//       // Right arrow
//       const rightBtn = document.createElement('button');
//       rightBtn.classList.add('arrow', 'right');
//       rightBtn.innerHTML = '❯';
//       rightBtn.onclick = () => scrollCarousel(rightBtn, 1);
//       carouselContainer.appendChild(rightBtn);

//       if (post.count > 1) {
//         carouselContainer.appendChild(dotsContainer);
//       }

//       postDiv.appendChild(carouselContainer);

//       // Description
//       if (post.description) {
//         const descriptionDiv = document.createElement('div');
//         descriptionDiv.classList.add('post-description');
//         descriptionDiv.textContent = post.description;
//         postDiv.appendChild(descriptionDiv);
//       }

//       feed.appendChild(postDiv);
//     });
//     initCarousels();
//   } catch (error) {
//     console.error('Failed to fetch posts:', error);
//   }
// }

// function initCarousels() {
//   document.querySelectorAll('.carousel').forEach(carousel => {
//     let isDragging = false;
//     let startX;
//     let scrollStart;
//     let lastX;
//     let lastTime;
//     let velocity = 0;

//     const leftArrow = carousel.parentElement.querySelector('.arrow.left');
//     const rightArrow = carousel.parentElement.querySelector('.arrow.right');
//     const dots = carousel.parentElement.querySelectorAll('.dot');

//     function updateCarouselUI() {
//       const scrollLeft = carousel.scrollLeft;
//       const imageWidth = carousel.clientWidth || 1;
//       const currentIndex = Math.round(scrollLeft / imageWidth);

//       dots.forEach((dot, index) => {
//         dot.classList.toggle('active', index === currentIndex);
//       });

//       if (dots.length <= 1) {
//         leftArrow.style.display = 'none';
//         rightArrow.style.display = 'none';
//       } else {
//         leftArrow.style.display = currentIndex === 0 ? 'none' : 'block';
//         rightArrow.style.display = currentIndex === dots.length - 1 ? 'none' : 'block';
//       }
//     }
//     updateCarouselUI();

//     dots.forEach(dot => {
//       dot.addEventListener('click', () => {
//         const imageWidth = carousel.clientWidth;
//         const index = parseInt(dot.dataset.index, 10);
//         carousel.scrollTo({ left: imageWidth * index, behavior: 'smooth' });
//       });
//     });

//     carousel.addEventListener('mousedown', (e) => {
//       isDragging = true;
//       carousel.classList.add('dragging');
//       carousel.style.scrollSnapType = 'none';
//       carousel.style.scrollBehavior = 'auto';
//       startX = e.clientX;
//       scrollStart = carousel.scrollLeft;
//       lastX = e.clientX;
//       lastTime = Date.now();
//       velocity = 0;
//       e.preventDefault();
//     });

//     document.addEventListener('mouseup', () => {
//       if (!isDragging) return;
//       isDragging = false;
//       carousel.classList.remove('dragging');
//       carousel.style.scrollSnapType = 'x mandatory';
//       carousel.style.scrollBehavior = 'smooth';

//       const imageWidth = carousel.clientWidth;
//       const currentIndex = Math.round(scrollStart / imageWidth);

//       // Calculate momentum scroll distance
//       let momentumDistance = velocity * 200;
//       // Clamp momentum distance to one image width
//       momentumDistance = Math.max(-imageWidth, Math.min(momentumDistance, imageWidth));

//       let tentativeScroll = carousel.scrollLeft - momentumDistance;
//       let targetIndex = Math.round(tentativeScroll / imageWidth);

//       // Clamp target index to within one slide move
//       if (targetIndex > currentIndex + 1) targetIndex = currentIndex + 1;
//       if (targetIndex < currentIndex - 1) targetIndex = currentIndex - 1;

//       const maxIndex = Math.floor((carousel.scrollWidth - carousel.clientWidth) / imageWidth);
//       targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));

//       carousel.scrollTo({ left: targetIndex * imageWidth, behavior: 'smooth' });
//       updateCarouselUI();
//     });

//     document.addEventListener('mousemove', (e) => {
//       if (!isDragging) return;

//       const now = Date.now();
//       const dx = e.clientX - lastX;
//       const dt = now - lastTime;
//       velocity = dt > 0 ? dx / dt : 0;
//       lastX = e.clientX;
//       lastTime = now;

//       const deltaX = e.clientX - startX;
//       const maxScroll = carousel.scrollWidth - carousel.clientWidth;
//       const imageWidth = carousel.clientWidth;

//       let desiredScroll = scrollStart - deltaX;

//       // Clamp desiredScroll to prevent over-scrolling beyond one image at either edge
//       const minScroll = Math.max(0, scrollStart - imageWidth);
//       const maxAllowedScroll = Math.min(maxScroll, scrollStart + imageWidth);

//       if (desiredScroll < minScroll) desiredScroll = minScroll;
//       if (desiredScroll > maxAllowedScroll) desiredScroll = maxAllowedScroll;

//       carousel.scrollLeft = desiredScroll;
//     });

//     carousel.addEventListener('scroll', () => {
//       requestAnimationFrame(updateCarouselUI);
//     });

//     // Prevent default dragstart behavior on images to avoid glitches
//     carousel.querySelectorAll('img').forEach(img => {
//       img.setAttribute('draggable', 'false');
//       img.addEventListener('dragstart', e => e.preventDefault());
//       // **Fix for last image glitch: stop propagation of click events on last image**
//       // We'll stop the click event on the last image so it doesn't trigger unwanted carousel scroll
//       // Identify last image in the carousel
//       const images = Array.from(carousel.querySelectorAll('img'));
//       const lastImage = images[images.length - 1];
//       if (img === lastImage) {
//         img.addEventListener('click', e => {
//           // Prevent click event bubbling that triggers carousel scroll back
//           e.stopPropagation();
//         });
//       }
//     });
//   });
// }

// function scrollCarousel(button, direction) {
//   const carousel = button.parentElement.querySelector('.carousel');
//   const imageWidth = carousel.clientWidth;
//   carousel.scrollBy({ left: imageWidth * direction, behavior: 'smooth' });
// }
function createPost(postData) {
  // Create the HTML structure
  const postElement = document.createElement('div');
  postElement.classList.add('post');

  // postElement.innerHTML = `
  //   <div class="post-header">${postData.user}</div>
  //   <div class="swiper">
  //     <div class="swiper-wrapper">
  //       ${Array.from({length: postData.count}, (_, i) => (i + 1).toString().padStart(2, '0')).map(imageNum => `
  //         <div class="swiper-slide">
  //           <img src="http://127.0.0.1:5000/image?blob_name=${postData.id}-${imageNum}" alt="Image" draggable="false"/>
  //         </div>
  //       `).join('')}
  //     </div>
  //     <div class="swiper-button-prev"></div>
  //     <div class="swiper-button-next"></div>
  //     <div class="swiper-pagination"></div>
  //   </div>
  //   <div class="post-caption">${postData.caption}</div>
  // `;

  postElement.innerHTML = `
    <div class="post-header">${postData.user}</div>
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
    <div class="post-caption">${postData.caption}</div>
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
        }
      }
    });
  })
});