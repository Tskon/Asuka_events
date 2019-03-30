import { withRouter } from 'next/router'
import StandartLink from 'next/link'
import React, { Children } from 'react'
import PropTypes from 'prop-types'

/**
 * Компонент принимает className и activeClassName (default 'active')
 * Возвращает ссылку с рабочим с  равнением пути
 */
const Link = ({ router, children, ...props }) => {
  const { href, activeClassName, className } = props
  let resultClassName = ''

  const child = Children.only(children)

  if (router.pathname === href) {
    resultClassName = className + activeClassName.trim()
  }

  return (
    <StandartLink href={href}>
      {React.cloneElement(child, { className: resultClassName })}
    </StandartLink>
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
