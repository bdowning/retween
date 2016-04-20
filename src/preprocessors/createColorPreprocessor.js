import identity from '../identity';

const hexColor =
  /#([0-9A-Fa-f]{8}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{3})\b/g;
const rgbIntColor =
  /(rgba?)\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g;

function convertHexColor(match, hexDigits) {
  const dehex = (start, size, div, mult, prec) => {
    const ret = (parseInt(hexDigits.slice(start, start + size), 16) / div * mult)
      .toFixed(prec);
    return ret;
  };
  const dehex1 = start => dehex(start, 1, 15, 100, 2);
  const dehex1a = start => dehex(start, 1, 15, 1, 3);
  const dehex2 = start => dehex(start, 2, 255, 100, 2);
  const dehex2a = start => dehex(start, 2, 255, 1, 3);

  switch (hexDigits.length) {
  case 3: return `rgb(${dehex1(0)}%, ${dehex1(1)}%, ${dehex1(2)}%)`;
  case 4: return `rgba(${dehex1(0)}%, ${dehex1(1)}%, ${dehex1(2)}%, ${dehex1a(3)})`;
  case 6: return `rgb(${dehex2(0)}%, ${dehex2(2)}%, ${dehex2(4)}%)`;
  case 8: return `rgba(${dehex2(0)}%, ${dehex2(2)}%, ${dehex2(4)}%, ${dehex2a(6)})`;
  }

  return match;  // should never reach
}

function convertRgbIntColor(match, rgb, red, green, blue) {
  const redP = (red / 255 * 100).toFixed(2);
  const greenP = (green / 255 * 100).toFixed(2);
  const blueP = (blue / 255 * 100).toFixed(2);

  return `${rgb}(${redP}%, ${greenP}%, ${blueP}%`;
}

export default function createColorPreprocessor() {
  return (state, easing) => {
    let newState = state;

    for (let prop in state) {
      const value = state[prop];
      if (typeof value === 'string') {
        let newValue = value.replace(hexColor, convertHexColor);
        newValue = newValue.replace(rgbIntColor, convertRgbIntColor);
        if (newValue !== value) {
          if (newState === state) {
            newState = Object.assign({ }, state);
          }
          newState[prop] = newValue;
        }
      }
    }

    return [ newState, easing, identity ];
  };
}
