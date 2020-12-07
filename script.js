(function () {
  const preloader = document.querySelector('[data-prelaoder]');
  const gameContainer = document.querySelector('[data-game-container]');
  const choiseContainer = document.querySelector('[data-choise-container]');
  const imgHero = document.querySelector('[data-hero-img]');
  const nextBtn = document.querySelector('[data-next]');
  const previousBtn = document.querySelector('[data-previous]');
  const playBtn = document.querySelector('[data-play]');
  const heroChoice = document.querySelector('[data-choise-hero]');
  const hero = document.querySelector('[data-hero]');
  const progressBars = document.querySelectorAll('[data-progress-bar]');
  const healthProgress = document.querySelector('[data-health]');
  const drowsinessProgress = document.querySelector('[data-drowsiness]');
  const thirstProgress = document.querySelector('[data-thirst]');
  const cleanlinessProgress = document.querySelector('[data-cleanliness]');
  const hungerProgress = document.querySelector('[data-hunger]');
  const friendshipProgress = document.querySelector('[data-friendship]');
  const ageProgress = document.querySelector('[data-age]');
  const petText = document.querySelector('[data-age-text]');
  const notification = document.querySelector('[data-notification]');
  const cure = document.querySelector('[data-cure]');
  const sleep = document.querySelector('[data-sleep]');
  const drinking = document.querySelector('[data-drinking]');
  const clean = document.querySelector('[data-clean]');
  const feed = document.querySelector('[data-feed]');

  let pet;
  let heroName;
  let desireTimer;
  let canClick = true;

  const heroesImg = [
    './images/cat-0.png',
    './images/chick-0.png',
    './images/leveret-0.png',
  ];

  const images = {
    'cat': [
      './images/cat-0.png',
      './images/cat-1.png',
      './images/cat-2.png',
      './images/cat-3.png',
      './images/cat-4.png',
      './images/cat-5.png'
    ],
    'chick': [
      './images/chick-0.png',
      './images/chick-1.png',
      './images/chick-2.png',
      './images/chick-3.png',
      './images/chick-4.png',
      './images/chick-5.png'
    ],
    'leveret': [
      './images/leveret-0.png',
      './images/leveret-1.png',
      './images/leveret-2.png',
      './images/leveret-3.png',
      './images/leveret-4.png',
      './images/leveret-5.png'
    ]
  }

  // shutting down preloader
  setTimeout(() => {
    preloader.classList.remove('visibility');
  }, 3000);

  // displaying choise container after preload
  function showingConatiner() {
    setTimeout(() => {
      choiseContainer.classList.remove('hidden');
      choiseContainer.classList.add('emerge');
    }, 2500);
  }

  // smooth transition to transparency and visibility
  function showingAnimation(node) {
    node.classList.remove('emerge');
    node.classList.add('to-hide');
    setTimeout(() => {
      node.classList.remove('to-hide');
      node.classList.add('emerge');
    }, 500);
  }

  // selecting hero
  function changingHero(e) {
    if (canClick) {
      canClick = false;
      if (e.target.innerHTML === 'Next') {
        const currentImg = imgHero.getAttribute('src');
        for (let i = 0; i  < heroesImg.length; i++) {
          if (currentImg === heroesImg[i]) {
            if (i < heroesImg.length - 1) {
              showingAnimation(imgHero);
              setTimeout(() => imgHero.setAttribute('src', heroesImg[i + 1]), 500);
            } else {
              showingAnimation(imgHero);
              setTimeout(() => imgHero.setAttribute('src', heroesImg[0]), 500);
            }
          }
        }
      }
      else {
        const currentImg = imgHero.getAttribute('src');
        for (let i = 0; i  < heroesImg.length; i++) {
          if (currentImg === heroesImg[i]) {
            if (i === 0) {
              showingAnimation(imgHero);
              setTimeout(() => imgHero.setAttribute('src', heroesImg[heroesImg.length - 1]), 500);
            } else {
              showingAnimation(imgHero);
              setTimeout(() => imgHero.setAttribute('src', heroesImg[i - 1]), 500);
            }
          }
        }
      }
      setTimeout(() => canClick = true, 1000);
    }
  }

  class Pet {
    constructor(name) {
      this.name = name;
        this.health = 100;
        this.drowsiness = 100;
        this.thirst = 100;
        this.cleanliness = 100;
        this.hunger = 100;
        this.friendship = 100;
        this.age = 0;
        this.days = 0;
    }
    gameOver(message) {
        progressBars.forEach((node) => node.style.display = 'none');
        notification.textContent = message;
        notification.classList.remove('hidden');
        clearInterval(desireTimer);
    }
    growUp () {
        if (this.days < 100) {
            this.days = this.days + 20;
            ageProgress.style.width = `${this.days}%`;
        } else {
          this.days = 0;
          this.age++;
          setTimeout(() => hero.setAttribute('src', images[this.name][this.age]), 500);
          // changing image every one year/evolution
          if (this.age < images[this.name].length-1) {
            showingAnimation(hero);
            petText.textContent = this.age;
          } else {
            showingAnimation(hero);
            showingAnimation(notification);
            setTimeout(() => this.gameOver('Great, you raised your pet!'), 500);
          }
        }
    }
    sicken () {
        if (this.health > 0) {
            this.health = this.health - 2;
            healthProgress.style.width = `${this.health}%`;
        }
    }
    cure () {
      if (this.health < 100) {
          this.health = this.health + 2;
          healthProgress.style.width = `${this.health}%`;
      }
    }
    fatigue () {
        if (this.drowsiness > 0) {
            this.drowsiness = this.drowsiness - 2;
            drowsinessProgress.style.width = `${this.drowsiness}%`;
        }
    }
    sleep () {
      if (this.drowsiness < 100) {
          this.drowsiness = this.drowsiness + 2;
          drowsinessProgress.style.width = `${this.drowsiness}%`;
      }
    }
    wantToDrink () {
        if (this.thirst > 0) {
            this.thirst = this.thirst - 4;
            thirstProgress.style.width = `${this.thirst}%`;
        }
    }
    drinking () {
      if (this.thirst < 100) {
          this.thirst = this.thirst + 4;
          thirstProgress.style.width = `${this.thirst}%`;
      }
    }
    getsDirty () {
        if (this.cleanliness > 0) {
            this.cleanliness = this.cleanliness - 2;
            cleanlinessProgress.style.width = `${this.cleanliness}%`;
        }
    }
    clean () {
      if (this.cleanliness < 100) {
          this.cleanliness = this.cleanliness + 2;
          cleanlinessProgress.style.width = `${this.cleanliness}%`;
      }
    }
    wantsToEat () {
        if (this.hunger > 0) {
            this.hunger = this.hunger - 4;
            hungerProgress.style.width = `${this.hunger}%`;
        }
    }
    feed () {
      if (this.hunger < 100) {
          this.hunger = this.hunger + 4;
          hungerProgress.style.width = `${this.hunger}%`;
      }
    }
    deterioration () {
        if (this.friendship > 0) {
            if (this.health === 0
                || this.drowsiness === 0
                || this.cleanliness === 0
                || this.hunger === 0
                || this.thirst === 0
            ) {
                this.friendship = this.friendship - 10;
                friendshipProgress.style.width = `${this.friendship}%`;
            }
        } else {
            notification.classList.add('emerge');
            this.gameOver('Your pet is gone from you!');
        }
    }
  }

  function handlerCure() {
    pet.cure();
  }

  function handlerSleep() {
    pet.sleep();
  }

  function handlerDrinking() {
    pet.drinking();
  }

  function handlerClean() {
    pet.clean();
  }

  function handlerFeed() {
    pet.feed();
  }

  function revivalHero() {  
    pet = new Pet(heroName);
    desireTimer = setInterval(() => {
      pet.growUp();
      pet.sicken();
      pet.fatigue();
      pet.wantToDrink();
      pet.getsDirty();
      pet.wantsToEat ()
      pet.deterioration();
    }, 1000);
  }

  // start new game with chose Hero
  function startingGame () {
    if (canClick) {
      canClick = false;
      choiseContainer.classList.remove('emerge');
      choiseContainer.classList.add('to-hide');
      setTimeout(() => {
        choiseContainer.classList.remove('to-hide');
        choiseContainer.classList.add('hidden');
        preloader.classList.add('visibility');
      }, 500);
      const imageHeroLink = imgHero.getAttribute('src');
      heroName = imageHeroLink.split('./images/')[1].split('-0.png')[0];
      hero.setAttribute('src', imageHeroLink);
      setTimeout(() => {
        gameContainer.classList.remove('hidden');
        gameContainer.classList.add('emerge');
      }, 2500);
      revivalHero();
    }
  }

  // adding event listener
  nextBtn.addEventListener('click', changingHero);
  previousBtn.addEventListener('click', changingHero);
  playBtn.addEventListener('click', startingGame);
  cure.addEventListener('click', handlerCure);
  sleep.addEventListener('click', handlerSleep);
  drinking.addEventListener('click', handlerDrinking);
  clean.addEventListener('click', handlerClean);
  feed.addEventListener('click', handlerFeed);
  window.addEventListener('load', showingConatiner);
}());