function camelizeStr (str) {
  return str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase())
}

function convertCase (convertFunc) {
  function converter (thing) {
    if (thing instanceof Array) {
      return thing.map(i => converter(i))
    }
    if (thing instanceof Object) {
      const newObj = {}
      Object.keys(thing).forEach(k => {
        newObj[convertFunc(k)] = converter(thing[k])
      })
      return newObj
    }
    return thing
  }
  return converter
}

function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  camelizeStr,
  camelizeKeys: convertCase(camelizeStr),
  delay
}
