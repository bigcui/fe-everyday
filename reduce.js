// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
Object.defineProperty(Array.prototype,'reduce',{
    value: function(callback){
        if (this === null) {
            throw new TypeError('Array.protype.reduce',+ 'called on null or undefined');
        }
        if (typeof callback !== 'function') {
            throw new TypeError( callback + 'is note a function');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        var k = 0;
        var value;
        if (arguments.length >=2) {
            value = arguments;
        } else {
           while ( k < len && !(k in o)) {
               k++;
           }
           if (k >= len) {
               throw new TypeError( 'Reduce of empty array') + 'with no initial value';
           }
           value = o[k++];
        }
        while( k < len){
            if (k in o) {
                value = callback(value, o[k], k , o);
            }
            k++;
        }
        return value;
    },

});