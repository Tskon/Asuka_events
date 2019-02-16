import { withRouter } from 'next/router';
import StandartLink from 'next/link';
import React, { Children } from 'react';

/**
 * Компонент принимает className и activeClassName (default 'active')
 * Возвращает ссылку с рабочим сравнением пути
 */
const Link = ({ router, children, ...props }) => {
  const child = Children.only(children)

  let className = (child.props.className) ? child.props.className + ' ' : ''
  if (router.pathname === props.href) {
    className += (child.props.activeClassName) ? `${child.props.activeClassName}`.trim() : 'active'
  }

  delete props.activeClassName

  return <StandartLink {...props}>{React.cloneElement(child, { className })}</StandartLink>
};

export default withRouter(Link)