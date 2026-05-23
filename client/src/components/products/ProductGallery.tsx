import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

type ProductGalleryProps = {
  images: string[]
  title: string
}

function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const galleryImages = images.length > 0 ? images : ['']

  const activeImage = galleryImages[activeImageIndex] ?? galleryImages[0]
  const totalImages = galleryImages.length

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) =>
      currentIndex === 0 ? totalImages - 1 : currentIndex - 1,
    )
  }

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) =>
      currentIndex === totalImages - 1 ? 0 : currentIndex + 1,
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-[92px_1fr]">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-1">
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImageIndex(index)}
            className={`overflow-hidden rounded-2xl border transition ${
              index === activeImageIndex
                ? 'border-slate-900 ring-2 ring-slate-200 dark:border-sky-400 dark:ring-slate-700'
                : 'border-slate-200 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500'
            }`}
          >
            {image ? (
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className="aspect-square h-full w-full bg-slate-100 object-cover dark:bg-slate-800"
              />
            ) : (
              <div className="aspect-square bg-slate-100 dark:bg-slate-800" />
            )}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 dark:border-slate-700/80 dark:bg-slate-900/75">
        <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/85">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Gallery
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
              {activeImageIndex + 1} of {totalImages}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={showPreviousImage}
              className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Show previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showNextImage}
              className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Show next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {activeImage ? (
          <img
            src={activeImage}
            alt={title}
            className="h-full min-h-[320px] w-full object-cover"
          />
        ) : (
          <div className="flex min-h-[320px] items-center justify-center">
            <span className="text-sm text-slate-500 dark:text-slate-400">Image unavailable</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductGallery
