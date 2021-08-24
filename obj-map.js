// 实现对象的 Map 函数类似 Array.prototype.map 

// 实现一个 map 函数
const data = {
    a: 2,
    b: 3,
    c: 4,
    d: 5
  };
  const objMap = (obj, fn) => {
    if (typeof fn !== "function") {
      throw new TypeError(`${fn} is not a function !`);
    }
    return JSON.parse(JSON.stringify(obj, fn));
  };
  objMap(data, (key, value) => {
    if (value % 2 === 0) {
      return value / 2;
    }
    return value;
  });
  // {a: 1, b: 3, c: 2, d: 5}
  (() => {

    Object.prototype._map = function (fn, oThis = null) {
        if (typeof fn !== 'function') {
            throw new TypeError(`${fn} is not a function !`)
        }
        return JSON.parse(JSON.stringify(this, (key, val) => {
            if (key) {
                return fn.call(oThis, key, val, this)
            } else {
                return val
            }
        }))
    }
    // 用例
    let obj = {
        a: 2,
        b: 3,
        c: 4,
        d: 5
    };
    let _obj = obj._map((key, val, o) => {
        return ++val
    })
    console.log(_obj);
})();
// 这个实现有问题，首先JSON.stringify(obj, fn)中第一次传入fn中的参数为 ""和对象本身，从第二次开始才会传入key和val，所以应该加上条件处理。
