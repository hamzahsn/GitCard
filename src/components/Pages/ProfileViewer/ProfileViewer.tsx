import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as queryString from 'query-string'
import GitHubButton from 'react-github-btn'

import styles from './ProfileViewer.scss'
import { getGithubProfile } from '@services/index'

import { Typography } from '@atoms/index'
import { Card } from '@organisms/index'

import { decryptUrl, convertIconName } from '@utils/index'
import { getRepository, getTopContributions } from '@services/index'

import { IGithubProfile, IContributor } from '@typings/index'

const ProfileViewer: React.FC<RouteComponentProps> = ({ location }) => {
  const [userCard, setUserCard] = useState<IGithubProfile>({
    username: '',
    repository: '',
    color: '',
    icon: ''
  })
  const [repo, setRepo] = useState<any>()
  const [contributors, setContributors] = useState<IContributor[]>([])
  const [error, setError] = useState('')

  const handleUserSecretLink = (magicLink: string) => {
    return getGithubProfile(magicLink)
      .then(data => {
        const decoded = decryptUrl(data)
        const { username, repository, color, icon } = queryString.parse(decoded)
        //@ts-ignore
        const iconName = convertIconName(icon)
        //@ts-ignore
        setUserCard({ username, repository, color, icon: iconName })
      })
      .catch(error => setError(error))
  }

  React.useEffect(() => {
    const mySecretLink = location.pathname.split('/').pop()
    if (!mySecretLink) {
      return
    }
    handleUserSecretLink(mySecretLink)
  }, [])

  React.useEffect(() => {
    if (userCard.username && userCard.repository && userCard.color && userCard.icon) {
      Promise.all([
        getRepository(userCard.username, userCard.repository),
        getTopContributions(userCard.username, userCard.repository)
      ]).then(repositoryInformation => {
        setRepo(repositoryInformation[0])
        setContributors(repositoryInformation[1].slice(0, 10))
      })
    }
  }, [userCard])

  return (
    <>
      {error && <p>{error}</p>}
      {repo && (
        <Card
          variant="secondary"
          title={repo?.name}
          style={{ background: `${userCard.color}` }}
          className={styles.magicCardContainer}
        >
          <i className={`fab ${userCard.icon} fa-5x`}></i>
          <section data-testid="owner" className={styles.ownerSection}>
            <Typography className={styles.contentTitles} variant="secondary">
              Made with ❤️ by:
            </Typography>
            <Typography variant="secondary">{repo?.owner?.login}</Typography>
          </section>
          <section data-testid="description" className={styles.descriptionSection}>
            <Typography className={styles.contentTitles} variant="secondary">
              Quick brief:
            </Typography>
            {repo?.description ? (
              <Typography variant="secondary"> {repo?.description}</Typography>
            ) : (
              'Author is actually lazy to make some description :D'
            )}
          </section>
          <section data-testid="github-stars" className={styles.starSection}>
            <Typography className={styles.contentTitles} variant="secondary">
              Stars: {repo?.stargazers_count}
            </Typography>
            <GitHubButton
              href={`https://github.com/${repo?.owner?.login}/${repo?.name}`}
              data-color-scheme="no-preference: light; light: light; dark: light;"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label={`Star ${repo?.owner?.login}/${repo?.name} on GitHub`}
            >
              Star
            </GitHubButton>
          </section>
          <section data-testid="contributors" className={styles.contributorsSection}>
            <Typography className={styles.contentTitles} variant="secondary">
              Top contributors:
            </Typography>
            <div>
              {contributors.map((contributor, index) => (
                <Typography variant="secondary" key={index}>
                  {contributor.login}
                </Typography>
              ))}
            </div>
          </section>
        </Card>
      )}
    </>
  )
}

export default ProfileViewer
