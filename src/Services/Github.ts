export const getGithubUsername = async (userName: string) => {
  const userNameResponse = await fetch(`${process.env.GITHUB_USER}/${userName}`)
  if (!userNameResponse.ok) {
    throw new Error(`Github Username ${userName} was not found`)
  }
  const responseJson = await userNameResponse.json()
  return responseJson
}

export const getRepository = async (userName: string, repository: string) => {
  const repositoryResponse = await fetch(`${process.env.GITHUB_REPO}/${userName}/${repository}`)
  if (!repositoryResponse.ok) {
    throw new Error(`We are not able to find the repository ${repository} for ${userName}`)
  }
  const responseJson = await repositoryResponse.json()
  return responseJson
}

export const fetchUserRepo = (userName: string, repository: string) => {
  const userNameResult = getGithubUsername(userName)
  const repositoryResult = getRepository(userName, repository)

  return Promise.all([userNameResult, repositoryResult])
}

export const getTopContributions = async (userName: string, repoName: string) => {
  const contributionResponse = await fetch(
    `${process.env.GITHUB_REPO}/${userName}/${repoName}/contributors?q=contributions&order=desc`
  )
  if (!contributionResponse.ok) {
    throw new Error(`There is an issue finding contributors for the ${repoName} repository`)
  }
  const jsonContributorsResponse = await contributionResponse.json()
  return jsonContributorsResponse
}
