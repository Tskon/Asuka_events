import { withRouter } from 'next/router'
import StandartLink from 'next/link'
import React, { Children } from 'react'
import PropTypes from 'prop-types'

/**
 * Компонент принимает className и activeClassName (default 'active')
 * Возвращает ссылку с рабочим с  равнением пути
 */
const Link = ({ router, children, ...props }) => {
  const { href } = props

  const child = Children.only(children)

  let className = (child.props.className) ? `${child.props.className} ` : ''
  if (router.pathname === href) {
    className += `${child.props.activeClassName}`.trim()
  }

  return <StandartLink {...props}>{React.cloneElement(child, { className })}</StandartLink>
}

Link.propTypes = {
  router: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Array).isRequired,
  activeClassName: PropTypes.string,
  href: PropTypes.string.isRequired,
}

Link.defaultProps = {
  activeClassName: 'active',
}

export default withRouter(Link)
