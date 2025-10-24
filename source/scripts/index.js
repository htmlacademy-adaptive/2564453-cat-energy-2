/* в этот файл добавляет скрипты*/

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.main-navigation__toggle');
  const menuList = document.querySelector('.main-navigation__list');

  if (toggleButton && menuList) {
    toggleButton.addEventListener('click', () => {
      toggleButton.classList.toggle('active');
      menuList.classList.toggle('main-navigation__list--open');

      const isExpanded = toggleButton.classList.contains('active');
      toggleButton.setAttribute('aria-expanded', isExpanded);
      menuList.setAttribute('aria-hidden', !isExpanded);
    });
  }

  const demonstrationBlock = document.querySelector('.demonstration');
  const beforeImage = demonstrationBlock.querySelector('.demonstration__demonstration-image--before');
  const afterImage = demonstrationBlock.querySelector('.demonstration__demonstration-image--after');
  const slider = demonstrationBlock.querySelector('.demonstration__slider');
  let isMoving = false;

  const updateSliderPosition = (clientX) => {
    const demonstrationRect = demonstrationBlock.getBoundingClientRect();
    let relativeX = clientX - demonstrationRect.left;

    relativeX = Math.max(0, Math.min(relativeX, demonstrationRect.width));

    const percentage = (relativeX / demonstrationRect.width) * 100;

    setSliderPosition(percentage);
  };

  const setSliderPosition = (percentage) => {
    slider.style.left = `${percentage}%`;

    beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;

    afterImage.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;

    slider.setAttribute('aria-valuenow', Math.round(percentage));
  };

  setSliderPosition(50);

  slider.addEventListener('mousedown', (e) => {
    isMoving = true;
    e.preventDefault();
  });

  slider.addEventListener('touchstart', (e) => {
    isMoving = true;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isMoving) {
      updateSliderPosition(e.clientX);
    }
  });

  document.addEventListener('touchmove', (e) => {
    if (isMoving) {
      updateSliderPosition(e.touches[0].clientX);
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('mouseup', () => {
    isMoving = false;
  });

  document.addEventListener('touchend', () => {
    isMoving = false;
  });

  slider.addEventListener('touchmove', (e) => {
    if (isMoving) {
      e.preventDefault();
    }
  }, { passive: false });

  const mapContainer = document.querySelector('.footer__map-container');
  const iframe = mapContainer.querySelector('.footer__map');

  iframe.addEventListener('load', () => {
    iframe.dataset.loaded = 'true';
  });

  setTimeout(() => {
    if (!iframe.dataset.loaded) {
      mapContainer.classList.add('footer__map-container--error');
    }
  }, 4000);
});
