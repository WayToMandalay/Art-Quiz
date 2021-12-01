
import {PaintingsCategories} from './paintingsCategories';

class Welcome {
  constructor(state) {
    this.state = state;
    this.thisPage = document.querySelector('.welcome');
    this.settingsBtn = document.querySelector('#settings-btn');
    this.artistsBtn = document.querySelector('#artists-btn');
    this.paintingsBtn = document.querySelector('#paintings-btn');
    this.settingsWindow = document.querySelector('.settings');
    this.footer = document.querySelector('footer');    
  }
  
  render() {
    this.thisPage.style.transform = 'translateX(0)';
    // this.thisPage.style.transform = 'translateX(100vw)';
    this.footer.style.transform = 'translateY(0)';
    this.bindActions();
  }

  bindActions() {
    this.artistsBtn.addEventListener('click', () => this.showArtistCat());
    this.paintingsBtn.addEventListener('click', () => this.showPaintingsCat());

    this.settingsBtn.addEventListener('click', () => {
      this.settingsWindow.style.transform = 'translateY(0)';
    });
  }

  showPaintingsCat() {
    this.thisPage.style.transform = 'translateX(-100vw)';
    new PaintingsCategories(this.state, 'Paint').render();
  }

  showArtistCat() {
    this.thisPage.style.transform = 'translateX(-100vw)';
    new PaintingsCategories(this.state, 'Art').render();
    
  }
}

export {Welcome};