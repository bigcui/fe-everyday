// the map () method creates a new array populated with the results of calling a 
// provided function on every  element in the calling array;

/**
 * 1. 新数组
 * 2. callback 接收的三个参数
 * 
 */
if (!Array.prototype.map) {
}
Array.prototype.map2 = function (callback) {
    let arr = this;
    let arrs = [];
    if (!callback) {
        throw 'callback no exit';
    }
    for (let i = 0; arr.length; i++) {
        let item = arr[i];
        arrs.push(item);
        callback.call(this, i, arr[i], arr);
    }
    return arrs;
};

let str = [1, 2, 3, 4];
str.map2((index,item, thisAr)=>{
    console.log(index, item, thisAr);
});