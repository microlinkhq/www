import React, { useState } from 'react'
import styled from 'styled-components'
import { initialOf } from 'helpers/dashboard-account'
import { theme } from 'theme'

export const AVATAR_SIZE = 32

const AVATAR_STYLES = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: `${AVATAR_SIZE}px`,
  height: `${AVATAR_SIZE}px`,
  borderRadius: '50%',
  bg: 'black05',
  color: 'black60'
}

const AvatarImage = styled.img`
  ${theme({ ...AVATAR_STYLES, objectFit: 'cover' })};
`

const AvatarInitial = styled.span`
  ${theme({
    ...AVATAR_STYLES,
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    lineHeight: 0
  })};
`

const AccountAvatar = ({ profile }) => {
  const [failed, setFailed] = useState(false)

  if (failed || profile.imageUrl === '') {
    return (
      <AvatarInitial aria-hidden='true'>{initialOf(profile)}</AvatarInitial>
    )
  }

  return (
    <AvatarImage
      src={profile.imageUrl}
      alt=''
      width={AVATAR_SIZE}
      height={AVATAR_SIZE}
      referrerPolicy='no-referrer'
      onError={() => setFailed(true)}
    />
  )
}

const ToolbarAccountAvatar = ({ profile }) => (
  <AccountAvatar
    key={`${profile.imageUrl}\0${profile.email}`}
    profile={profile}
  />
)

export default ToolbarAccountAvatar
