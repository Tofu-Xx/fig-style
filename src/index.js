
const attrMap = {};
const valMap = {};

export function setAttrMap(obj) {
  Object.assign(attrMap, obj);
}
export function setValMap(obj) {
  Object.assign(valMap, obj);
}
window.onload = () => {
  /* 属性映射表 */
  const defaultAttrMap = {
    /* 首字母命名法 */
    w: "width",
    h: "height",
    p: "padding",
    m: "margin",
    ml: "margin-left",
    mt: "margin-top",
    mr: "margin-right",
    mb: "margin-bottom",
    pl: "padding-left",
    pt: "padding-top",
    pr: "padding-right",
    pb: "padding-bottom",
    t: "top",
    b: "bottom",
    l: "left",
    r: "right",
    c: "color",
    fs: "font-size",
    fw: "font-weight",
    dp: "display",
    /* 取三命名法 */
    pos: "position",
    bor: "border",
    /* 复合命名法 */
    bg: "background",
    bgc: "background-color",
    borr: "border-radius",
    /* 其他 */
    cross: "align-items",
    main: "justify-content",
    /* 用户自定义 */
    ...attrMap,
  };
  /* 属性值映射表 */
  const defaultValMap = {
    /* 用户自定义 */
    ...valMap,
  };
  /* css */
  let cssString = '*,*:before,*:after{margin:0;padding:0;box-sizing:border-box}body{min-height:100vh}a{text-decoration:inherit;color:inherit}ul,ol,li{list-style:none}button,input,select,option,textarea{border:unset;outline:unset}i,em{font-style:inherit}b,strong{font-weight:inherit}f-col,f-row{background-color:#0002}*:has(>f-row),*:has(>f-col){display:flex}*:has(>f-col){flex-direction:row}*:has(>f-row){flex-direction:column}.fig-center{display:grid;place-content:center}.fig-wh{--wh1: 100%;--wh2: transparent;width:var(--wh1);height:var(--wh1);background-color:var(--wh2)}.fig-row{display:flex;flex-direction:row;justify-content:center;align-items:center}.fig-col{display:flex;flex-direction:column;justify-content:center;align-items:center}.fig-pseudoEl{--pseudoEl1: "";--pseudoEl2: ""}.fig-pseudoEl:before,.fig-pseudoEl:after{display:block}.fig-pseudoEl:after{content:var(--pseudoEl1)}.fig-pseudoEl:before{content:var(--pseudoEl2)}';

  /* 语法符号 */
  const val_val = "_";
  const attr_val = ":";
  const funTab = ")";
  const leftFunTab = "(";
  const selectorTab = "}";
  const leftSelectorTab = "{";
  const atom_atom = ";";
  const arg_arg = "|";
  const importantTab = "!";
  const classTab = "class!";
  /* 特殊字符转义 */
  const escapeList = "!@#$%^&*()+[]`'\"~{}\\|:;<>,./?".split("");

  /* 基础判断 */
  function isStart(str, target) {
    return str.startsWith(target);
    // return str[0] === target;
  }
  function isEnd(str, target) {
    return str.at(-1) === target;
  }
  function has(str, target) {
    return Boolean(str.indexOf(target) + 1);
  }
  function hasNum(str) {
    return Boolean(str.search(/\d/) + 1);
  }
  function isStartNum(str) {
    return /^\d/.test(str);
  }

  /* fAttr类型判断 */
  function isFun(fAttr) {
    const i = fAttr.indexOf(leftFunTab);
    if (i === -1) return false;
    // console.log(i);
    let [funName, _] = cut(fAttr, i);
    if (has(funName, attr_val)) {
      return false;
    }
    return isEnd(fAttr, funTab); /* && !has(fAttr, attr_val); */
  }
  function isSelector(fAttr) {
    return isEnd(fAttr, selectorTab);
  }
  function isCommonAtom(fAttr) {
    return has(fAttr, attr_val) && !isStart(fAttr, attr_val);
  }
  function isAbbrAtom(fAttr) {
    return !has(fAttr, attr_val);
  }

  function isClass(str) {
    return isStart(str, classTab);
  }

  /* 判断是否为fAttr */
  function isFAttr(dom, attr) {
    const isEmpty = Boolean(!dom?.getAttribute(attr));
    return (
      (isCommonAtom(attr) || isFun(attr) || isSelector(attr) || hasNum(attr)) &&
      isEmpty &&
      !isStartNum(attr) &&
      !isStart(attr, "#")
      // !isStart(attr, "?")
    );
  }
  /*  */
  function cut(str, i) {
    return [str.slice(0, i), str.substr(i)];
  }

  /* 将RawAttr解析为css属性 */
  function parseRawAttr(rawAttr) {
    let cssAttr = defaultAttrMap[rawAttr];
    if (!cssAttr) {
      cssAttr = rawAttr;
      // console.warn(`${rawAttr}未做属性映射`);
    }
    return cssAttr;
  }

  function parseRawVal(rawValGroup) {
    // console.log(rawValGroup)
    /* 有!important标识 */
    if (rawValGroup.at(-1) === importantTab) {
      rawValGroup = rawValGroup.slice(0, -1);
      rawValGroup += "_!important";
    }
    const cssVal = rawValGroup
      .split(val_val)
      .map((rawVal) => defaultValMap[rawVal] ?? rawVal)
      .join(" ");

    // console.log(cssVal)
    return cssVal;
  }


  function funToCss(fun) {
    // console.log(fun)
    const i = fun.indexOf(leftFunTab);
    let [funName, funArgs] = cut(fun, i);
    funName = isClass(funName) ? funName.slice(6, funName.length) : funName;
    funArgs = funArgs.slice(1, -1);
    if (!funArgs) return;
    // console.log(funArgs)
    funArgs = funArgs
      .split(arg_arg)
      .map((el, i) => {
        // console.log('所有',el)
        /* 指定传参 */
        if (isFAttr(null, el)) {
          /* 默认传参为css函数 */
          if (isFun(el) && !has(el, attr_val)) {

            return `--${funName}${i + 1}:${parseRawVal(el)};`;
          }
          let rawAttr, rawVal;
          /* fig一般属性 */
          if (isCommonAtom(el)) [rawAttr, rawVal] = el.split(attr_val);
          /* fig简写属性 */
          if (isAbbrAtom(el)) {
            const i = el.match(/\d/)?.index;
            [rawAttr, rawVal] = cut(el, i);
          }
          return `--${rawAttr}:${parseRawVal(rawVal)};`;
        }
        console.log(funName);
        /* 默认传参 */
        return `--${funName}${i + 1}:${parseRawVal(el)};`;
      })
      .join("");
    return funArgs;
  }


  function handleClass(str) {
    if (isClass(str)) {
      str = str.substring(classTab.length, str.length);
    }
    return str;
  }
  function atomToCss(atom) {
    atom = handleClass(atom);
    // console.log(atom)
    let rawAttr, rawVal;
    /* fig一般属性 */
    if (isCommonAtom(atom)) [rawAttr, rawVal] = atom.split(attr_val);
    /* fig简写属性 */
    if (isAbbrAtom(atom)) {
      const i = atom.match(/\d/)?.index;
      [rawAttr, rawVal] = cut(atom, i);
    }
    const cssAttr = parseRawAttr(rawAttr);
    const cssVal = parseRawVal(rawVal);
    // console.log(cssAttr,cssVal)
    return `${cssAttr}:${cssVal};`;
  }

  function escape(fSelector) {
    return fSelector
      .split("")
      .map((el) => (escapeList?.indexOf(el) + 1 ? `\\${el}` : el))
      .join("");
  }

  function parseSelector(selectorAttr) {
    // console.log(selectorAttr);
    // selectorAttr=handleClass(selectorAttr)
    /* toSelector,toAtomGroup */
    const i = selectorAttr.indexOf(leftSelectorTab);
    let [selector, atomGroup] = cut(selectorAttr, i);
    atomGroup = atomGroup.slice(1, -1);
    /* toCss */
    let funCalssList = [];
    // console.log(atomGroup)
    const css = atomGroup
      .split(atom_atom)
      .map((atom) => {
        // console.log(atom)
        if (isFun(atom)) {
          const funName = atom.slice(0, atom.indexOf(leftFunTab));
          funCalssList.push("fig-" + funName);
        }
        return toCss(atom);
      })
      .join("");

    /* toCssSelector */
    function escapeToCssSelector(figSelector) {
      return figSelector.replaceAll(/\\\\/g, " ").replaceAll(/\\/g, ">");
    }
    /*  */
    const escaped = escapeToCssSelector(selector);
    selector = escaped.split(",").map((selector) => {
      if (isClass(selectorAttr)) {
        const a = handleClass(selectorAttr);
        const b = handleClass(selector);
        // console.log(selector);
        return `.${escape(a) + b}`;
      }
      return `[${escape(selectorAttr)}]${selector}`;
    });
    // .join(",\n");
    /* 组合选择器与funClass */
    const funSelector = selector.map((el) => {
      const funUnionSelector = funCalssList.map((funCalss) => {
        Array(...document.querySelectorAll(el)).forEach((el) => {
          el.classList.add(funCalss);
        });
        return el + "." + funCalss;
      });
      return funUnionSelector;
    });
    selector = [...selector, ...funSelector].flat();

    return {
      selector,
      css,
    };
  }
  function toCss(fAttr) {
    /*  */
    if (isFun(fAttr)) {
      return funToCss(fAttr);
    } else if (isSelector(fAttr)) {
      return parseSelector(fAttr).css;
    } else {
      return atomToCss(fAttr);
    }
  }

  function fFunToSelector(fFun) {
    let funName = fFun.slice(0, fFun.indexOf(leftFunTab));
    let escaped;
    let selector;
    let hasFunDomList;

    /* 生成选择器 */
    if (isClass(fFun)) {
      fFun = handleClass(fFun);
      funName = handleClass(funName);
      escaped = escape(fFun);
      hasFunDomList = Array(...document.querySelectorAll(`.${escaped}`));
      selector = `.${escaped}`;
    } else {
      escaped = escape(fFun);
      hasFunDomList = Array(...document.querySelectorAll(`[${escaped}]`));
      selector = `[${escaped}].fig-${funName}`;
    }
    // console.log(hasFunDomList);
    /* 添加类 */
    hasFunDomList.forEach((el) => el.classList.add("fig-" + funName));

    /* 空参不生成额外选择器 */
    const i = fFun.indexOf(leftFunTab);
    let [_, funArgs] = cut(fFun, i);
    funArgs = funArgs.slice(1, -1);
    if (!funArgs) return;

    return selector;
  }
  function toSelector(fAttr) {
    if (isSelector(fAttr)) {
      // console.log(fAttr)
      return parseSelector(fAttr).selector;
    }

    // console.log(fAttr)
    if (isFun(fAttr)) {
      return fFunToSelector(fAttr);
    }

    // console.log(isClass('class!sad'))
    const selector = isClass(fAttr)
      ? `.${escape(handleClass(fAttr))}`
      : `[${escape(fAttr)}]`;
    // console.log(selector)
    return selector;
  }

  /* 业务代码 */
  /* 获取figtag */
  const fAttrList = Array.from(
    new Set(
      Array(...document.querySelectorAll("*"))
        .map((fDom) =>
          Array(
            ...Array(...fDom.attributes).map((el) =>
              isFAttr(fDom, el.name) ? el.name : undefined
            ),
            ...Array(...fDom.classList).map((el) =>
              isFAttr(fDom, el) ? classTab + el : undefined
            )
          )
        )
        .flat()
        .filter((el) => el)
    )
  );

  /* 最终的css */
  cssString += fAttrList
    .map((fAttr) => {
      return `${toSelector(fAttr)}{${toCss(fAttr)}}`;
    })
    .join("");

  /* 挂载style标签 */
  (() => {
    const style = document.createElement("style");
    style.innerHTML = cssString;
    const mount = document.querySelector("style");
    if (mount) {
      mount.parentElement?.insertBefore(style, mount);
    } else {
      document.querySelector("head")?.append(style);
    }
  })();
};
