
import {Welcome} from './welcome.js';
import {PaintingQuiz} from './paintingQuiz';
import {ArtistQuiz} from './artistQuiz';
import {ResultCategories} from './resultCategories';

class PaintingsCategories {
  constructor(state, type) {
    this.state = state;
    this.thisPage = document.querySelector('.paintings-categories');
    this.settingsWindow = document.querySelector('.settings');
    this.footer = document.querySelector('footer');

    this.obj = {
      type: type,
      title: type == 'Paint' ? 'Paintings' : 'Artists'
    }
    
  }
  render() {
    this.createLayout();
    this.createItems();
    this.bindActions();
    this.footer.style.transform = 'translateY(45px)';
    this.thisPage.style.transform = 'translateX(0)';
  }

  bindActions() {
    document.querySelector('.paintings-categories .set').addEventListener('click', () => this.openSettings());
    document.querySelector('.paintings-categories .home').addEventListener('click', () => this.backToMain());
    
  }

  createLayout() {
    this.thisPage.innerHTML = `
      <div class="container paintings-categories-container">
        <h2 class="section-title paintings-categories-title"><span>Art</span> Quiz</h2>
        <h3 class="paintings-categories-semititle">${this.obj.title} Categories</h3>

        <div class="paintings-categories-block">
        </div>

        <div class="paintings-categories-footer">
          <div class="paintings-categories-footer-item home"><span></span><p>Home</p></div>
          <div class="paintings-categories-footer-item cat active"><span></span><p>Categories</p></div>
          <div class="paintings-categories-footer-item set"><span></span><p>Settings</p></div>
        </div>
      </div>
    `;
  }

  createItems() {
    const list = document.querySelector('.paintings-categories-block');
    list.innerHTML = ``;
    for (let i = 1; i < 13; i++) {
      this.createItem(i, list);
    }
  }

  createItem(i, list) {
    let el = document.createElement('div');
    el.classList.add('paintings-categories-item');
    el.setAttribute('data-number', i);

    let id = i < 10 ? '0'+ i : i;
    let answers = '';
    let value = this.state[`Cat${this.obj.type}Answ${i}`];
    answers = `${value}/10`;

    let img = document.createElement('div');
    img.classList.add('paintings-categories-item-img', `category-${i}`);

    if (this.state[`Cat${this.obj.type}Answ${i}`] == 10) {
      el.innerHTML = `
          <div class="paintings-categories-item-info">
            <div class="paintings-categories-name">Category ${id}</div>
            <span class="completed">10/10</span>
          </div>
      `;
      img.addEventListener('click', (e) => this.openResutsWindow(i));
      el.appendChild(img);
    } 
    else if (this.state[`Cat${this.obj.type}Answ${i}`] == null) {
      img.classList.add('bw');
      el.innerHTML = `
          <div class="paintings-categories-item-info">
            <div class="paintings-categories-name">Category ${id}</div>
          </div>
      `;
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        this.startQuiz(i);
      });
      el.appendChild(img);
      
    }
    else {
      
      img.innerHTML = `
      <div class="paintings-categories-item-img-btn">
        <span></span> Play again
      </div>
      `;

      el.innerHTML = `
      <div class="paintings-categories-item-info">
        <div class="paintings-categories-name">Category ${id}</div>
        <span>${answers}</span>
      </div>
 
      `;
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openResutsWindow(i)
      });

      img.querySelector('.paintings-categories-item-img-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.startQuiz(i);
      });

      el.appendChild(img);
    }

    list.appendChild(el);
  }

  startQuiz(i) {
    this.thisPage.style.transform = 'translateX(100vw)';

    if (this.obj.type == 'Paint') {
      new PaintingQuiz(this.state, i).render();
    }
    else {
      console.log('artist quiz start');
      new ArtistQuiz(this.state, i).render();
    }
    
  }

  openResutsWindow(i) {
    this.thisPage.style.transform = 'translateX(100vw)';

    new ResultCategories(this.state, i, this.obj.type).render();
  }


  openSettings() {
    this.settingsWindow.style.transform = 'translateY(0)';
  }

  backToMain() {
    this.thisPage.style.transform = 'translateX(100vw)';
    new Welcome(this.state).render();
  }
}

export {PaintingsCategories};