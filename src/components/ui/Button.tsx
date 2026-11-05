import type { ComponentPropsWithRef } from 'react'

import { buttonVariants, type ButtonVariantProps } from './button-variants'

export interface ButtonProps extends ComponentPropsWithRef<'button'>, ButtonVariantProps {}

export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonVariants({ variant, size, className })} {...props} />
}
