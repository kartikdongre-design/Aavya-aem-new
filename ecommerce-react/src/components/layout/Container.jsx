import { cn } from '../../utils/classNames.js';

export default function Container({ children, className = '', as: Component = 'div' }) {
  return (
    <Component className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </Component>
  );
}
