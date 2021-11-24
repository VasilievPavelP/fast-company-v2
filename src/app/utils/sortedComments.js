export function sortedComments(arr) {
  arr.sort((a, b) => b.created_at - a.created_at)
  return arr
}
