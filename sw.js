self.addEventListener('fetch', event => {
    console.log('Bezig met een fetch: ', event.request.url);
});