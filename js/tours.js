/* ====================================================
   tours.js — Search Results Page Logic
   ==================================================== */

(function () {
  'use strict';

  // ---- State ----
  const state = {
    tours: [...TOURS_DATA],
    filtered: [...TOURS_DATA],
    searchQuery: '',
    categories: [],
    durations: [],
    difficulties: [],
    minPrice: null,
    maxPrice: null,
    minRating: 0,
    sort: 'relevance',
    wishlist: JSON.parse(localStorage.getItem('wd_wishlist') || '[]'),
  };

  // ---- DOM refs ----
  const cardsEl       = document.getElementById('tour-cards');
  const countEl       = document.getElementById('results-count');
  const contextEl     = document.getElementById('results-context');
  const noResultsEl   = document.getElementById('no-results');
  const sortSelect    = document.getElementById('sort-select');
  const clearBtn      = document.getElementById('clear-filters-btn');
  const applyBtn      = document.getElementById('apply-filters-btn');
  const resetBtn      = document.getElementById('reset-btn');
  const headerSearch  = document.getElementById('header-search-input');
  const sfDestination = document.getElementById('sf-destination');
  const sfDate        = document.getElementById('sf-date');
  const searchForm    = document.getElementById('search-form');
  const mobileFilter  = document.getElementById('mobile-filter-btn');
  const filtersSidebar = document.getElementById('filters-sidebar');
  const toastEl       = document.getElementById('toast');
  const priceMin      = document.getElementById('price-min');
  const priceMax      = document.getElementById('price-max');

  // ---- Init ----
  function init() {
    // Populate from URL params
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    if (q) {
      state.searchQuery = q;
      if (headerSearch) headerSearch.value = q;
      if (sfDestination) sfDestination.value = q;
    }

    renderCards();
    bindEvents();
  }

  // ---- Render ----
  function renderCards() {
    applyFilters();
    sortResults();

    const tours = state.filtered;
    countEl.textContent = tours.length;
    contextEl.textContent = state.searchQuery ? ` matching "${state.searchQuery}"` : '';

    if (tours.length === 0) {
      cardsEl.innerHTML = '';
      noResultsEl.style.display = 'block';
      return;
    }

    noResultsEl.style.display = 'none';
    cardsEl.innerHTML = tours.map(createCardHTML).join('');

    // Bind wishlist buttons after render
    cardsEl.querySelectorAll('.tour-card-wishlist').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(this.dataset.id, this);
      });
    });

    // Bind card clicks
    cardsEl.querySelectorAll('.tour-card').forEach(card => {
      card.addEventListener('click', function (e) {
        if (e.target.closest('.tour-card-wishlist')) return;
        window.location.href = `tour.html?slug=${this.dataset.slug}`;
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = `tour.html?slug=${this.dataset.slug}`;
        }
      });
    });
  }

  function createCardHTML(tour) {
    const inWishlist = state.wishlist.includes(tour.id);
    const discount = tour.originalPrice
      ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
      : 0;

    const highlightPills = tour.highlights.slice(0, 3).map(h =>
      `<span class="highlight-pill">${escapeHTML(h)}</span>`
    ).join('');

    return `
    <article
      class="tour-card"
      role="listitem"
      data-id="${tour.id}"
      data-slug="${tour.slug}"
      tabindex="0"
      aria-label="${escapeHTML(tour.title)}"
    >
      <div class="tour-card-img">
        <img
          src="${tour.photos[0]}"
          alt="${escapeHTML(tour.title)}"
          loading="lazy"
          width="280"
          height="220"
        />
        ${tour.featured ? '<div class="tour-card-badge"><span class="badge badge-featured">⭐ Featured</span></div>' : ''}
        <button
          class="tour-card-wishlist${inWishlist ? ' active' : ''}"
          data-id="${tour.id}"
          aria-label="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}"
          title="${inWishlist ? 'Remove from wishlist' : 'Save tour'}"
        >${inWishlist ? '❤️' : '🤍'}</button>
      </div>

      <div class="tour-card-body">
        <div>
          <div class="tour-card-meta">
            <span class="tour-card-location">📍 ${escapeHTML(tour.location)}</span>
            <span class="tour-card-category">${escapeHTML(tour.category)}</span>
            ${discount > 0 ? `<span class="badge badge-primary">-${discount}%</span>` : ''}
          </div>

          <h2 class="tour-card-title">${escapeHTML(tour.title)}</h2>
          <p class="tour-card-desc">${escapeHTML(tour.shortDescription)}</p>

          <div class="tour-card-highlights">
            ${highlightPills}
          </div>
        </div>

        <div class="tour-card-footer">
          <div class="tour-card-stats">
            <span class="tour-stat">
              <span class="tour-stat-icon">⏱</span>
              ${escapeHTML(tour.duration)}
            </span>
            <span class="tour-stat">
              <span class="tour-stat-icon">👥</span>
              Max ${tour.maxGroupSize}
            </span>
            <span class="rating-row">
              ${getStarHTML(tour.rating)}
              <span class="rating-value">${tour.rating.toFixed(1)}</span>
              <span class="rating-count">(${tour.reviewCount.toLocaleString()})</span>
            </span>
            <span class="badge ${getDifficultyClass(tour.difficulty)}">${escapeHTML(tour.difficulty)}</span>
          </div>

          <div class="tour-card-price">
            <div class="price-from">
              From
              ${tour.originalPrice ? `<span class="price-original">$${tour.originalPrice}</span>` : ''}
            </div>
            <div>
              <span class="price-amount">$${tour.price}</span>
              <span class="price-per">/ person</span>
            </div>
          </div>
        </div>
      </div>
    </article>`;
  }

  // ---- Filter Logic ----
  function applyFilters() {
    let results = [...state.tours];

    // Text search
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      results = results.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Category
    if (state.categories.length > 0) {
      results = results.filter(t => state.categories.includes(t.category));
    }

    // Duration
    if (state.durations.length > 0) {
      results = results.filter(t => {
        const h = t.durationHours;
        return state.durations.some(d => {
          if (d === 'short') return h < 6;
          if (d === 'half')  return h >= 6 && h <= 9;
          if (d === 'full')  return h >= 10 && h <= 12;
          if (d === 'long')  return h > 12;
          return false;
        });
      });
    }

    // Difficulty
    if (state.difficulties.length > 0) {
      results = results.filter(t => state.difficulties.includes(t.difficulty));
    }

    // Price range
    if (state.minPrice !== null) {
      results = results.filter(t => t.price >= state.minPrice);
    }
    if (state.maxPrice !== null) {
      results = results.filter(t => t.price <= state.maxPrice);
    }

    // Rating
    if (state.minRating > 0) {
      results = results.filter(t => t.rating >= state.minRating);
    }

    state.filtered = results;
  }

  function sortResults() {
    const arr = state.filtered;
    switch (state.sort) {
      case 'rating':
        arr.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        arr.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        arr.sort((a, b) => b.price - a.price);
        break;
      case 'reviews':
        arr.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'relevance':
      default:
        // Featured first, then by rating
        arr.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }
  }

  function readFilters() {
    // Categories
    state.categories = Array.from(
      document.querySelectorAll('input[name="category"]:checked')
    ).map(el => el.value);

    // Durations
    state.durations = Array.from(
      document.querySelectorAll('input[name="duration"]:checked')
    ).map(el => el.value);

    // Difficulties
    state.difficulties = Array.from(
      document.querySelectorAll('input[name="difficulty"]:checked')
    ).map(el => el.value);

    // Price
    const minVal = parseFloat(priceMin.value);
    const maxVal = parseFloat(priceMax.value);
    state.minPrice = isNaN(minVal) ? null : minVal;
    state.maxPrice = isNaN(maxVal) ? null : maxVal;

    // Rating
    const ratingEl = document.querySelector('input[name="rating"]:checked');
    state.minRating = ratingEl ? parseFloat(ratingEl.value) : 0;
  }

  function clearAllFilters() {
    document.querySelectorAll('input[name="category"]').forEach(el => el.checked = false);
    document.querySelectorAll('input[name="duration"]').forEach(el => el.checked = false);
    document.querySelectorAll('input[name="difficulty"]').forEach(el => el.checked = false);
    const anyRating = document.querySelector('input[name="rating"][value="0"]');
    if (anyRating) anyRating.checked = true;
    priceMin.value = '';
    priceMax.value = '';
    if (headerSearch) headerSearch.value = '';
    if (sfDestination) sfDestination.value = '';
    state.searchQuery = '';
    state.categories = [];
    state.durations = [];
    state.difficulties = [];
    state.minPrice = null;
    state.maxPrice = null;
    state.minRating = 0;
    renderCards();
  }

  // ---- Wishlist ----
  function toggleWishlist(id, btn) {
    const idx = state.wishlist.indexOf(id);
    if (idx === -1) {
      state.wishlist.push(id);
      btn.textContent = '❤️';
      btn.classList.add('active');
      btn.setAttribute('aria-label', 'Remove from wishlist');
      showToast('Saved to your wishlist', 'success');
    } else {
      state.wishlist.splice(idx, 1);
      btn.textContent = '🤍';
      btn.classList.remove('active');
      btn.setAttribute('aria-label', 'Add to wishlist');
      showToast('Removed from wishlist');
    }
    localStorage.setItem('wd_wishlist', JSON.stringify(state.wishlist));
  }

  // ---- Toast ----
  function showToast(msg, type = '') {
    toastEl.textContent = msg;
    toastEl.className = 'toast' + (type ? ' ' + type : '');
    toastEl.classList.add('show');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => toastEl.classList.remove('show'), 2800);
  }

  // ---- Helpers ----
  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ---- Events ----
  function bindEvents() {
    // Sort
    sortSelect.addEventListener('change', function () {
      state.sort = this.value;
      renderCards();
    });

    // Apply filters button
    if (applyBtn) {
      applyBtn.addEventListener('click', function () {
        readFilters();
        renderCards();
        // Close mobile sidebar
        filtersSidebar.classList.remove('mobile-open');
        mobileFilter.setAttribute('aria-expanded', 'false');
      });
    }

    // Clear filters
    if (clearBtn) {
      clearBtn.addEventListener('click', clearAllFilters);
    }

    // Reset button (no-results state)
    if (resetBtn) {
      resetBtn.addEventListener('click', clearAllFilters);
    }

    // Search form submit
    if (searchForm) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        state.searchQuery = (sfDestination.value || '').trim();
        if (headerSearch) headerSearch.value = state.searchQuery;
        renderCards();
      });
    }

    // Header search input
    if (headerSearch) {
      let searchTimer;
      headerSearch.addEventListener('input', function () {
        clearTimeout(searchTimer);
        const q = this.value.trim();
        searchTimer = setTimeout(() => {
          state.searchQuery = q;
          if (sfDestination) sfDestination.value = q;
          renderCards();
        }, 300);
      });
    }

    // Mobile filter toggle
    if (mobileFilter) {
      mobileFilter.addEventListener('click', function () {
        const isOpen = filtersSidebar.classList.toggle('mobile-open');
        this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // Live filter on checkbox/radio change
    document.querySelectorAll('input[name="category"], input[name="duration"], input[name="difficulty"], input[name="rating"]')
      .forEach(el => {
        el.addEventListener('change', function () {
          readFilters();
          renderCards();
        });
      });

    // Price inputs — apply on blur
    [priceMin, priceMax].forEach(el => {
      if (el) {
        el.addEventListener('change', function () {
          readFilters();
          renderCards();
        });
      }
    });
  }

  // ---- Bootstrap ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
