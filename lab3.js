mapboxgl.accessToken = 'pk.eyJ1IjoicGhvZWJlY2hvdyIsImEiOiJjazYyOW1uMngwNzU3M2xxdjg2djRla2ttIn0.3TfoZyTMstZ1O0t8SMzcNw';
var map = new mapboxgl.Map({
    container: 'map', //container id in HTML
    style: 'mapbox://styles/phoebechow/ck7kufr4s4mze1ips3u4i7ice', //stylesheet location
    center: [-79.35, 43.72],  //starting point, longitude/latitude
    zoom: 10, // starting zoom level
    bearing: -17
});

map.on('style.load', function(){
    //add source for toronto dissemination areas 
    map.addSource('toronto-da',{
        'type': 'vector',
        'url': 'mapbox://phoebechow.azv4mzik'
    });
    //add layer for population density by dissemination areas
    map.addLayer({
        'id': 'pop-density',
        'type': 'fill',
        'source': 'toronto-da',
        'layout': {},
        'source-layer': 'pop-den-da-2-bnw2y5',
        'paint': {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['to-number',['get', 'jh9TA44b_1'],0], // get a number, but if provided with a non-number default to 0
              //symbology classified into 6 quantiles
              0, '#f7f7f7',
              2958.90, '#d9d9d9',
              4258.90, '#bdbdbd',
              6039.90, '#969696',
              8465.20, '#737373',
              12465.80, '#525252', 
              4832272.70, '#252525'
            ],
            'fill-opacity': 0.4,
            //'fill-outline-color': '#737373'
        }
    });
    //add source subway line 
    map.addSource('subway',{
        'type': 'vector',
        'url': 'mapbox://phoebechow.5exk7hs1'
    });
    //add layer for bloor-yonge line 1
    map.addLayer({
        'id': 'line1',
        'type': 'line',
        'source': 'subway',
        'layout': {},
        'source-layer': 'ttc-subway-shapefile-wgs84-ar1kzt',
        'paint': {
            'line-color': '#ffcb0c',
            'line-width': 5,
            'line-opacity': 0.6
        }, 
        'filter': ['==','RID', 1]
    });
    //add layer for bloor-danforth line 2
    map.addLayer({
        'id': 'line2',
        'type': 'line',
        'source': 'subway',
        'layout': {},
        'source-layer': 'ttc-subway-shapefile-wgs84-ar1kzt',
        'paint': {
            'line-color': '#16a753',
            'line-width': 5,
            'line-opacity': 0.6
        },
        'filter': ['==','RID', 2]
    });
    //add layer for scarborough line 3
    map.addLayer({
        'id': 'line3',
        'type': 'line',
        'source': 'subway',
        'layout': {},
        'source-layer': 'ttc-subway-shapefile-wgs84-ar1kzt',
        'paint': {
            'line-color': '#1f99d5',
            'line-width': 5,
            'line-opacity': 0.6
        }, 
        'filter': ['==','RID', 3]
    });
    //add layer for sheppard line 4
    map.addLayer({
        'id': 'line4',
        'type': 'line',
        'source': 'subway',
        'layout': {},
        'source-layer': 'ttc-subway-shapefile-wgs84-ar1kzt',
        'paint': {
            'line-color': '#b32078',
            'line-width': 5,
            'line-opacity': 0.6
        },
        'filter': ['==','RID', 4]
    });
    //add source subway stations 
    map.addSource('subway-stations',{
        'type': 'vector',
        'url': 'mapbox://phoebechow.19zlvin9'
    });
    //add layer for subway stations  
    map.addLayer({
        'id': 'stations',
        'type': 'circle',
        'source': 'subway-stations',
        'layout': {},
        'source-layer': 'RapidTransitStationsjan04-3gkgg0',
        'paint': {
          'circle-color': 'white',
          'circle-radius': 3.6
        }
    });
    //add data source for all tennis courts
    map.addSource('all-tennis-courts', {
        'type': 'vector',
        'url': 'mapbox://phoebechow.0bv95zt7'
    });
    //add layer for all tennis courts
    map.addLayer({
        'id': 'tennis-courts',
        'type': 'circle',
        'source': 'all-tennis-courts',
        'layout': {},
        'source-layer': 'all-tennis-courts-52nwah',
        "paint": {
          "circle-color": "#8fbc8f",
          //"circle-color": "#9acd32",
          "circle-stroke-width": 0.3,
          "circle-stroke-color": "#006400",
          "circle-radius": 7.3,
          "circle-opacity": 1
        }, 
        'filter': ['==','Asset category', 'Outdoor Tennis Court']
    });
    //add icon image for club house 
    map.loadImage(
        'https://images.squarespace-cdn.com/content/v1/58b9b224e58c62ade57a5fc4/1493933126705-EFXEQHW1ZR6AQ2F6KJ2T/ke17ZwdGBToddI8pDm48kJUlZr2Ql5GtSKWrQpjur5t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UfNdxJhjhuaNor070w_QAc94zjGLGXCa1tSmDVMXf8RUVhMJRmnnhuU1v2M8fLFyJw/Red+House+Icon.jpg',
        //'https://banner2.cleanpng.com/20180616/yje/kisspng-computer-icons-house-home-symbol-swastik-5b24fb2c19de66.517142781529150252106.jpg',
        //'https://lh3.googleusercontent.com/proxy/TFdaZVsFJSJdRxq-OEJiO9QOg7xs0-TVy400m-GJQPiimctEPKE9E_RgVg2p7DXe9vXMPAh1DEFmZ8aHziwoYsXFTrsu2rUMx2Wqe_iL-LtzyA',
        //'https://lh3.googleusercontent.com/proxy/18QBQ-jVd4vZvmmNV3YZ_8eZ17BsnnP2aDva7XpZO6Q3nqpyZn5ZCnWVbSxS07Kf_ecP_jqZQjYCiNSlanAoirKiAiEVNSwn9dnKPKG-C4x_0KU',
        //'https://cdn1.iconfinder.com/data/icons/ios-web-user-interface-square-rounded-vol-6/512/Estate_home_building_shop_store_house_real-512.png',
        //'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-squares-01/3/08-512.png',
        function(error, image){
            if (error) throw error; 
            map.addImage('icon-ch', image);
    });
    //add layer for clubhouses
    map.addLayer({
        'id': 'clubhouses',
        'type': 'symbol',
        'source': 'all-tennis-courts',
        'layout': {
            'icon-image': 'icon-ch',
            'icon-size': 0.015,
        },
        'source-layer': 'all-tennis-courts-52nwah',
        'filter': ['==','Asset category', 'Clubhouse']
    });
    // add layer for private courts 
    map.addLayer({
        'id': 'club',
        'type': 'circle',
        'source': 'all-tennis-courts',
        'layout': {},
        'source-layer': 'all-tennis-courts-52nwah',
        'paint': {
          'circle-color': '#bc1109',
          'circle-radius': 5.6
        }, 
        'filter': ['==','Primary Permitting Status', 'Club']
    });
    //add layer for public courts
    map.addLayer({
        'id': 'public',
        'type': 'circle',
        'source': 'all-tennis-courts',
        'layout': {},
        'source-layer': 'all-tennis-courts-52nwah',
        'paint': {
          'circle-color': '#006400',
          'circle-radius': 5.6
        }, 
        'filter': ['==','Primary Permitting Status', 'Public']
    });
    //add layer for courts with lights 
    map.addLayer({
        'id': 'lights',
        'type': 'circle',
        'source': 'all-tennis-courts',
        'layout': {},
        'source-layer': 'all-tennis-courts-52nwah',
        'paint': {
          'circle-color': '#ffff38',
          'circle-radius': 4.1
        }, 
        'filter': ['==','LIGHTS', 'Yes']
    });
    //add layer for courts with coated surface 
    map.addLayer({
        'id': 'coated',
        'type': 'circle',
        'source': 'all-tennis-courts',
        'layout': {},
        'source-layer': 'all-tennis-courts-52nwah',
        'paint': {
          'circle-color': '#4bc7cf',
          'circle-radius': 3
        }, 
        'filter': ['==','Surface material', 'Coated']
    });
    //add layer for courts with asphalt surface 
    map.addLayer({
        'id': 'asphalt',
        'type': 'circle',
        'source': 'all-tennis-courts',
        'layout': {},
        'source-layer': 'all-tennis-courts-52nwah',
        'paint': {
          'circle-color': '#391285',
          'circle-radius': 3
        }, 
        'filter': ['==','Surface material', 'Asphalt']
    });
    //add layer for courts with clay surface 
    map.addLayer({
        'id': 'clay',
        'type': 'circle',
        'source': 'all-tennis-courts',
        'layout': {},
        'source-layer': 'all-tennis-courts-52nwah',
        'paint': {
          'circle-color': '#ff7f49',
          'circle-radius': 3
        }, 
        'filter': ['==','Surface material', 'Clay']
    });
    //add layer for courts with concrete surface 
    map.addLayer({
        'id': 'concrete',
        'type': 'circle',
        'source': 'all-tennis-courts',
        'layout': {},
        'source-layer': 'all-tennis-courts-52nwah',
        'paint': {
          'circle-color': '#ff007c',
          'circle-radius': 3
        }, 
        'filter': ['==','Surface material', 'Concrete']
    });
    //hide layers until selected 
    map.setLayoutProperty ('club', 'visibility', 'none');
    map.setLayoutProperty ('public', 'visibility', 'none');
    map.setLayoutProperty ('lights', 'visibility', 'none');
    map.setLayoutProperty ('coated', 'visibility', 'none');
    map.setLayoutProperty ('asphalt', 'visibility', 'none');
    map.setLayoutProperty ('clay', 'visibility', 'none');
    map.setLayoutProperty ('concrete', 'visibility', 'none');
});
//Add popup object 
var popup = new mapboxgl.Popup({
    //allow users to close popup
    closeButton: true,
    closeOnClick: null
});

/*
//define popup for Population Density
map.on('click','pop-density', function(e){
    //removes existing popup 
    popup.remove();
    //get rendered features that belong to the dissemination layer
    var features = map.queryRenderedFeatures(e.point, {
        "layers": ["pop-density"]
    });
    //if here is a feature there, do the following 
    if (features.length > 0){
        console.log(features[0]); //print out first element of features array that was selected
        var feature = features[0]; //store the first element as 'feature'
        popup.setLngLat(e.lngLat); //place the popup window at the longand lat where your click event happened
    //add stuff to the pop up:
    popup.setHTML("<b> Dissemination Area ID:" + feature.properties.DAUID + "</b><br> The population density per square kilometre in this dissemination area is: </b>" + feature.properties.jh9TA44b_1 + "<br>");
    popup.addTo(map); //finally add the pop up to the map
    }
    //if there are no features on click, then print this in the web browser console
    else{
        console.log("no features from layer here...")
    }
}); 
**/
//define popup for stations
map.on ('mouseenter','stations', function(e){
    //change cursor style as a UI indicator 
    map.getCanvas().style.cursor = 'pointer';

    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.STATION;
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
        popup
        .setLngLat(coordinates)
        .setHTML(description + " STATION")
        .addTo(map);
});
//change cursor style when leaving stations
map.on('mouseleave', 'stations', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
});
map.on('click','tennis-courts', function(e){
    //clicking on each tennis court zooms to the point
    map.flyTo({ center: e.features[0].geometry.coordinates, zoom:16});
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.NAME;
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
        popup
        .setLngLat(coordinates)
        .setHTML("Tennis Court Name:" + description)
        .addTo(map);
    
});
// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
map.on('mouseenter', 'tennis-courts', function() {
    map.getCanvas().style.cursor = 'pointer';
});
    // Change it back to a pointer when it leaves.
map.on('mouseleave', 'tennis-courts', function() {
    map.getCanvas().style.cursor = '';
});

// Name of the layers formed so far. 
var toggleLayerIds = ['tennis-courts', 'clubhouses', 'club', 'public', 'lights', 'coated', 'asphalt','clay', 'concrete'];

function showLayers(layer_ids) {

  for (var i = 0; i < layer_ids.length; i++) {

    var id = layer_ids[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = ' ';
    link.textContent = id; 

    if (id === 'tennis-courts'){
        link.textContent = "All Tennis Courts";
        link.className = 'active';
    } else if (id === 'clubhouses'){
        link.textContent = "Clubhouses";
        link.className = 'active';
    } else if (id === 'club'){
        link.textContent = "Private Courts";
    } else if (id === 'public'){
        link.textContent = "Public Courts";
    } else if (id === 'lights'){
        link.textContent = "Courts with Lights";
    } else if (id === 'coated'){
        link.textContent = "Coated Courts";
    } else if (id === 'asphalt'){
        link.textContent = "Asphalt Courts";
    } else if (id === 'clay'){
        link.textContent = "Clay Courts";
    } else if (id === 'concrete'){
        link.textContent = "Concrete Courts";
    } 

    link.onclick = function(e) {
    
        // Retrieve the clicked layer
        var clickedLayer = null;
    if (this.textContent === 'All Tennis Courts'){
        clickedLayer = "tennis-courts";
    } else if (this.textContent === 'Clubhouses'){
        clickedLayer = "clubhouses";
    } else if (this.textContent === 'Private Courts'){
        clickedLayer = "club";
    } else if (this.textContent === 'Public Courts'){
        clickedLayer = "public";
    } else if (this.textContent === 'Courts with Lights'){
        clickedLayer = "lights";
    } else if (this.textContent === 'Coated Courts'){
        clickedLayer = "coated";
    } else if (this.textContent === 'Asphalt Courts'){
        clickedLayer = "asphalt";
    } else if (this.textContent === 'Clay Courts'){
        clickedLayer = "clay";
    } else if (this.textContent === 'Concrete Courts'){
        clickedLayer = "concrete";
    } 

      e.preventDefault();
      e.stopPropagation();
      var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

      if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
      } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      }
    };

    var layers = document.getElementById('filter-group');
    layers.appendChild(link);
  }
}

showLayers(toggleLayerIds); 
  
// Add zoom and rotation controls to the map 
var nav = new mapboxgl.NavigationControl(); 
map.addControl (nav, 'bottom-left');
  
