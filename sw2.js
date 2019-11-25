importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox){
    console.log('workbox berhasil dimuat');
}else{
    console.log('workbox gagal dimuat');
}

// precaching
workbox.precaching.precacheAndRoute([
    {url: '/', revision: '1'},
    {url: '/index.html', revision: '1'},
    {url: '/detail.html', revision: '1'},
    {url: '/favourite.html', revision: '1'},
    {url: '/matches.html', revision: '1'},
    {url: '/css/materialize.min.css', revision: '1'},
    {url: '/imgs/icon-logo.png', revision: '1'},
    {url: '/js/materialize.min.js', revision: '1'},
    {url: '/js/jquery-3.4.1.min.js', revision: '1'},
    {url: '/js/api.js', revision: '1'},
    {url: '/js/idb.js', revision: '1'},
    {url: '/js/idbFunction.js', revision: '1'},
    {url: '/js/extra.js', revision: '1'},
    {url: '/manifest.json', revision: '1'},
]);

// workbox.routing.registerRoute();
workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.staleWhileRevalidate()
);
workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
);



self.addEventListener("push", function(event){
    var body;
    if(event.data){
        body = event.data.text();
    }else{
        body = "Push message no payload";
    }

    var options = {
        body: body,
        icon: 'imgs/icon-logo.png',
        vibrate: [100,50,100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});