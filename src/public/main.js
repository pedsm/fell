const API_KEY = 'AIzaSyBzCZj4CClZrS-BOkmVqD5tmN-poIpivBc'

axis = require('axislang')
_ = key => document.getElementById(key)
// references
const popUp = _('popUp')
const mask = _('mask')
const formSubmit = _('formSubmit')
const lat = _('lat')
const lon = _('lon')
const content = _('content')

let map
init = () => { 
    // eslint-disable-next-line
    const low = navigator.geolocation.getCurrentPosition((position) => {
        map = new GMaps({
            el: '#map',
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            width: '100%',
            height: '100%'
        })
        // Current location
        map.addMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            title: 'Your coumpter',
            infoWindow: {
                content: 'Your computer'
            }
        })
    }, e => console.log(e))
}

openDialog = () => {
    mask.style.display = 'block';
    popUp.style.display = 'block';
}

closeDialog = () => {
    mask.style.display = 'none';
    popUp.style.display = 'none';
}

_('getButton').addEventListener('click', (e) => {
    e.preventDefault();
    openDialog();
})

_('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    GMaps.geocode({
        address: _('searchInput').value,
        callback: (results, status) => {
            if (status === 'OK') {
                var latlng = results[0].geometry.location;
                map.setCenter(latlng.lat(), latlng.lng());
                map.addMarker({
                    lat: latlng.lat(),
                    lng: latlng.lng(),
                    infoWindow: {
                        content: `'${_('searchInput').value}' search result`
                    }
                });
            }
        }
    });
})

mask.addEventListener('click', (e) => {
    closeDialog();
})

formSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    closeDialog();
    fetch(_('url').value)
        .then((response) => {
            response.json()
                .then(parsed => {
                    let parser = new axis()
                    let lats = parser.parse(lat.value, parsed)
                    let lons = parser.parse(lon.value, parsed)
                    let contents = parser.parse(content.value, parsed)
                    for (let i = 0; i < lats.length; i++) {
                        addMarker(lats[i], lons[i], contents);
                    }
                })
                .catch(e => console.error(e));
        })
        .catch(e => console.error(e));
})


function addMarker(lat, lon, content = 'Point') {
    console.log(lat, lon)
    map.addMarker({
        lat,
        lng: lon,
        title: 'Point',
        infoWindow: {
            content: prettyfy(content[0])
        }
    })
}

function prettyfy(json) {
    return Object.keys(json)
        .map(key => `<p><b>${key}:</b> ${json[key]}</p>`)
        .reduce((a, b) => a + b)
}
