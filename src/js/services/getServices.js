import images from '../components/db.js';

class GetServices {
  constructor() {
    this.popup = document.querySelector('.popup');
  }
  async setBg(index, element) {
    let url = `https://raw.githubusercontent.com/Inv1nc1ble/image-data/master/img/${index}.jpg`;
      const img = new Image;
      img.src = url;
      img.onload = () => {
        element.style.backgroundImage = `url(${img.src})`;
      }
  }

  async openResult(index, icon, btnName, closeMethod) {
    this.popup.style.transform = 'translateY(0)';
    let picName = images[index].name;
    let author = images[index].author;
    let year = images[index].year;

    this.popup.innerHTML = `
    <div class="popup-result">
      <div class="popup-result-img">
        <div class="popup-result-icon ${icon}"></div>
      </div>

      <div class="popup-result-info">
        <h3 class="popup-result-info-title">${picName}</h3>
        <p>${author}, ${year}</p>
      </div>
      <button class="btn btn-result" type="button" >${btnName}</button>
    </div>
    `;

    let btn = document.querySelector('.popup-result .btn-result');
    btn.addEventListener('click', () => closeMethod(), { once: true });

    await this.setBg(index, document.querySelector('.popup-result .popup-result-img')); 
  }

  endRoundResult(action, buttonOneAction = {}, buttonTwoAction = {}, result = '') {
    this.popup.style.transform = 'translateY(0)';
    switch (action) {
      case 'GRAND':
        this.popup.innerHTML = `
          <div class="popup-round-result">
            <div class="popup-round-result-icon-grand"></div>
            <h2 class="popup-round-result-title">Grand Result</h2>
            <h3 class="popup-round-result-semititle">Congratulations!</h3>
            <div class="popup-round-result-btns">
              <button class="btn btn-home" type="button">Home</button>
              <button class="btn btn-result" type="button">Next Quiz</button>
            </div>
            
          </div>
        `;
        document.querySelector('.popup-round-result-btns button').addEventListener('click', 
          () => buttonOneAction());
        break;

      case 'WIN':
        this.popup.innerHTML = `
          <div class="popup-round-result">
            <div class="popup-round-result-icon-win"></div>
            <h3 class="popup-round-result-semititle">Congratulations!</h3>
            <h2 class="popup-round-result-title">${result}/10</h2>
            
            <div class="popup-round-result-btns">
              <button class="btn btn-home" type="button">Home</button>
              <button class="btn btn-result" type="button">Next Quiz</button>
            </div>
            
          </div>
        `;

        let btns = document.querySelectorAll('.popup-round-result-btns button');
        btns[0].addEventListener('click', () => buttonOneAction());
        btns[1].addEventListener('click', () => buttonTwoAction());
        break;

      case 'LOSE':
        this.popup.innerHTML = `
          <div class="popup-round-result">
            <div class="popup-round-result-icon-lose"></div>
            
            <h2 class="popup-round-result-title">Game over</h2>
            <h3 class="popup-round-result-semititle">Play again?</h3>
            <div class="popup-round-result-btns">
              <button class="btn btn-home" type="button">Home</button>
              <button class="btn btn-result" type="button">Yes</button>
            </div>
            
          </div>
        `;
        let btnsLose = document.querySelectorAll('.popup-round-result-btns button');
        btnsLose[0].addEventListener('click', () => buttonOneAction());
        btnsLose[1].addEventListener('click', () => buttonTwoAction());
        break;
      default: 
        this.popup.style.transform = 'translateY(100vh)';
        break;
    }
  }

  showPause(buttonOneAction = {}, buttonTwoAction = {}) {
    this.popup.style.transform = 'translateY(0)';
    this.popup.innerHTML = `
      <div class="popup-pause">
        
        <h3 class="popup-pause-title">Do you really want to quit the game?</h3>
        
        <div class="popup-round-result-btns">
          <button class="btn btn-home" type="button">Cancel</button>
          <button class="btn btn-result" type="button">Yes</button>
        </div>
      </div>
    `;
    
    const btnsLose = document.querySelectorAll('.popup-round-result-btns button');
    btnsLose[0].addEventListener('click', () => buttonOneAction());
    btnsLose[1].addEventListener('click', () => buttonTwoAction());
  }
}

export {GetServices};