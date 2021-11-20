export function filterDefaultValueArray(defaultValue, optionsArray) {
  if (defaultValue) {
    const defaultQualiti = defaultValue.map(value => (
      optionsArray.find(option => (
        option.label === value.name
      ))
    ))
    const defaultIndex = defaultQualiti.map(qualiti => (
      optionsArray.indexOf(qualiti)
    ))

    return defaultIndex.map(index => (
      optionsArray[index]
    ))
  }
}
