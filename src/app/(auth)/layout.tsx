import React, { PropsWithChildren } from 'react'

const Layout = (props : PropsWithChildren) => {
  return (
    <div>
        {props.children}
    </div>
  )
}

export default Layout;