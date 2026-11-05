import { cn } from '@/lib/cn'

/**
 * Content photo in a rounded, shadowed frame with a subtle hover zoom.
 * Size the frame with `className` (e.g. an aspect ratio); the image covers it.
 */
export function Photo({
  src,
  alt,
  width,
  height,
  className,
  position,
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  /** CSS object-position, to keep the subject in frame when cropped. */
  position?: string
}) {
  return (
    <div className={cn('group/photo overflow-hidden rounded-lg shadow-xl', className)}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: position }}
        className="size-full object-cover transition-[scale] duration-700 ease-out group-hover/photo:scale-[1.03] motion-reduce:transition-none"
      />
    </div>
  )
}
