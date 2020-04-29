function convertNumberToString(number, x = 10, fractionLength = 20) {
  if (typeof number !== "number") {
    console.log("请输入数字");
    return;
  }

  let zoom = x ** fractionLength;
  if (zoom * number === Infinity || zoom * number === -Infinity) {
    zoom = 1;
  }
  let integer = Math.floor(number);
  let fraction = number - integer;
  let str = integer ? "" : "0";
  while (integer > 0) {
    str = (integer % x) + str;
    integer = Math.floor(integer / x);
  }
  if (fraction > 0) {
    str = str + ".";
    let count = 0;
    while (fraction > 0) {
      const tmp = fraction * x;
      const floorTmp = Math.floor(tmp);
      str = str + floorTmp;
      fraction = tmp - floorTmp;
      count++;
      if (count > fractionLength) {
        break;
      }
    }
  }
  return str;
}

var a = convertNumberToString("abc", 2);

console.log("a", a);
