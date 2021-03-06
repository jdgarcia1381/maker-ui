import React from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'
import MenuItem from './MenuItem'

const Menu = React.memo(({ menuItems = [], pathname }) => {
  const { header } = useOptions()

  return (
    <Box
      as="nav"
      className="nav-primary"
      sx={{ display: setBreakpoint(header.breakIndex, ['none', 'flex']) }}>
      <Box as="ul" variant="header.menu" className="menu-primary">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            caret={header.dropdown.caret}
            pathname={pathname}
            isHeader
          />
        ))}
      </Box>
    </Box>
  )
})

export default Menu
