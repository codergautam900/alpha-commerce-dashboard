import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <>
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          title="Scroll to top (Home key)"
          className="fixed bottom-8 right-8 z-40 rounded-full bg-slate-900 p-3 text-white shadow-lg transition hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </>
  )
}

export default ScrollToTop
