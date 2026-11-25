import React from 'react'
import LucideIcon from 'components/icons/Lucide'

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
      <LucideIcon
        icon={Icon}
        size={size}
        className={iconClassName}
        css={iconCss}
      />
      )

export default ToolbarMenuItemMedia
