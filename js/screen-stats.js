import {getElementFromTemplate} from './get-element-from-template';
import {showScreen} from './show-screen';
import screenGreeting from './screen-greeting';
import footer from './templates/footer';
import {stats} from './templates/stats';
import GAME_DATA from './data/game-data';
import {calculateFinalScores} from './engine/calculate-final-scores';

const GAME_SCORES = GAME_DATA.SCORES;

export default (state) => {
  console.log(state);
  const gameResultTitle = (stateObj) => {
    return stateObj.scores > 0 ? `Победа` : `Поражение`;
  };

  const countEntries = (array, key) => {
    let count = 0;
    array.forEach((element) => {
      count = (element === key) ? ++count : count;
    });
    return count;
  };

  state.gamesHistory.push({
    stats: state.stats,
    lives: state.lives
  });

  const templateStats = `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>
  <div class="result">
    <h1>${gameResultTitle(state)}!</h1>
    ${state.gamesHistory.map((game, index) => {
    const rightAnswers = countEntries(game.stats, GAME_DATA.ANSWER.CORRECT);
    const totalScores = calculateFinalScores(game.stats, game.lives);
    const fast = countEntries(game.stats, GAME_DATA.ANSWER.FAST);
    const alive = game.lives;
    const slow = countEntries(game.stats, GAME_DATA.ANSWER.SLOW);
    const answers = game.stats;

    if (totalScores > 0) {
      return `<table class="result__table">
            <tr>
              <td class="result__number">${index + 1}.</td>
              <td colspan="2">
                ${stats(answers)}
              </td>
              <td class="result__points">×&nbsp;${GAME_SCORES.SUCCESS}</td>
              <td class="result__total">${rightAnswers * GAME_SCORES.SUCCESS}</td>
            </tr>
            ${fast ? `<tr>
              <td></td>
              <td class="result__extra">Бонус за скорость:</td>
              <td class="result__extra">${fast}&nbsp;<span class="stats__result stats__result--fast"></span></td>
              <td class="result__points">×&nbsp;${GAME_SCORES.FAST}</td>
              <td class="result__total">${fast * GAME_SCORES.FAST}</td>
            </tr>` : ``}      
            ${alive > 0 ? `<tr>
              <td></td>
              <td class="result__extra">Бонус за жизни:</td>
              <td class="result__extra">${alive}&nbsp;<span class="stats__result stats__result--alive"></span></td>
              <td class="result__points">×&nbsp;${GAME_SCORES.EXTRA}</td>
              <td class="result__total">${alive * GAME_SCORES.EXTRA}</td>
            </tr>` : ``}      
            ${slow > 0 ? `<tr>
              <td></td>
              <td class="result__extra">Штраф за медлительность:</td>
              <td class="result__extra">${slow}&nbsp;<span class="stats__result stats__result--slow"></span></td>
              <td class="result__points">×&nbsp;${GAME_SCORES.SLOW}</td>
              <td class="result__total">${-slow * GAME_SCORES.SLOW}</td>
            </tr>` : ``}      
            <tr>
              <td colspan="5" class="result__total  result__total--final">${totalScores}</td>
            </tr>
          </table>`;
    } else {
      return `<table class="result__table">
          <tr>
            <td class="result__number">${index + 1}.</td>
            <td>
              <ul class="stats">
                ${stats(answers)}
              </ul>
            </td>
            <td class="result__total"></td>
            <td class="result__total  result__total--final">fail</td>
          </tr>
        </table>`;
    }
  })}    
  </div>
  ${footer}`.trim();

  const screenStats = getElementFromTemplate(templateStats);
  const buttonBack = screenStats.querySelector(`.back`);

  buttonBack.onclick = () => showScreen(screenGreeting());

  return screenStats;
};
