import {GetServices} from '../services/getServices.js';
import {AudioServices} from '../services/audioServices.js';
import {Welcome} from './welcome.js';
import {Quiz} from './quiz.js';
import images from './db.js';

class PaintingQuiz extends Quiz {
  constructor(state, index) {
    super();
    this.state = state;
    this.index = index;
    this.picture.classList.remove('hidden');
    this.audio = new AudioServices(+this.state['volume']);
    this.service = new GetServices();
    this.blockOfQuestion = (+this.index - 1) * 10;
    this.picIndex = (+this.index - 1) * 10;    
    this.amountOfAnswers = 0;
    this.amountOfCorrectAnswers = 0;
    this.correctAnswer;
    this.results = [];
    this.isTimerOn = this.state['timer'] == 'on' ? true : false;
    this.isSoundOn = +this.state['volume'] != 0 ? true : false;
  }
  
  // запуск старта
  async renderQuiz() {
    await this.service.setBg(this.picIndex++, this.picture);
    this.renderDots();
    if (this.isSoundOn) {
      this.audio.playStartRound();
    }
    this.renderQuestion();
    this.renderAnswers();
  }

  renderQuestion() {
    this.question.textContent = 'Who wrote that picture?';
  }
  
  renderAnswers() {
    const index = this.blockOfQuestion + this.amountOfAnswers;
    this.correctAnswer = images[index].author;
    let options = [];
    options.push(this.correctAnswer);
    while (options.length !== 4) {
      let option = this.getRandomOption();
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    this.shuffle(options);
    this.createButtons(options);

    // запускаем таймер
    this.setTimer(this.isTimerOn);
  }

  getRandomOption() {
    return images[Math.floor(Math.random() * 241)].author;
  }

  createButtons(arr) {
    this.answers.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      let btn = document.createElement('button');
      btn.classList.add("btn", "btn-quiz");
      btn.type = "button";
      btn.textContent = arr[i];
      btn.setAttribute('data-value', arr[i]);
      btn.addEventListener('click', () => {
        this.checkAnswer(btn)
      }, { once: true });
      this.answers.appendChild(btn);
    }
  }

  //удаляем таймер
  checkAnswer(btn) {
    clearInterval(this.startTimer);

    let isCorrect = btn.getAttribute('data-value') == this.correctAnswer ? true : false;

    if (isCorrect) {
      btn.classList.add('correct');
      this.dots.querySelectorAll('.quiz-painting-dot')[this.amountOfAnswers].classList.add('correct');
      this.results.push(true);
      this.amountOfCorrectAnswers++;
      if (this.isSoundOn) {
        this.audio.playCorrect();
      }
      this.showResult(isCorrect);
    }
    else {
      btn.classList.add('wrong');
      this.loseRound();
    }
  }

  loseRound() {
    const btns = this.answers.querySelectorAll('button');
    btns.forEach(btn => btn.classList.add('disabled'));
    this.dots.querySelectorAll('.quiz-painting-dot')[this.amountOfAnswers].classList.add('wrong');
    
    let correctBtn = Array.from(btns).find(elem => elem.getAttribute('data-value') == this.correctAnswer);
    correctBtn.classList.add('correct');
    this.results.push(false);
    if (this.isSoundOn) {
      this.audio.playWrong();
    }
    this.showResult(false);
  }

  async showResult(result) {
    let index = this.blockOfQuestion + this.amountOfAnswers;
    let btnName = this.amountOfAnswers == 9 ? 'End Round' : 'Next Round';
    let icon = result ? 'correct' : 'wrong';
    await this.service.openResult(index, icon, btnName, this.nextRound.bind(this));
  }

  async startNextRound() {
    await this.service.setBg(this.picIndex++, this.picture);
    this.renderAnswers();
  }
  
  nextRound() {
    this.popup.style.transform = 'translateY(100vh)';
    if (this.amountOfAnswers != 9) {
      this.amountOfAnswers++;
      this.startNextRound();
    }
    else {
      //end of round
      let stringWithAnswers = '';
      this.results.forEach(res => {
        res == true ? stringWithAnswers += '1,' : stringWithAnswers += '0,';
      });
      stringWithAnswers = stringWithAnswers.substring(0, stringWithAnswers.length - 1);

      //сохранить массив ответов в сторэдж
      localStorage.setItem(`CatPaintAnswArr${this.index}`, stringWithAnswers);
      this.state[`CatPaintAnswArr${this.index}`] = stringWithAnswers;

      localStorage.setItem(`CatPaintAnsw${this.index}`, this.amountOfCorrectAnswers);
      this.state[`CatPaintAnsw${this.index}`] = this.amountOfCorrectAnswers;

      if (this.amountOfCorrectAnswers == 10) {
        setTimeout(() => this.service.endRoundResult('GRAND', this.goHome.bind(this), this.nextQuiz.bind(this)), 300);
      }

      else if (+this.amountOfCorrectAnswers > 5) {
        setTimeout(() => this.service.endRoundResult('WIN', this.goHome.bind(this), this.nextQuiz.bind(this), this.amountOfCorrectAnswers), 300);
      }

      else {
        setTimeout(() => this.service.endRoundResult('LOSE', this.goHome.bind(this), this.restartRound.bind(this)), 300);
      }

      if (this.isSoundOn) {
        this.audio.playEndRound();
      }
      this.thisPage.style.transform = 'translateX(100vw)';
    }
  }

  nextQuiz() {
    this.popup.style.transform = 'translateY(100vh)';
    let index = +this.index;
    let newIndex = 0;
    
    for (let i = 1; i < 13; i++) {
      index++;
      index == 13 ? index = 0 : index = index;
      if (this.state[`CatPaintAnsw${index}`] != 10) {
        newIndex = index;
        break;
      }
    }

    if (newIndex == 0) {
      this.goHome();
    } else {
      new PaintingQuiz(this.state, newIndex).render();
    }
  }

  goHome() {
    
    this.popup.style.transform = 'translateY(100vh)';
    this.footer.style.transform = 'translateY(45px)';
    this.thisPage.style.transform = 'translateX(100vw)';
    new Welcome(this.state).render();
  }

  restartRound() {
    this.popup.style.transform = 'translateY(100vh)';
    new PaintingQuiz(this.state, this.index).render();
  }
  
}

export { PaintingQuiz };
