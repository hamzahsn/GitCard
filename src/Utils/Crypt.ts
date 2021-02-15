export const cryptUrl = (userName: string, repository: string, color: string, icon: string) => {
  return window.btoa(`username=${userName}&repository=${repository}&color=${color}&icon=${icon}`)
}

export const decryptUrl = (hashedUrl: string) => {
  return window.atob(hashedUrl)
}
