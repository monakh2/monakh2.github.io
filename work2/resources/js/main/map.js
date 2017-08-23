
var spinner = $('.ymap-container').children('.map-loader');
var check_if_load = false;
var myMapTemp, myPlacemarkTemp;

function init() {
    var myMapTemp = new ymaps.Map("map-yandex", {
        center: [44.61254851671378, 33.515434744525756],
        zoom: 17,
        controls: []
    });

    var placemark = new ymaps.Placemark([44.61267879853799, 33.51887870090089], {
        hintContent: "Офис PIT"
    }, {
        iconLayout: 'default#image',
        iconImageHref: '/resources/img/system/map-marker.png',
        iconImageSize: [56, 84],
        iconImageOffset: [-25, -60],
    });
    myMapTemp.geoObjects.add(placemark);
    myMapTemp.behaviors.disable('scrollZoom');
    var layer = myMapTemp.layers.get(0).get(0);
    waitForTilesLoad(layer).then(function () {
        spinner.removeClass('is-active');
    });
}

function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
        var tc = getTileContainer(layer), readyAll = true;
        tc.tiles.each(function (tile, number) {
            if (!tile.isReady()) {
                readyAll = false;
            }
        });
        if (readyAll) {
            resolve();
        } else {
            tc.events.once("ready", function () {
                resolve();
            });
        }
    });
}
function getTileContainer(layer) {
    for (var k in layer) {
        if (layer.hasOwnProperty(k)) {
            if (
                    layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                    || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                    ) {
                return layer[k];
            }
        }
    }
    return null;
}

function loadScript(url, callback) {
    var script = document.createElement("script");
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}



var element_offset = $('.ymap-container').offset();
var scroll_map_trigger = element_offset.top / 2;
var is_map_visible = false;
var is_map_shown = false;
function width_watch() {
    var scroll_top = $(window).scrollTop();
    
    if (scroll_top > scroll_map_trigger) {
        is_map_visible = true;
        
    }
    //console.log(scroll_top,scroll_map_trigger,is_map_visible);
}

var ymap = function () {
    $(window).on('scroll', function () {
        width_watch();
     
        if (!check_if_load && is_map_visible) {
            check_if_load = true;
            spinner.addClass('is-active');
            loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function () {
                ymaps.load(init);
            });
        }
    }
    );
}
$(function () {
 
    ymap();
});

function mobile_toggle_contacts() {
    $('.map-contacts').toggle();
}
