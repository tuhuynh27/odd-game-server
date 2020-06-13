const useState = initialValue => {
  let _val = initialValue
  const state = () => _val
  const setState = newVal => (_val = newVal)

  return [state, setState]
}

module.exports = useState
