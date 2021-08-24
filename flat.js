// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];

function flatDeep(arr, n) {
    return n > 0 ? arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flatDeep(cur, n-1) : cur), []) : arr.slice();
}

console.log(flatDeep(arr1, Infinity),'结果');
