export const type = thing => Object.prototype.toString.call(thing);

export const isNumber = thing => type(thing) === '[object Number]';

export const isString = thing => type(thing) === '[object String]';

export const isBoolean = thing => type(thing) === '[object Boolean]';

export const isUndefined = thing => type(thing) === '[object Undefined]';
