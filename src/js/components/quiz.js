
class Quiz {
  constructor() {

    this.thisPage = document.querySelector('.quiz-painting');
    this.question = document.querySelector('.quiz-painting-question');
    this.answers = document.querySelector('.quiz-painting-answers');
    this.popup = document.querySelector('.popup');
    this.footer = document.querySelector('footer');
    this.dots = document.querySelector('.quiz-painting-dots');
    this.picture = document.querySelector('.quiz-painting-image');
    this.timerLine = document.querySelector('.timer-block-line');
    this.timerProgress = document.querySelector('.timer-block-line-progress');
    this.timerSeconds = document.querySelector('.timer-block-time');
    //timer
    this.isTimerOn = true;
    this.isSoundOn = false;

    //interval
    this.startTimer;
    this.timeRemains;

    document.querySelector('.quiz-painting-exit').addEventListener('click', () => {
      this.service.showPause(this.resumeTimer.bind(this), this.goHome.bind(this));
      clearInterval(this.startTimer);
    });
  }

  render() {
    this.footer.style.transform = 'translateY(0)';
    this.thisPage.style.transform = 'translateX(0)';
    this.renderQuiz();
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  loseRound() {
    console.log('round lost');
  }

  //отрисовка всех 10 дотов
  renderDots() {
    this.dots.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      let el = document.createElement('div');
      el.classList.add('quiz-painting-dot');
      this.dots.appendChild(el);
    } 
  }

  // TIMER BLOCK

  setTimer(t) {
    if (!t) {
      this.timerLine.style.display = 'none';
      this.timerSeconds.style.display = 'none';
      return;
    }
    this.timerLine.style.display = 'block';
    this.timerSeconds.style.display = 'block';

    let timerValue = +this.state['timerValue'];
    this.timerSeconds.textContent = timerValue;
    const future = new Date().getTime() + timerValue * 1000;


    this.startTimer = setInterval(() => {
      const now = new Date().getTime();
      this.timeRemains = future - now;
      let seconds = Math.round((this.timeRemains % (1000 * 60)) / 1000);
      let percent = this.timeRemains * 100 / (timerValue * 1000);

      if (this.timeRemains <= 0) {
        clearInterval(this.startTimer);
        this.timerSeconds.textContent = 0;
        this.timerProgress.style.width = `0%`;
        this.loseRound();
      }

      else {
        this.timerSeconds.textContent = seconds;
        this.timerProgress.style.width = `${percent}%`;
      }
    }, 10);
  }

  resumeTimer() {
    this.popup.style.transform = 'translateY(100vh)';
    const timerValue = +this.state['timerValue'];
    const future = new Date().getTime() + this.timeRemains;

    this.startTimer = setInterval(() => {
      const now = new Date().getTime();
      this.timeRemains = future - now;
      let seconds = Math.round((this.timeRemains % (1000 * 60)) / 1000);
      let percent = this.timeRemains * 100 / (timerValue * 1000);

      if (this.timeRemains <= 0) {
        clearInterval(this.startTimer);
        this.timerSeconds.textContent = 0;
        this.timerProgress.style.width = `0%`;
        this.loseRound();
      }

      else {
        this.timerSeconds.textContent = seconds;
        this.timerProgress.style.width = `${percent}%`;
      }
    }, 10);
  }
  // TIMER BLOCK END!!!
}

export {Quiz};