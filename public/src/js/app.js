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

    function printScreenHeight() {
        const screenSizeDiv = document.getElementById('screen-size');

        screenSizeDiv.innerHTML = `Inner height: ${window.innerHeight}, Screen height: ${window.screen.height}`;
    }

    window.addEventListener('load', function () {
        printScreenHeight();
    });

    window.addEventListener('resize', function () {
        printScreenHeight();
    });

    registerSw();
    preventInstallPrompt();
})(app);
