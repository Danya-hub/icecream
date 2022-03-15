import {
  state as Varible,
} from '@/store/statics.js';

export function renameOldname(object) {
  let entries = Object.entries(object),
    newObj = {};

    Varible.mutableSelectors.forEach((e) => {
    let isFindedInd = -1;

    e.oldName.forEach((key) => {
      if (!~isFindedInd)
        isFindedInd = Object.keys(object).indexOf(key);
    });

    if (!~isFindedInd) return;
    e.newName.forEach((name, i) => entries.splice(isFindedInd + i, !i ? 1 : 0, [name, entries[isFindedInd][1]]));
  });

  entries.forEach((prop) => {
    newObj[prop[0]] = prop[1];
  });

  return newObj;
}

export function setActionForScrolling({
  innerListener = () => {},
  innerTimeout = () => {},
}, duration) {
  let isMove = false;

  window.addEventListener('wheel', (e) => {
    if (isMove) return;
    isMove = true;

    innerListener(e);
    setTimeout(() => {
      innerTimeout(e);
      isMove = false;
    }, duration);
  });
}

export function setStyleForElem(name, content) {
  if (document.getElementById(`${name}style`)) return;

  const newStyle = document.createElement('style');
  newStyle.id = `${name}style`;
  document.head.append(newStyle);

  newStyle.sheet.insertRule(`
    .${name} {
      ${content}
    }
  `);
}

export function replaceObjToRenderFunc(createElement, arr) {
  const compArr = [];

  arr.forEach((obj) => {
    compArr.push(
      typeof obj !== 'string' ?
      createElement(obj.tag, obj.options, (obj.components ? replaceObjToRenderFunc(createElement, obj
        .components) : [])) :
      obj,
    );
  });

  return compArr;
}
