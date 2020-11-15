import Route from './route';

import { html, safeHtml } from '../utils';

import {
  TIMER_MODES,
  TIMER_MODE__BLACK,
  TIMER_MODE__SPIRAL,
} from '../utils/constants';

export default class TimerRoute extends Route {
  get timestamp() {
    return this.param('ts');
  }

  get theme() {
    const theme = this.param('th')?.toLocaleLowerCase();

    if (Object.values(TIMER_MODES).includes(theme)) {
      return theme;
    }

    return TIMER_MODE__BLACK;
  }

  get clock() {
    return this.param('c');
  }

  render() {
    const spiral =
      this.theme === TIMER_MODE__SPIRAL
        ? safeHtml`
            <canvas data-controller="spiral"></canvas>
          `
        : safeHtml``;

    return html`
      <article data-route="timer" data-theme="${this.theme}">
        ${spiral}
        <section class="inner">
          <h1
            data-controller="timer"
            data-timer-timestamp="${this.timestamp}"
            data-timer-clock="${this.clock}"
          ></h1>
          <a href="/" class="back" data-navigo>&larr; Home</a>
        </section>
      </article>
    `;
  }
}
