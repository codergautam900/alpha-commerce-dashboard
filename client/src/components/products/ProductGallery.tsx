import { useState } from 'react'

type ProductGalleryProps = {
  images: string[]
  title: string
}

function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const galleryImages = images.length > 0 ? images : ['']

  const activeImage = galleryImages[activeImageIndex] ?? galleryImages[0]

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
                ? 'border-slate-900 ring-2 ring-slate-200'
                : 'border-slate-200 hover:border-slate-400'
            }`}
          >
            {image ? (
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className="aspect-square h-full w-full bg-slate-100 object-cover"
              />
            ) : (
              <div className="aspect-square bg-slate-100" />
            )}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        {activeImage ? (
          <img
            src={activeImage}
            alt={title}
            className="h-full min-h-[320px] w-full object-cover"
          />
        ) : (
          <div className="flex min-h-[320px] items-center justify-center">
            <span className="text-sm text-slate-500">Image unavailable</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductGallery
