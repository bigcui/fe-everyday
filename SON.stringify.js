/**
 *
 *
 *
 *
 *
 https://github.com/NieZhuZhu/Blog/issues/1
1 const data = {
  a: "aaa",
  b: undefined,
  c: Symbol("dd"),
  fn: function() {
    return true;
  }
};
JSON.stringify(data); // 输出：？

2 假设 undefined、任意的函数以及 symbol 值作为数组元素会是怎样呢
undefined、任意的函数以及 symbol 作为数组元素值时，JSON.stringify() 将会将它们序列化为 null
3 
JSON.stringify(function a (){console.log('a')})
// undefined
JSON.stringify(undefined)
// undefined
JSON.stringify(Symbol('dd'))
// undefined

// "{"a":"aaa"}"
undefined、任意的函数以及 symbol 作为对象属性值时 JSON.stringify() 跳过（忽略）对它们进行序列化
 */

/*

JSON.stringify() 第一大特性总结
undefined、任意的函数以及 symbol 作为对象属性值时 JSON.stringify() 对跳过（忽略）它们进行序列化

undefined、任意的函数以及 symbol 作为数组元素值时，JSON.stringify() 将会将它们序列化为 null

undefined、任意的函数以及 symbol 被 JSON.stringify() 作为单独的值进行序列化时，都会返回 undefined

JSON.stringify() 第二大特性
非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
const data = {
  a: "aaa",
  b: undefined,
  c: Symbol("dd"),
  fn: function() {
    return true;
  },
  d: "ddd"
};
JSON.stringify(data); // 输出：？
// "{"a":"aaa","d":"ddd"}"

JSON.stringify(["aaa", undefined, function aa() {
    return true
  }, Symbol('dd'),"eee"])  // 输出：？

// "["aaa",null,null,null,"eee"]"

JSON.stringify() 第三大特性
转换值如果有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。
JSON.stringify({
    say: "hello JSON.stringify",
    toJSON: function() {
      return "today i learn";
    }
  })
// "today i learn"
JSON.stringify({
    say: "hello JSON.stringify",
    toJSON: function() {
      return "today i learn";
    }
  })
// "today i learn"

JSON.stringify() 第四大特性
JSON.stringify() 将会正常序列化 Date 的值。
JSON.stringify({ now: new Date() });
// "{"now":"2019-12-08T07:42:11.973Z"}"
实际上 Date 对象自己部署了 toJSON() 方法（同Date.toISOString()），因此 Date 对象会被当做字符串处理。
JSON.stringify() 第五大特性
NaN 和 Infinity 格式的数值及 null 都会被当做 null
JSON.stringify() 第六大特性
关于基本类型的序列化：

布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
JSON.stringify([new Number(1), new String("false"), new Boolean(false)]);
// "[1,"false",false]"

JSON.stringify() 第七大特性
其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性
// 不可枚举的属性默认会被忽略：
JSON.stringify( 
    Object.create(
        null, 
        { 
            x: { value: 'json', enumerable: false }, 
            y: { value: 'stringify', enumerable: true } 
        }
    )
);
// "{"y","stringify"}"
JSON.stringify() 第八大特性
我们都知道实现深拷贝最简单粗暴的方式就是序列化：JSON.parse(JSON.stringify())，这个方式实现深拷贝会因为序列化的诸多特性导致诸多的坑点：比如现在我们要说的循环引用问题
// 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。 
const obj = {
  name: "loopObj"
};
const loopObj = {
  obj
};
// 对象之间形成循环引用，形成闭环
obj.loopObj = loopObj;
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
deepClone(obj)
/**
 VM44:9 Uncaught TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    |     property 'loopObj' -> object with constructor 'Object'
    --- property 'obj' closes the circle
    at JSON.stringify (<anonymous>)
    at deepClone (<anonymous>:9:26)
    at <anonymous>:11:13
 */



**/
