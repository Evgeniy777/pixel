import {getElementFromTemplate} from './get-element-from-template';
import {showScreen} from './show-screen';
import screenRules from './screen-rules';
import footer from './templates/footer';

export default (gameData) => {
  const templateGreeting = `
  <div class="greeting central--blur">
    <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
    <h1 class="greeting__asterisk">*</h1>
    <div class="greeting__challenge">${gameData.GREETING_TEMPLATE}</div>
    <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
  </div>
  ${footer}`.trim();

  const screenGreeting = getElementFromTemplate(templateGreeting);
  const continueButton = screenGreeting.querySelector(`.greeting__continue`);

  continueButton.onclick = () => {
    showScreen(screenRules);
  };

  return screenGreeting;
};
