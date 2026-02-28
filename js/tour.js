/* ====================================================
   tour.js — Tour Product Detail Page Logic
   ==================================================== */

(function () {
  'use strict';

  // ---- State ----
  let tour = null;
  let lightboxIndex = 0;
  const wishlist = JSON.parse(localStorage.getItem('wd_wishlist') || '[]');

  // ---- DOM refs ----
  const loadingEl    = document.getElementById('loading-state');
  const contentEl    = document.getElementById('tour-content');
  const notFoundEl   = document.getElementById('not-found-state');
  const toastEl      = document.getElementById('toast');

  // ---- Init ----
  function init() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug') || '';

    tour = getTourBySlug(slug);

    if (!tour) {
      loadingEl.style.display = 'none';
      notFoundEl.style.display = 'block';
      return;
    }

    populatePage();
    bindEvents();

    loadingEl.style.display = 'none';
    contentEl.style.display = 'block';
  }

  // ---- Page Population ----
  function populatePage() {
    // Meta
    document.getElementById('page-title').textContent = `${tour.title} | WanderDay`;
    document.getElementById('page-desc').setAttribute('content', tour.shortDescription);

    // Breadcrumb
    document.getElementById('bc-location').textContent = tour.location;
    document.getElementById('bc-title').textContent = truncate(tour.title, 50);

    // Gallery
    buildGallery();

    // Header
    buildTourHeader();

    // Highlights
    buildHighlights();

    // Tabs content
    buildOverview();
    buildItinerary();
    buildInclusions();
    buildReviews();

    // Booking widget
    buildBookingWidget();

    // Related tours
    buildRelatedTours();

    // Header search redirect
    const headerSearch = document.getElementById('header-search');
    if (headerSearch) {
      headerSearch.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && this.value.trim()) {
          window.location.href = `tours.html?q=${encodeURIComponent(this.value.trim())}`;
        }
      });
    }
  }

  // ---- Gallery ----
  function buildGallery() {
    const galleryEl = document.getElementById('photo-gallery');
    const photos = tour.photos;

    if (!photos || photos.length === 0) return;

    const mainImg = photos[0];
    const thumbs  = photos.slice(1, 5);
    const total   = photos.length;

    const thumbsHTML = thumbs.map((src, i) => {
      const isLast = i === thumbs.length - 1 && total > 5;
      return `
        <div class="gallery-thumb" data-index="${i + 1}" role="button" tabindex="0" aria-label="View photo ${i + 2}">
          <img src="${src}" alt="${escapeHTML(tour.title)} — photo ${i + 2}" loading="lazy" />
          ${isLast ? `<button class="gallery-more-btn" id="gallery-more-btn" aria-label="View all ${total} photos">+${total - 4} photos</button>` : ''}
        </div>`;
    }).join('');

    galleryEl.innerHTML = `
      <div class="gallery-main" data-index="0" role="button" tabindex="0" aria-label="View main photo">
        <img src="${mainImg}" alt="${escapeHTML(tour.title)}" />
      </div>
      ${thumbsHTML}
    `;
  }

  // ---- Tour Header ----
  function buildTourHeader() {
    // Category badge
    const catBadge = document.getElementById('tour-category-badge');
    catBadge.textContent = tour.category;
    catBadge.className = 'badge badge-outline';

    // Location
    document.getElementById('tour-location-badge').innerHTML =
      `📍 <strong>${escapeHTML(tour.location)}</strong>`;

    // Title
    document.getElementById('tour-title').textContent = tour.title;

    // Quick stats
    const statsEl = document.getElementById('tour-quick-stats');
    statsEl.innerHTML = `
      <div class="quick-stat">
        <span class="quick-stat-icon">⏱</span>
        <span><strong>${escapeHTML(tour.duration)}</strong></span>
      </div>
      <div class="quick-stat">
        <span class="quick-stat-icon">👥</span>
        <span>Max <strong>${tour.maxGroupSize} guests</strong></span>
      </div>
      <div class="quick-stat">
        <span class="quick-stat-icon">🗣</span>
        <span>Guided in <strong>${tour.languages.join(', ')}</strong></span>
      </div>
      <div class="quick-stat">
        <span class="quick-stat-icon">🏃</span>
        <span class="badge ${getDifficultyClass(tour.difficulty)}">${escapeHTML(tour.difficulty)}</span>
      </div>
    `;

    // Rating row
    const ratingRow = document.getElementById('tour-rating-row');
    ratingRow.innerHTML = `
      ${getStarHTML(tour.rating)}
      <span class="rating-value">${tour.rating.toFixed(1)}</span>
      <span class="rating-count">${tour.reviewCount.toLocaleString()} reviews</span>
    `;
  }

  // ---- Highlights ----
  function buildHighlights() {
    const listEl = document.getElementById('highlights-list');
    listEl.innerHTML = tour.highlights.map(h =>
      `<li>${escapeHTML(h)}</li>`
    ).join('');
  }

  // ---- Overview Tab ----
  function buildOverview() {
    document.getElementById('tour-description').textContent = tour.description;
    document.getElementById('meeting-point-text').textContent = tour.meetingPoint;
  }

  // ---- Itinerary Tab ----
  function buildItinerary() {
    const listEl = document.getElementById('itinerary-list');
    listEl.innerHTML = tour.schedule.map((item, i) => `
      <div class="itinerary-item">
        <div class="itinerary-time">${escapeHTML(item.time)}</div>
        <div class="itinerary-dot" aria-hidden="true"></div>
        ${i < tour.schedule.length - 1 ? '<div class="itinerary-line" aria-hidden="true"></div>' : ''}
        <div class="itinerary-content">
          <div class="itinerary-activity">${escapeHTML(item.activity)}</div>
          <div class="itinerary-desc">${escapeHTML(item.description)}</div>
        </div>
      </div>
    `).join('');
  }

  // ---- Inclusions Tab ----
  function buildInclusions() {
    const inclEl = document.getElementById('inclusions-list');
    const exclEl = document.getElementById('exclusions-list');
    const cancEl = document.getElementById('cancellation-text');

    inclEl.innerHTML = tour.inclusions.map(item =>
      `<li><span class="inc-icon inc-yes" aria-hidden="true">✓</span>${escapeHTML(item)}</li>`
    ).join('');

    exclEl.innerHTML = tour.exclusions.map(item =>
      `<li><span class="inc-icon inc-no" aria-hidden="true">✕</span>${escapeHTML(item)}</li>`
    ).join('');

    cancEl.textContent = tour.cancellationPolicy;
  }

  // ---- Reviews Tab ----
  function buildReviews() {
    const summaryEl = document.getElementById('reviews-summary');
    const cardsEl   = document.getElementById('review-cards');

    // Rating breakdown (simulated percentages)
    const breakdowns = [
      { stars: '5 ★', pct: 78 },
      { stars: '4 ★', pct: 16 },
      { stars: '3 ★', pct: 4 },
      { stars: '2 ★', pct: 1 },
      { stars: '1 ★', pct: 1 },
    ];

    summaryEl.innerHTML = `
      <div class="reviews-big-score">
        <div class="reviews-big-number">${tour.rating.toFixed(1)}</div>
        <div class="reviews-big-stars">${getStarHTML(tour.rating)}</div>
        <div class="reviews-big-count">${tour.reviewCount.toLocaleString()} reviews</div>
      </div>
      <div class="reviews-breakdown">
        ${breakdowns.map(b => `
          <div class="rating-bar-row">
            <span class="rating-bar-label">${b.stars}</span>
            <div class="rating-bar-track">
              <div class="rating-bar-fill" style="width:${b.pct}%;" role="meter" aria-valuenow="${b.pct}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <span class="rating-bar-pct">${b.pct}%</span>
          </div>
        `).join('')}
      </div>
    `;

    cardsEl.innerHTML = tour.reviews.map(review => `
      <div class="review-card">
        <div class="review-header">
          <div class="review-avatar" aria-hidden="true">${escapeHTML(review.avatar)}</div>
          <div>
            <div class="review-author">${escapeHTML(review.name)}</div>
            <div class="review-date">${escapeHTML(review.date)}</div>
          </div>
          <div class="review-stars" aria-label="${review.rating} out of 5 stars">
            ${getStarHTML(review.rating)}
          </div>
        </div>
        <p class="review-text">${escapeHTML(review.comment)}</p>
      </div>
    `).join('');
  }

  // ---- Booking Widget ----
  function buildBookingWidget() {
    const priceRow = document.getElementById('booking-price-row');
    const ratingRow = document.getElementById('booking-rating-row');
    const totalEl = document.getElementById('booking-total');
    const guestsEl = document.getElementById('book-guests');
    const dateEl   = document.getElementById('book-date');
    const langEl   = document.getElementById('booking-languages');
    const cancInfoEl = document.getElementById('cancellation-info-text');

    const discount = tour.originalPrice
      ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
      : 0;

    priceRow.innerHTML = `
      <span class="booking-price">$${tour.price}</span>
      <span class="booking-price-per">/ person</span>
      ${tour.originalPrice ? `<span class="booking-original-price">$${tour.originalPrice}</span>` : ''}
      ${discount > 0 ? `<span class="booking-saving">Save ${discount}%</span>` : ''}
    `;

    ratingRow.innerHTML = `
      ${getStarHTML(tour.rating)}
      <span class="rating-value">${tour.rating.toFixed(1)}</span>
      <span class="rating-count">(${tour.reviewCount.toLocaleString()} reviews)</span>
    `;

    langEl.textContent = `Guided in ${tour.languages.join(', ')}`;
    cancInfoEl.textContent = tour.cancellationPolicy;

    // Set min date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateEl.min = tomorrow.toISOString().split('T')[0];

    function updateTotal() {
      const guests = parseInt(guestsEl.value, 10) || 1;
      const total = guests * tour.price;
      totalEl.textContent = `$${total.toLocaleString()}`;
    }

    guestsEl.addEventListener('change', updateTotal);
    updateTotal();

    // Dynamically update max guests
    const maxGroup = tour.maxGroupSize;
    Array.from(guestsEl.options).forEach(opt => {
      if (parseInt(opt.value, 10) > maxGroup) opt.disabled = true;
    });
  }

  // ---- Related Tours ----
  function buildRelatedTours() {
    const gridEl = document.getElementById('related-grid');
    const related = TOURS_DATA
      .filter(t => t.id !== tour.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    gridEl.innerHTML = related.map(t => `
      <a class="related-card" href="tour.html?slug=${t.slug}" aria-label="${escapeHTML(t.title)}">
        <div class="related-card-img">
          <img src="${t.photos[0]}" alt="${escapeHTML(t.title)}" loading="lazy" />
        </div>
        <div class="related-card-body">
          <div class="related-card-location">📍 ${escapeHTML(t.location)}</div>
          <div class="related-card-title">${escapeHTML(t.title)}</div>
          <div class="related-card-footer">
            <div class="related-card-rating">
              ${getStarHTML(t.rating)}
              <span>${t.rating.toFixed(1)}</span>
            </div>
            <div class="related-card-price">$${t.price}</div>
          </div>
        </div>
      </a>
    `).join('');
  }

  // ---- Lightbox ----
  function openLightbox(index) {
    const photos = tour.photos;
    lightboxIndex = index;

    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const thumbsEl = document.getElementById('lightbox-thumbs');

    img.src = photos[lightboxIndex];
    img.alt = `${tour.title} — photo ${lightboxIndex + 1}`;

    thumbsEl.innerHTML = photos.map((src, i) => `
      <img
        src="${src}"
        alt="Photo ${i + 1}"
        class="${i === lightboxIndex ? 'active' : ''}"
        data-index="${i}"
        role="listitem"
        tabindex="0"
      />
    `).join('');

    thumbsEl.querySelectorAll('img').forEach(thumb => {
      thumb.addEventListener('click', () => {
        lightboxIndex = parseInt(thumb.dataset.index, 10);
        updateLightbox();
      });
    });

    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('lightbox-close').focus();
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const photos = tour.photos;
    const img = document.getElementById('lightbox-img');
    const thumbsEl = document.getElementById('lightbox-thumbs');

    lightboxIndex = (lightboxIndex + photos.length) % photos.length;
    img.src = photos[lightboxIndex];
    img.alt = `${tour.title} — photo ${lightboxIndex + 1}`;

    thumbsEl.querySelectorAll('img').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === lightboxIndex);
    });
  }

  // ---- Tabs ----
  function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `tab-${tabName}`);
    });
  }

  // ---- Booking Form ----
  function handleBooking(e) {
    e.preventDefault();
    const dateEl   = document.getElementById('book-date');
    const guestsEl = document.getElementById('book-guests');

    if (!dateEl.value) {
      showToast('Please select a date', 'error');
      dateEl.focus();
      return;
    }

    const guests  = parseInt(guestsEl.value, 10);
    const total   = guests * tour.price;
    const dateStr = new Date(dateEl.value).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    showToast(`🎉 Booking request sent for ${guests} guest${guests > 1 ? 's' : ''} on ${dateStr} — Total: $${total}`, 'success');
  }

  // ---- Toast ----
  function showToast(msg, type = '') {
    toastEl.textContent = msg;
    toastEl.className = 'toast' + (type ? ' ' + type : '');
    toastEl.classList.add('show');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => toastEl.classList.remove('show'), 3500);
  }

  // ---- Helpers ----
  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function truncate(str, max) {
    return str.length > max ? str.slice(0, max) + '…' : str;
  }

  // ---- Event Bindings ----
  function bindEvents() {
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
      btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchTab(btn.dataset.tab); }
      });
    });

    // Gallery click → lightbox
    const galleryEl = document.getElementById('photo-gallery');
    if (galleryEl) {
      galleryEl.addEventListener('click', function (e) {
        const target = e.target.closest('[data-index]');
        if (target && !e.target.closest('#gallery-more-btn')) {
          openLightbox(parseInt(target.dataset.index, 10));
        }
        if (e.target.closest('#gallery-more-btn')) {
          openLightbox(0);
        }
      });

      galleryEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          const target = e.target.closest('[data-index]');
          if (target) { e.preventDefault(); openLightbox(parseInt(target.dataset.index, 10)); }
        }
      });
    }

    // Lightbox controls
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', () => { lightboxIndex--; updateLightbox(); });
    document.getElementById('lightbox-next').addEventListener('click', () => { lightboxIndex++; updateLightbox(); });

    document.getElementById('lightbox').addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });

    // Keyboard for lightbox
    document.addEventListener('keydown', function (e) {
      const lb = document.getElementById('lightbox');
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft')  { lightboxIndex--; updateLightbox(); }
      if (e.key === 'ArrowRight') { lightboxIndex++; updateLightbox(); }
    });

    // Booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) bookingForm.addEventListener('submit', handleBooking);
  }

  // ---- Bootstrap ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
