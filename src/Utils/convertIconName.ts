export const convertIconName = (iconName: string) => {
  iconName = iconName.replace(/[A-Z][a-z]*/g, str => '-' + str.toLowerCase()).replace(/(^-)|(-$)/g, '')
  return iconName
}
