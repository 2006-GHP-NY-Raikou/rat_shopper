export default function convertToChange(total) {
  let toChange = total / 100
  if (total % 100 === 0) return toChange + '.00'
  else if (!toChange.toString().endsWith('0')) return toChange + '0'
}
