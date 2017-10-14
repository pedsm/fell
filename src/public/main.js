const API_KEY = 'AIzaSyBzCZj4CClZrS-BOkmVqD5tmN-poIpivBc'

_ = key => document.getElementById(key)
// references
const popUp = _('popUp')
const mask = _('mask')
const formSubmit = _('formSubmit')

init = () => { 
    // eslint-disable-next-line
    let map
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

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    openDialog();
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
                .then(parsed => console.log(parsed))
                .catch(e => console.error(e));
        })
        .catch(e => console.error(e));
})
