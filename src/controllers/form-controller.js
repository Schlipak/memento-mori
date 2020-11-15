import { stringify } from 'qs';

import ApplicationController from '../application-controller';

export default class extends ApplicationController {
  get router() {
    const root = document.querySelector('[data-controller="router"');

    if (!root) {
      return null;
    }

    return root.routerController.router;
  }

  get query() {
    return [...this.element.querySelectorAll('[name]')].reduce((acc, input) => {
      acc[input.name] = input.value;

      return acc;
    }, {});
  }

  get queryString() {
    return stringify(this.query);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.router) {
      this.router.navigate(`#timer?${this.queryString}`);
    }
  }
}
