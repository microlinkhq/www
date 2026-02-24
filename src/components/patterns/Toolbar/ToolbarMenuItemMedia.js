import React from 'react'
import Image from 'components/elements/Image/Image'
import FeatherIcon from 'components/icons/Feather'

const ToolbarMenuItemMedia = ({
  label,
  logo,
  icon: Icon,
  size = '18px',
  iconClassName,
  iconCss,
  imageCss
}) =>
  logo
    ? (
      <Image
        src={logo}
        width={size}
        height={size}
        alt={label}
        css={imageCss}
      />
      )
    : (
      <FeatherIcon
        icon={Icon}
        size={size}
        className={iconClassName}
        css={iconCss}
      />
      )

export default ToolbarMenuItemMedia
