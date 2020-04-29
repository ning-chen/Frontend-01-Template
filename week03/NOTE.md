七种基本类型：

* Null
* Undefined
* Boolean
* String
* Number
* Object
* Symbol

因为 JavaScript 是弱类型语言，所以会常常发生类型转换。

### 参考

ECMA-262.pdf    7.1 Type Conversion

### ToPrimitive(input, [, PreferredType])

`ToPrimitive`有`input`参数和可选参数`PreferredType`。它的作用是将`input`转换为非对象类型(non-Object type)。

`PreferredType`的作用是指出`input`期望转换成的类型。如果不传，`PreferedType`默认为`number`。

根据以下算法进行转换：

1. Assert：`input`要是ECMAScript 语言中的值
2. If  `Type(input)` is Object，then
   1. 根据`PreferredType`，`hint`可能是 **"default"**、**"string"**、**"number"**
   2. Let `exoticToPrim` be ?  `GetMethod(input, @@toPrimitive)`
   3. If `exoticToPrim` is not **"undefined"**, then
      1. Let `result` be ?  `Call(exoticToPrim, input, hint)`
      2. If  `Type(input)` is not Object，return `result`
      3. Throw a **TypeError** exception
   4. If `hint` is **"default"**,  set `hint` to **"number"**
   5. Return ? `OrdinaryToPrimitive(input, hint)`
3. Return `input`

**Note**: 对象可以通过定义 @@toPrimitive 方法来重写这些行为。对象中只有 **Date**和**Symbol**默认重写这些行为。

**Date**对象: If `hint` is **"default"**,  set `hint` to **"string"**

### OrdinaryToPrimitive(O, hint)

hint 为string时，顺序为 **toString**, **valueOf**

hint 为number时， 顺序为 **valueOf**, **toString**

如果都不对最后抛出 **TypeError**错误

示例：

```javascript
var o = {
  valueOf : () => {console.log("valueOf"); return {}},
  toString : () => {console.log("toString"); return {}}
}
o * 2

// valueof
// toString
// TypeError

var o = {
  valueOf : () => {console.log("valueOf"); return '3'},
  toString : () => {console.log("toString"); return {}}
}
o * 2

// valueof
// 6
```

实验：当调用 String(o), 结果又是怎样的？

在 ES6 之后，还允许对象通过显式指定 @@toPrimitive Symbol 来覆盖原有的行为。

```javascript
var o = {
 valueOf : () => {console.log("valueOf"); return {}},
 toString : () => {console.log("toString"); return {}}
}

o[Symbol.toPrimitive] = () => {console.log("toPrimitive"); return "hello"}

console.log(o + "")
// toPrimitive
// hello
```

#### Date

```javascript
var o = new Date();
o.valueOf = () => { console.log('valueOf'); return {}};
o.toString = () => { console.log('toString'); return {}};

o + ""
// toString
// valueOf
```

#### Symbol

```javascript
var symbol = Symbol('测试一下类型转换');
Number(symbol);

// VM6309:2 Uncaught TypeError: Cannot convert a Symbol valueto a number

主要原因因为：typeof Object(Symbol("a"))[Symbol.toPrimitive]() => 'symbol'
```

### ToBoolean(argument)

| 类型      | 结果                             |
| --------- | -------------------------------- |
| Undefined | alse                             |
| Null      | false                            |
| Boolean   | argument                         |
| Number    | +0/-0/NaN => false, 其他都为true |
| String    | "" => false, 其他都为true        |
| Symbol    | true                             |
| Object    | true                             |

### ToNumber(argument)

| 类型      | 结果                |
| --------- | ------------------- |
| Undefined | NaN                 |
| Null      | +0                  |
| Boolean   | true: 1   false: +0 |
| Number    | —                   |
| String    |                     |
| Symbol    | **TypeError**       |
| Object    |                     |

### ToString(argument)

| 类型      | 结果                         |
| --------- | ---------------------------- |
| Undefined | "undefined"                  |
| Null      | "null"                       |
| Boolean   | "true" or "false"            |
| Number    | **NumberToString(argument)** |
| String    | —                            |
| Symbol    | **TypeError**                |
| Object    |                              |

### ToObject(argument)

...

|         | Null      | Undefined   | Boolean(true) | Boolean(false) | Number          | String          | Symbol    | Object   |
| ------- | --------- | ----------- | ------------- | -------------- | --------------- | --------------- | --------- | -------- |
| Boolean | FALSE     | FALSE       | -             | -              | 0/NaN-false     | ""-false        | TRUE      | TRUE     |
| Number  | 0         | NaN         | 1             | 0              | -               | #StringToNumber | TypeError | 拆箱转换 |
| String  | "null"    | "undefined" | "true"        | "false"        | #NumberToString | -               | TypeError | 拆箱转换 |
| Object  | TypeError | TypeError   | 装箱转换      | 装箱转换       | 装箱转换        | 装箱转换        | 装箱转换  | -        |
