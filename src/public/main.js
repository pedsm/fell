const API_KEY = 'AIzaSyBzCZj4CClZrS-BOkmVqD5tmN-poIpivBc'

init = () => { 
    console.log(API_KEY)
    // eslint-disable-next-line
    const map = new GMaps({
        el: '#map',
        lat: 52,
        lng: -1,
        width: '100%',
        height: '100%'
    })
}
