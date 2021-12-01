import {GetServices} from '../services/getServices.js';
import {PaintingsCategories} from './paintingsCategories';
import images from './db.js';
import {Welcome} from './welcome.js';

class ResultCategories {
  constructor(state, i, catName) {
    this.type = catName;
    this.state = state;
    this.thisPage = document.querySelector('.results-categories');
    this.index = i;
    this.block = (this.index - 1) * 10;
    this.arrOfRes = localStorage.getItem(`Cat${catName}AnswArr${i}`).split(',');
    this.footer = document.querySelector('footer');
    this.settingsWindow = document.querySelector('.settings');
    this.service = new GetServices();
  }

  render() {
    this.createLayout();
    this.createItems();
    this.bindActions();
    this.thisPage.style.transform = 'translateX(0)';
  }

  bindActions() {
    document.querySelector('.results-categories .set').addEventListener('click', () => this.openSettings());
    document.querySelector('.results-categories .home').addEventListener('click', () => this.backToMain());
    document.querySelector('.results-categories .cat').addEventListener('click', () => this.openCats());
  }
  createLayout() {
    this.thisPage.innerHTML = `
      <div class="container results-categories-container">
        <h2 class="section-title paintings-categories-title"><span>Art</span> Quiz</h2>
        <h3 class="results-categories-semititle">Your results</h3>
        <p class="results-categories-index">Category ${this.index}</p>

        <div class="results-categories-block">
        <div class="results-categories-block-inner"></div>
        </div>

        <div class="paintings-categories-footer">
          <div class="paintings-categories-footer-item home"><span></span><p>Home</p></div>
          <div class="paintings-categories-footer-item cat"><span></span><p>Categories</p></div>
          <div class="paintings-categories-footer-item set"><span></span><p>Settings</p></div>
        </div>
      </div>
    `;
  }

  createItems() {
    const list = document.querySelector('.results-categories-block-inner');
    list.innerHTML = ``;
    for (let i = 0; i < 10; i++) {
      let isCorrect = this.arrOfRes[i] == '1' ? true : false;
      this.createItem(i, list, isCorrect);
    }
  }

  async createItem(i, list, isCorrect) {
    let el = document.createElement('div');
    el.classList.add('results-categories-item');
    let index = +this.block + i;

    el.innerHTML = `
    <div class="results-categories-item-inner">
      <div class="results-categories-item-back">
        <p class="results-categories-item-back-name">${images[index].name}</p>
        <p class="results-categories-item-back-info">${images[index].author}, ${images[index].year}</p>
      </div>
    </div>
    `;

    let img = document.createElement('div');
    img.classList.add('results-categories-item-img');
    let imgIndex = +this.block + i;
    await this.service.setBg(imgIndex, img);
    if (!isCorrect) {
      img.classList.add('bw');
    }
    el.querySelector('.results-categories-item-inner').appendChild(img);
    list.appendChild(el);
  }

  openSettings() {
    this.settingsWindow.style.transform = 'translateY(0)';
  }

  openCats() {
    this.thisPage.style.transform = 'translateX(100vw)';
    new PaintingsCategories(this.state, this.type).render();
  }

  backToMain() {
    this.thisPage.style.transform = 'translateX(100vw)';
    new Welcome(this.state).render();
  }
}

export {ResultCategories}