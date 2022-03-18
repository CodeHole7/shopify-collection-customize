document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.collection-handle').forEach((el) => {
    el.addEventListener('click', function () {
      const collection_handle = el.getAttribute('data-collection-handle');
      getAjaxCollection(collection_handle);

      const url = new URL(window.location);
      url.searchParams.set('handle', collection_handle);

      window.history.pushState({}, '', url);
    });
  });

  function getAjaxCollection(collection_handle) {

    fetch(`/collections/${collection_handle}?section_id=collection-ajax-content`)
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        document.querySelector('#collection-ajax-content').innerHTML = state;
      }).catch(() => {

      });
  }

  function initCollection() {
    let first_collection_handle = document.querySelectorAll('.collection-handle')[0].getAttribute('data-collection-handle');
    getAjaxCollection(first_collection_handle);
  }

  function initSlide() {
    const slidebar = document.getElementById('slide');
    const collections = document.querySelectorAll('.tab-label-content')
    slidebar.style.width = `calc(100% / ${collections.length}`;
    for (let i in collections) {
      const el = collections[i];
      const width = el.clientWidth;
      el.onclick = () => {
        slidebar.style.left = `${width * i}px`;
      }
    }

  }

  initCollection();
  initSlide();

});