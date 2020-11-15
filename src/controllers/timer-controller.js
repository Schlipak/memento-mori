import ApplicationController from '../application-controller';

import Tick1 from '../../assets/sfx/tick_1.mp3';
import Tock1 from '../../assets/sfx/tock_1.mp3';
import Tick2 from '../../assets/sfx/tick_2.mp3';
import Tock2 from '../../assets/sfx/tock_2.mp3';

export const MILESTONES = [
  { time: 8_640_000, interval: [30, 15] },
  { time: 604_800, interval: [30, 15] },
  { time: 86_400, interval: [30, 15] },
  { time: 43_200, interval: [30, 15] },
  { time: 18_000, interval: [30, 15] },
  { time: 14_400, interval: [30, 15] },
  { time: 10_800, interval: [30, 15] },
  { time: 7_200, interval: [30, 15] },
  { time: 3_600, interval: [30, 30] },
  { time: 1_800, interval: [30, 30] },
  { time: 600, interval: [30, 30] },
  { time: 60, interval: [60, 120] },
];

export default class extends ApplicationController {
  connect() {
    if (this.useAudio) {
      this.prepareAudio();
    }

    this.element.textContent = this.formattedDuration;
    this.every(() => this.update());
  }

  update() {
    this.element.textContent = this.formattedDuration;

    if (this.useAudio) {
      const index = this.durationSeconds % 4;
      const audio = this.audioSources[index];

      if (audio) {
        if (this.data.get('clock') === 'm') {
          MILESTONES.forEach(({ time, interval }) => {
            const [before, after] = interval;
            const [start, end] = [time + before, time - after];

            if (this.duration <= start && this.duration >= end) {
              audio.play();
            }
          });
        } else {
          audio.play();
        }
      }
    }

    if (this.duration === 0) {
      this.clearAllIntervals();
    }
  }

  get useAudio() {
    const data = this.data.get('clock');

    return data && data !== 's';
  }

  prepareAudio() {
    this.audioSources = [
      new Audio(Tick1),
      new Audio(Tock1),
      new Audio(Tick2),
      new Audio(Tock2),
    ];
  }

  get now() {
    return Math.round(Date.now() / 1000);
  }

  get timestamp() {
    return Number.parseInt(this.data.get('timestamp'), 10);
  }

  get secondsInMinute() {
    return 60;
  }

  get secondsInHour() {
    return this.secondsInMinute * 60;
  }

  get secondsInDay() {
    return this.secondsInHour * 24;
  }

  get duration() {
    return Math.max(this.timestamp - this.now, 0);
  }

  get durationDays() {
    return Math.floor(this.duration / this.secondsInDay);
  }

  get durationHours() {
    const rest = this.duration - this.durationDays * this.secondsInDay;

    return Math.floor(rest / this.secondsInHour);
  }

  get durationMinutes() {
    const rest =
      this.duration -
      this.durationDays * this.secondsInDay -
      this.durationHours * this.secondsInHour;

    return Math.floor(rest / this.secondsInMinute);
  }

  get durationSeconds() {
    return (
      this.duration -
      this.durationDays * this.secondsInDay -
      this.durationHours * this.secondsInHour -
      this.durationMinutes * this.secondsInMinute
    );
  }

  get formattedDuration() {
    if (
      Number.isNaN(this.durationDays) ||
      Number.isNaN(this.durationHours) ||
      Number.isNaN(this.durationMinutes) ||
      Number.isNaN(this.durationSeconds)
    ) {
      return 'Someday';
    }

    const days = this.durationDays.toString().padStart(2, '0');
    const hours = this.durationHours.toString().padStart(2, '0');
    const minutes = this.durationMinutes.toString().padStart(2, '0');
    const seconds = this.durationSeconds.toString().padStart(2, '0');

    return `${days}:${hours}:${minutes}:${seconds}`;
  }
}
