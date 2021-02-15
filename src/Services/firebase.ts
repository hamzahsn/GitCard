export const setGithubProfile = async (profile: any) => {
  const response = await fetch(`${process.env.MAGIC_LINK}/githublink.json`, {
    method: 'post',
    body: JSON.stringify(profile)
  })
  const jsonResponse = await response.json()
  return jsonResponse
}

export const getGithubProfile = async (magicLink?: string) => {
  const response = await fetch(`${process.env.MAGIC_LINK}/githublink/${magicLink}.json`, {
    method: 'get'
  })
  const jsonData = response.json()
  return jsonData
}
