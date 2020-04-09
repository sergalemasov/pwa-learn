let app = {};

(function() {
    function registerSw() {
        if (!('serviceWorker' in navigator)) {
            return;
        }

        navigator.serviceWorker
            .register('/sw.js')
            .then(() => console.log('Service worker registered!'));
    }

    function preventInstallPrompt() {
        window.addEventListener('beforeinstallprompt', event => {
            console.log('beforeinstallprompt fired');

            event.preventDefault();

            app.deferredPrompt = event;
        });
    }

    registerSw();
    preventInstallPrompt();
})(app);