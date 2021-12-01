
class Settings {
  constructor(state) {
    this.state = state;
    this.settingsElement = document.querySelector('.settings');
    this.soundRange = document.querySelector('#settings-volume-value');
    this.timerBtn = document.querySelector('#settings-timer'); //switcher
    this.timerText = document.querySelector('.settings-timer-block span');  // on off
    this.timerValueText = document.querySelector('.settings-timer-controllers span'); //span
    
    this.timerValue = this.state['timerValue']; // 20
    this.footer = document.querySelector('footer');
    this.saveBtn = document.querySelector('#settings-save');
  }

  saveProps() {
    this.state['volume'] = this.soundRange.value;
    this.state['timer'] = this.timerBtn.checked ? 'on' : 'off';
    this.state['timerValue'] = this.timerValue;

    localStorage.setItem('volume', this.soundRange.value);
    localStorage.setItem('timer', this.timerBtn.checked ? 'on' : 'off');
    localStorage.setItem('timerValue', this.timerValue);

    this.checkSaveBtn();
    this.settingsElement.style.transform = 'translateX(-100vw)';
  }


  state = {
    volume: localStorage.getItem('volume') !== null ? localStorage.getItem('volume') : '0.5',
    timer: localStorage.getItem('timer') !== null ? localStorage.getItem('timer') : 'on',
    timerValue: localStorage.getItem('timerValue') !== null ? localStorage.getItem('timerValue') : '20'
  };
  
  render() {
    this.footer.style.transform = 'translateY(0)';
    this.soundRange.value = this.state['volume'];
    this.timerBtn.checked = this.state['timer'] == 'on' ? true : false;
    this.timerValueText.textContent = this.state['timerValue'];
    this.timerText.textContent = this.state['timer'];
    this.checkSaveBtn();
    this.bindActions();
  }

  bindActions() {
    document.getElementById('settings-exit').addEventListener('click', (e) => {
      e.preventDefault();
      this.settingsElement.style.transform = 'translateX(-100vw)';
    });

    this.soundRange.addEventListener('change', () => this.checkSaveBtn());
    this.timerBtn.addEventListener('change', () => {
      this.checkSaveBtn();
      this.timerBtn.checked ? this.timerText.textContent = 'on' : this.timerText.textContent = 'off';
    });

    document.querySelector('.settings-timer-minus').addEventListener('click', () => {
      if (this.timerValue != 5) {
        this.timerValue = parseInt(this.timerValue) - 5;
        this.checkSaveBtn();
        this.timerValueText.textContent = this.timerValue;
      }
    });

    document.querySelector('.settings-timer-plus').addEventListener('click', () => {
      if (this.timerValue != 30) {
        this.timerValue = parseInt(this.timerValue) + 5;
        this.timerValueText.textContent = this.timerValue;
        this.checkSaveBtn();
      }
    });

    document.querySelector('#settings-default').addEventListener('click', () => this.setDefault());
    document.querySelector('#settings-save').addEventListener('click', () => this.saveProps());
  }

  

  setDefault() {
    this.soundRange.value = '0.5';
    this.timerBtn.checked = true;
    this.timerValue = '20';
    this.timerText.textContent = 'on';
    this.timerValueText.textContent = '20';
    this.checkSaveBtn();
  }

  checkSaveBtn() {
    let check = this.timerBtn.checked ? 'on' : 'off';
    if (this.state.volume != this.soundRange.value || 
        this.timerValue != this.state.timerValue ||
        this.state.timer != check) 
        {
          this.saveBtn.classList.remove('disabled');
        }
    else {
      this.saveBtn.classList.add('disabled');
    }
  }
  
  
}


export {Settings};