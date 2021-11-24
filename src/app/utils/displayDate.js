export function displayDate(createAt) {
  const now = Date.now()
  const time = now - createAt
  if (time < 300000) {
    return '1 минуту назад'
  }
  if (time < 600000) {
    return '5 минут назад'
  }
  if (time < 1800000) {
    return '10 минут назад'
  }
  if (time < 3600000) {
    return '30 минут назад'
  }

  const startDate = new Date(createAt)
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]
  const day = startDate.getDate()
  const monthIndex = startDate.getMonth()
  const year = startDate.getFullYear()
  const hours = startDate.getHours()
  const minutes = startDate.getMinutes()
  if (time < 86400000) {
    return `${hours}:${minutes}`
  }
  if (time < 2629746000) {
    return `${day} ${monthNames[monthIndex]}`
  }

  return `${day} ${monthNames[monthIndex]} ${year} года`
}
