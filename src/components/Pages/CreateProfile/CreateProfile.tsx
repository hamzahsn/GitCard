import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { LabelInput, Button, ColorPicker, Typography, IconsPicker } from '@atoms/index'
import { Card } from '@organisms/index'

import styles from './CreateProfile.scss'

import { IGithubProfile } from '@typings/index'
import { cryptUrl } from '@utils/Crypt'
import { fetchUserRepo, setGithubProfile } from '@services/index'

const CreateProfile: React.FC = () => {
  const [gitProfile, setGitProfile] = React.useState<IGithubProfile>({
    username: '',
    repository: '',
    color: '',
    icon: ''
  })
  const [error, setError] = React.useState<any>('')
  const [magiclink, setMagicLink] = React.useState<any>()
  const { register, errors, handleSubmit } = useForm()

  const handleUserProfileInputs = (event: React.ChangeEvent<HTMLInputElement>, field: keyof IGithubProfile) => {
    setGitProfile({ ...gitProfile, [field]: event.target.value })
  }

  const handleSelectedIcon = (icon: any) => {
    setGitProfile({ ...gitProfile, icon: icon })
  }

  const handleSelectedColor = (color: string) => {
    setGitProfile({ ...gitProfile, color: color })
  }

  const handleSubmitUserProfile = async () => {
    const checkedGithubProfile = await fetchUserRepo(gitProfile.username, gitProfile.repository)
      .then(data => data)
      .catch(err => setError(err))

    if (checkedGithubProfile) {
      const crypted = cryptUrl(gitProfile.username, gitProfile.repository, gitProfile.color, gitProfile.icon)
      setGithubProfile(crypted)
        .then(data => {
          setMagicLink(data)
        })
        .catch(err => {
          setError(err)
        })
    }
  }

  return (
    <Card title="Github profile card">
      {error && (
        <p data-testid="error-message" className={styles.errorDetails}>
          {error.message}
        </p>
      )}
      <form onSubmit={handleSubmit(handleSubmitUserProfile)} className={styles.formContainer}>
        <LabelInput
          id="username"
          name="username"
          labelText="Username"
          type="text"
          data-testid="username"
          placeholder="Give me a user name"
          defaultValue={gitProfile.username}
          register={register({
            required: true,
            pattern: {
              value: /^([a-z\d]+-)*[a-z\d]+$/i,
              message: 'github user is not valid!'
            }
          })}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUserProfileInputs(event, 'username')}
          required
        />
        {errors.username && (
          <p data-testid="username-error" className={styles.error}>
            {errors.username.message}
          </p>
        )}
        <LabelInput
          id="repository"
          name="repository"
          labelText="Repository"
          type="text"
          placeholder="Give me a repo!"
          data-testid="repository"
          defaultValue={gitProfile.repository}
          register={register({
            required: true,
            pattern: {
              value: /^[a-z]+$/i,
              message: 'github user is not valid!'
            }
          })}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUserProfileInputs(event, 'repository')}
          required
        />
        {errors.repository && (
          <p data-testid="repo-error" className={styles.error}>
            {errors.repository.message}
          </p>
        )}
        <div data-testid="color-picker" className={styles.colorContainerSection}>
          <Typography variant="primary">Pick a color</Typography>
          <ColorPicker setSelectedColor={handleSelectedColor} />
        </div>
        <div data-testid="icon-picker" className={styles.iconPickerContainer}>
          <Typography variant="primary">Pick an icon</Typography>
          <IconsPicker setSelectedIcon={handleSelectedIcon} />
        </div>

        <div className={styles.formButtonContainer}>
          <Button
            disabled={!gitProfile.username || !gitProfile.repository || !gitProfile.color || !gitProfile.icon}
            type="reset"
            data-testid="reset-button"
            onClick={() => {
              setError('')
              setMagicLink('')
            }}
          >
            {magiclink ? 'Make another one?' : 'Reset'}
          </Button>
          <Button
            disabled={!gitProfile.username || !gitProfile.repository || !gitProfile.color || !gitProfile.icon}
            type="submit"
            data-testid="submit-button"
          >
            Submit
          </Button>
        </div>
      </form>
      {magiclink && !error && (
        <Link to={`/r/${magiclink.name}`} className={styles.linkContent} data-testid="magic-link">
          {window.location.href + 'r/' + magiclink.name}
        </Link>
      )}
    </Card>
  )
}

export default CreateProfile
