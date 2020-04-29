function convertStringToNumber(string, radix = 10) {
  const rep = /^[0-9]{1,}(\.[0-9]{1,})?$/;
  if (typeof string === "string" && rep.test(string)) {
    if (radix > 10 || radix < 2) {
      return;
    }
    let chars = string.split("");
    let number = 0;
    let i = 0;
    while (i < chars.length && chars[i] != ".") {
      number *= radix;
      number += chars[i].codePointAt(0) - "0".codePointAt(0);
      i++;
    }
    if (chars[i] === ".") {
      i++;
    }
    let fraction = 1;
    while (i < chars.length) {
      fraction /= radix;
      number += (chars[i].codePointAt(0) - "0".codePointAt(0)) * fraction;
      i++;
    }
    return number;
  }
  return new Error("无法转换");
}

console.log(convertStringToNumber("1234"));
