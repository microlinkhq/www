import React from 'react'
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
      <img src={logo} width={size} height={size} alt={label} style={imageCss} />
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
