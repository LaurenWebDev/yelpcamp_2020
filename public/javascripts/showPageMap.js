mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 9 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

const marker = new mapboxgl.Marker({
  draggable: true
  }).setLngLat(campground.geometry.coordinates)
  /*.setPopup(
    new mapboxgl.Popup({offset: 25})
    .setHTML(
      `<h5>${campground.title}</h5><p>${campground.location}`
    )
  )*/
  .addTo(map);
