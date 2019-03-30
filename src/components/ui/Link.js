import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import React, { Children } from 'react'
import PropTypes from 'prop-types'

/**
 * Компонент принимает className и activeClassName (default 'active')
 * Возвращает ссылку с рабочим с  равнением пути
 */
const Link = ({ router, children, ...props }) => {
  const { href, activeClassName, className } = props
  const resultClassName = ''

  const child = Children.only(children)

  return (
    <NavLink to={href} className={className} activeClassName={activeClassName}>
      {React.cloneElement(child, { className: resultClassName })}
    </NavLink>
  )
}

Link.propTypes = {
  router: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.element.isRequired,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
}

Link.defaultProps = {
  activeClassName: 'active',
  className: '',
}

export default withRouter(Link)
