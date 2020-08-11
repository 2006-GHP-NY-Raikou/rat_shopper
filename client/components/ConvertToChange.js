export default function convertToChange(price, qty) {
  let toChange = price * qty / 100
  if ((price * qty) % 100 === 0) return toChange + '.00'
  else if (!toChange.toString().endsWith('0')) return toChange + '0'
}
