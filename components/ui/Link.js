import { withRouter } from 'next/router';
import Link from 'next/link';
import React, { Children } from 'react';

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)

  let className = (child.props.className) ? child.props.className + ' ' : ''
  if (router.pathname === props.href) {
    console.log(child.props.activeClassName)
    className += (child.props.activeClassName) ? `${child.props.activeClassName}`.trim() : 'active'
  }

  delete props.activeClassName

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
};

export default withRouter(ActiveLink)