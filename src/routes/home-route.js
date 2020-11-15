import Route from './route';
import { html, safeHtml } from '../utils';

import Hourglass from '../../assets/img/hourglass.svg';

export default class HomeRoute extends Route {
  render() {
    const hourglassIcon = safeHtml`${Hourglass}`;

    return html`
      <article data-route="home">
        <section class="inner">
          <h1>
            ${hourglassIcon}
            <span>Memento</span>
            <span>Mori</span>
          </h1>

          <form
            action="#timer"
            method="GET"
            data-controller="form"
            data-action="form#handleSubmit"
          >
            <label>
              <span>I will die</span>
              <input
                type="text"
                name="ts"
                placeholder="someday"
                data-controller="flatpickr"
                required
              />
            </label>

            <label>
              <span>I want my timer to be</span>
              <select name="th" required>
                <option value="b">white on black</option>
                <option value="w">black on white</option>
                <option value="st">
                  on a split black and white background
                </option>
                <option value="sl">on a spiral background (GPU)</option>
              </select>
            </label>

            <label>
              <span>I want the clock to</span>
              <select name="c" required>
                <option value="s">be silent</option>
                <option value="t">tick</option>
                <option value="m">tick on milestones</option>
              </select>
            </label>

            <div class="actions">
              <button type="submit">RIP</button>
            </div>
          </form>
        </section>
      </article>
    `;
  }
}
