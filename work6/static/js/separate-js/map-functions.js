$(document).ready(function () {
    $('body').css({"height": window.innerHeight, "overflow": "hidden"});
    $('html').css({"height": window.innerHeight, "overflow": "hidden"});

    if ($(window).width() <= 481) {

        $('body').css({"height": "100%", "overflow": "hidden"});
        $('html').css({"position": "absolute", "top": 0, "bottom": 0, "left": "0", "right": "0", "width": "100%", "height": "100%"});

    } else {
        $('body').css({"height": window.innerHeight, "overflow": "hidden"});
        $('html').css({"height": window.innerHeight, "overflow": "hidden"});
    }


    var map;
    var resaltBockDiscont = '<div class="result-block">' +
        '<div class="result-info-line">' +
        '<div class="img-block">' +
        '<img src="static/img/assets/map/result-ex.jpg" alt="">' +
        '<div class="mark-wrap">' +
        '<div class="stars-wrap">' +
        '<i class="fa fa-star" aria-hidden="true"></i>' +
        '<i class="fa fa-star" aria-hidden="true"></i>' +
        '<i class="fa fa-star" aria-hidden="true"></i>' +
        '<i class="fa fa-star" aria-hidden="true"></i>' +
        '<i class="fa fa-star-o" aria-hidden="true"></i>' +
        '<span class="mark">4</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="name-block">' +
        '<p class="name"><span>Ресторан</span> “Harbour в два ряда”</p>' +
        '<p class="prices">Порядок цен: 30$ с человека</p>' +
        '<div class="result-position">' +
        '<p class="adress">2 Muen-ngern Road Beach Kathu Tambon Patong</p>' +
        '<p class="distance">До вас: 12 км</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="info-buttons">' +
        '<a href="" class="recalls">Все отзывы (<span class="count">22</span>)</a>' +
        '<a href="" class="to-favorite"><i class="fa fa-star" aria-hidden="true"></i>В избранное</a>' +
        '<a href="" class="was-here"><i class="fa fa-map-marker" aria-hidden="true"></i>Я здесь был</a>' +
        '</div>' +
        '<div class="your-discount"><p>Ваша Guru-скидка: 20%</p><a href="">Получить</a></div></div>';

    var resaltBockNoDiscont = '<div class="result-block">' +
        '<div class="result-info-line">' +
        '<div class="img-block">' +
        '<img src="static/img/assets/map/result-ex.jpg" alt="">' +
        '<div class="mark-wrap">' +
        '<div class="stars-wrap">' +
        '<i class="fa fa-star" aria-hidden="true"></i>' +
        '<i class="fa fa-star" aria-hidden="true"></i>' +
        '<i class="fa fa-star" aria-hidden="true"></i>' +
        '<i class="fa fa-star" aria-hidden="true"></i>' +
        '<i class="fa fa-star-o" aria-hidden="true"></i>' +
        '<span class="mark">4</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="name-block">' +
        '<p class="name"><span>Ресторан</span> “Harbour в два ряда”</p>' +
        '<p class="prices">Порядок цен: 30$ с человека</p>' +
        '<div class="result-position">' +
        '<p class="adress">2 Muen-ngern Road Beach Kathu Tambon Patong</p>' +
        '<p class="distance">До вас: 12 км</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="info-buttons">' +
        '<a href="" class="recalls">Все отзывы (<span class="count">22</span>)</a>' +
        '<a href="" class="to-favorite"><i class="fa fa-star" aria-hidden="true"></i>В избранное</a>' +
        '<a href="" class="was-here"><i class="fa fa-map-marker" aria-hidden="true"></i>Я здесь был</a>' +
        '</div>';


    var locations = [
        {name: 'Заведение 1', latitude: 33.890542, longitude: 151.274856, marker: 'medical', info: resaltBockNoDiscont},
        {name: 'Заведение 2', latitude: 33.890542, longitude: 151.774956, marker: 'tourism', info: resaltBockNoDiscont},
        {name: 'Заведение 3', latitude: 33.890542, longitude: 152.274856, marker: 'condo', info: resaltBockNoDiscont},
        {name: 'Заведение 4', latitude: 33.890542, longitude: 152.774856, marker: 'spa', info: resaltBockNoDiscont},
        {name: 'Заведение 5', latitude: 33.890542, longitude: 153.274856, marker: 'beach', info: resaltBockNoDiscont},
        {name: 'Заведение 6', latitude: 34.890542, longitude: 151.274856, marker: 'restaurant', info: resaltBockNoDiscont},
        {name: 'Заведение 7', latitude: 34.890542, longitude: 151.774956, marker: 'guesthouses', info: resaltBockNoDiscont},
        {name: 'Заведение 8', latitude: 34.890542, longitude: 152.274856, marker: 'transport', info: resaltBockNoDiscont},
        {name: 'Заведение 9', latitude: 34.890542, longitude: 152.774856, marker: 'shoping', info: resaltBockNoDiscont},
        {name: 'Заведение 10', latitude: 34.890542, longitude: 153.274856, marker: 'hotels', info: resaltBockNoDiscont}
    ];
    initialize(locations);
});


var infowindow = null;

function initialize(locations) {
    var myOptions = {center: new google.maps.LatLng(33.890542, 151.274856), zoom: 8, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map           = new google.maps.Map(document.getElementById("mapwrap"), myOptions);
    setMarkers(map, locations);
}

function setMarkers(map, locations) {
    var marker, i;
    var prev_infowindow =false;

    for (i = 0; i < locations.length; i++) {
        var point  = locations[i];
        latlngset  = new google.maps.LatLng(point.latitude, point.longitude);
        var marker = new google.maps.Marker({map: map, title: point.name, position: latlngset, icon: markerIcon(point.marker)});
        map.setCenter(marker.getPosition());
        var content    = point.info;
        var infowindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {

            return function () {
                if( prev_infowindow ) {
                    prev_infowindow.close();
                }
                prev_infowindow = infowindow;
                infowindow.setContent(content);
                infowindow.open(map, marker);
            };
        })(marker, content, infowindow));
    }
}

$('.my-position').click(function (e) {
    e.preventDefault();
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var lat    = position.coords.latitude;
    var lng    = position.coords.longitude;
    var LatLng = {lat: lat, lng: lng};
    map.setCenter(new google.maps.LatLng(lat, lng));
    var marker = new google.maps.Marker({position: LatLng, map: map, title: 'You here'});
}

function markerIcon(sphere) {
    var icons_sprite = 'static/img/assets/map/map-markers.png';
    switch (sphere) {
        case 'medical':
            return new google.maps.MarkerImage(icons_sprite, new google.maps.Size(49, 66), new google.maps.Point(0, 0));
            break;
        case 'tourism':
            return new google.maps.MarkerImage(icons_sprite, new google.maps.Size(49, 66), new google.maps.Point(49, 0));
            break;
        case 'condo':
            return new google.maps.MarkerImage(icons_sprite, new google.maps.Size(49, 66), new google.maps.Point(98, 0));
            break;
        case 'spa':
            return new google.maps.MarkerImage(icons_sprite, new google.maps.Size(49, 66), new google.maps.Point(147, 0));
            break;
        case 'beach':
            return new google.maps.MarkerImage(icons_sprite, new google.maps.Size(49, 66), new google.maps.Point(196, 0));
            break;
        case 'restaurant':
            return new google.maps.MarkerImage(icons_sprite, new google.maps.Size(49, 66), new google.maps.Point(245, 0));
            break;
        case 'guesthouses':
            return new google.maps.MarkerImage(icons_sprite, new google.maps.Size(49, 66), new google.maps.Point(294, 0));
            break;
        case 'transport':
            return new google.maps.MarkerImage(icons_sprite, new google.maps.Size(49, 66), new google.maps.Point(343, 0));
            break;
        case 'shoping':
            return new google.maps.MarkerImage(icons_sprite, new google.maps.Size(49, 66), new google.maps.Point(392, 0));
            break;
        case 'hotels':
            return new google.maps.MarkerImage(icons_sprite, new google.maps.Size(49, 66), new google.maps.Point(441, 0));
            break;
        default:
            return new google.maps.MarkerImage(icons_sprite, new google.maps.Size(49, 66), new google.maps.Point(0, 0));
    }
}
