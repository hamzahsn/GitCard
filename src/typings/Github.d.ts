export interface IGithubProfile {
  username: string
  repository: string
  color: string
  icon: string
}

export interface IContributor {
  avatar_url?: string
  contributions?: 135
  events_url?: string
  followers_url?: string
  following_url?: string
  gists_url?: string
  gravatar_id?: string
  html_url?: string
  id?: number
  login?: string
  node_id?: string
  organizations_url?: string
  received_events_url?: string
  repos_url?: string
  site_admin?: boolean
  starred_url?: string
  subscriptions_url?: string
  type?: string
  url?: string
}
