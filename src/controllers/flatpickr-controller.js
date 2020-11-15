import flatpickr from 'flatpickr';

import ApplicationController from '../application-controller';

export default class extends ApplicationController {
  connect() {
    this.picker = flatpickr(this.element, {
      enableTime: true,
      altInput: true,
      minDate: 'today',
      dateFormat: 'U',
      altFormat: '\\o\\n F J Y \\a\\t G:i K',
    });
  }
}
