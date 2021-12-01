import {CategoryArtists} from './categoryArtists';
import {GetServices} from '../services/getServices';

class ResultArtistsPage {
  constructor(state, i) {
    this.state = state;
    this.page = document.querySelector('.result-artists-page');
    this.index = i;
    this.block = (this.index - 1) * 10;
    this.arrOfRes = localStorage.getItem(`CatArtAnswArr${i}`).split(',');
    this.popup = document.querySelector('.popup');
    this.service = new GetServices();
  }

  render() {
    this.page.style.transform = 'translateX(0)';
    this.renderPage();
  }

  renderPage() {
    let number = this.index < 10 ? '0' + this.index : this.index;
    let correctAns = localStorage.getItem(`CatArtAnsw${this.index}`);
    this.page.innerHTML = `
    <div class="result-artists-page-title">
      <div class="category-number">${number}</div>
      <span class="category-result">${correctAns}/10</span>
    </div>
    <div class="result-artists-page-items"></div>
    <button class="btn btn-def" id="result-artist-exit" type="button">Back to Categories</button>
    `;

    document.querySelector('#result-artist-exit').addEventListener('click', () => {
      this.exit();
    });

    let itemsBlock = document.querySelector('.result-artists-page-items');
    this.addItems(itemsBlock);
  }

  async addItems(block) {
    const b = block;
    
    
    for (let i = 1; i < 11; i++) {
      let isCorrect = 'correct';
      let item = document.createElement('div');
      item.classList.add('result-artists-page-item');
      if (this.arrOfRes[i-1] == 0) {
        item.classList.add('bw');
        isCorrect = 'wrong';
      }
      let picIndex = this.block + i - 1;
      
      await this.service.setBg(picIndex, item);

      item.addEventListener('click', () => this.renderPopUp(i, isCorrect));
      b.appendChild(item);
    }
  }

  renderPopUp(i, isCorrect) {
    
    let index = this.block + i - 1;
    let btnName = 'Close';
    this.popup.style.transform = 'translateY(0)';
    this.service.openResultPopUp(index, isCorrect, btnName, this.closePopUp.bind(this));
  }

  closePopUp() {
    this.popup.style.transform = 'translateY(100vh)';
  }

  exit() {
    this.page.style.transform = 'translateY(100vh)';
    new CategoryArtists(this.state).render();
  }
}

export {ResultArtistsPage};