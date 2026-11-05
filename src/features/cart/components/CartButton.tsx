import { selectCartCount, useCartStore } from '../store/cart.store'

export function CartButton() {
  const count = useCartStore(selectCartCount)

  return (
    <button
      type="button"
      className="relative text-sm text-muted transition-colors hover:text-brand"
      aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
    >
      Cart
      {count > 0 && (
        <span className="absolute -top-2 -right-4 flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </button>
  )
}
