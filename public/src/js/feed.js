(function (app) {
    var shareImageButton = document.querySelector('#share-image-button');
    var createPostArea = document.querySelector('#create-post');
    var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
    var sharedMomentsArea = document.querySelector('#shared-moments');

    function openCreatePostModal() {
      createPostArea.style.display = 'block';

      if (app.deferredPrompt) {
        app.deferredPrompt.prompt();

        app.deferredPrompt.userChoice.then(choiceResult => {
          console.log(choiceResult.outcome);

          if (choiceResult.outcome === 'dismissed') {
            console.log('User cancelled installation');
          } else {
            console.log('User added to home screen');
          }
        });

        app.deferredPrompt = null;
      }
    }

    function closeCreatePostModal() {
      createPostArea.style.display = 'none';
    }

    function createCard() {
      var cardWrapper = document.createElement('div');
      cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
      var cardTitle = document.createElement('div');
      cardTitle.className = 'mdl-card__title';
      cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
      cardTitle.style.backgroundSize = 'cover';
      cardTitle.style.height = '180px';
      cardWrapper.appendChild(cardTitle);
      var cardTitleTextElement = document.createElement('h2');
      cardTitleTextElement.style.color = 'black';
      cardTitleTextElement.className = 'mdl-card__title-text';
      cardTitleTextElement.textContent = 'San Francisco Trip';
      cardTitle.appendChild(cardTitleTextElement);
      var cardSupportingText = document.createElement('div');
      cardSupportingText.className = 'mdl-card__supporting-text';
      cardSupportingText.textContent = 'In San Francisco';
      cardSupportingText.style.textAlign = 'center';
      cardWrapper.appendChild(cardSupportingText);
      componentHandler.upgradeElement(cardWrapper);
      sharedMomentsArea.appendChild(cardWrapper);
    }

    shareImageButton.addEventListener('click', openCreatePostModal);

    closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

    fetch('https://httpbin.org/get')
      .then(res => res.json())
      .then(() => createCard());

})(app);
