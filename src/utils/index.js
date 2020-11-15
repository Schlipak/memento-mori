import escapeHtml from 'lodash.escape';
import isPlainObject from 'lodash.isplainobject';

export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export const isNullOrUndefined = (value) => value == undefined;

export const createTaggedTemplateString = ({
  separator = '',
  escape = false,
}) => (strings, ...values) => ({
  __templateString: true,
  escape,
  string: strings
    .map((string, i) => {
      if (isNullOrUndefined(values[i])) {
        return string;
      }

      const value = values[i];

      if (
        isPlainObject(value) &&
        '__templateString' in value &&
        value.__templateString
      ) {
        if (!value.escape) {
          return string + value.string;
        }
      }

      if (escape) {
        return string + escapeHtml(value);
      }

      return string + value;
    })
    .join('')
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length)
    .join(separator),

  toString() {
    return this.string;
  },
});

export const css = createTaggedTemplateString({
  separator: ' ',
  escape: false,
});

export const html = createTaggedTemplateString({
  separator: '\n',
  escape: true,
});

export const safeHtml = createTaggedTemplateString({
  separator: '\n',
  escape: false,
});
