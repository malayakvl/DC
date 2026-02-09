import { InertiaLinkProps, Link } from '@inertiajs/react';
import React from 'react';

interface Props extends InertiaLinkProps {
  active?: boolean;
}

export default function NavLink({
  active = false,
  className = '',
  children,
  ...props
}: Props) {
  return (
    <Link {...props} className={className}>
      {children}
    </Link>
  );
}
