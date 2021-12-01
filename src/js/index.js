import '../scss/styles.scss';
import './components/bootstrap.bundle.js';
import {Settings} from './components/settings.js';
import {Welcome} from './components/welcome';

document.addEventListener('DOMContentLoaded', () => {
  // localStorage.clear()
  const state = {
    volume: localStorage.getItem('volume') !== null ? localStorage.getItem('volume') : '0.5',
    timer: localStorage.getItem('timer') !== null ? localStorage.getItem('timer') : 'on',
    timerValue: localStorage.getItem('timerValue') !== null ? localStorage.getItem('timerValue') : '20'
  };

  for (let i = 1; i < 13; i++) {
    
    localStorage.getItem(`CatPaintAnsw${i}`) !== null ? state[`CatPaintAnsw${i}`] = localStorage.getItem(`CatPaintAnsw${i}`) : state[`CatPaintAnsw${i}`] = null;
    localStorage.getItem(`CatPaintAnswArr${i}`) !== null ? state[`CatPaintAnswArr${i}`] = localStorage.getItem(`CatPaintAnswArr${i}`) : state[`CatPaintAnswArr${i}`] = null;
    localStorage.getItem(`CatArtAnsw${i}`) !== null ? state[`CatArtAnsw${i}`] = localStorage.getItem(`CatArtAnsw${i}`) : state[`CatArtAnsw${i}`] = null;
    localStorage.getItem(`CatArtAnsw${i}`) !== null ? state[`CatArtAnsw${i}`] = localStorage.getItem(`CatArtAnsw${i}`) : state[`CatArtAnsw${i}`] = null;
  }
  new Welcome(state).render();
  
  new Settings(state).render();
  
});