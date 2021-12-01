class AudioServices {
  constructor(value) {
    this.audio = document.querySelector('.audio-player');
    this.audio.volume = +value;

    this.path = {
      'correct': './sounds/correct.wav',
      'wrong': './sounds/wrong.wav',
      'startRound': './sounds/startRound.wav',
      'endRound': './sounds/endRound.wav'
    }
  }
  
  playCorrect() {
    this.audio.setAttribute('src', this.path['correct']);
    this.audio.play()
  }

  playWrong() {
    this.audio.setAttribute('src', this.path['wrong']);
    this.audio.play()
  }

  playStartRound() {
    this.audio.setAttribute('src', this.path['startRound']);
    this.audio.play()
  }

  playEndRound() {
    this.audio.setAttribute('src', this.path['endRound']);
    this.audio.play()
  }

}

export {AudioServices};