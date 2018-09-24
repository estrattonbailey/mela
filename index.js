import srraf from 'srraf'

function pop (arr, cb) {
  for (let i = arr.length - 1; i > -1; i--) {
    cb(arr[i], i)
  }
}

export default function rola (attr = 'data-animate', opts = {}) {
  let cache = []

  return function init () {
    pop(cache, (n, i) => {
      !document.documentElement.contains(n) && cache.splice(i, 1)
    })

    pop(document.querySelectorAll('[' + attr + ']'), n => cache.indexOf(n) < 0 && cache.push(n))

    const listener = srraf(({ y, vh }) => {
      pop(cache, (n, i) => {
        const bounds = n.getBoundingClientRect()
        const nodeTop = bounds.top + y
        const nodeBot = nodeTop + bounds.height
        const offset = (opts.threshold || 0) * vh

        if ((nodeBot >= y - offset) && (nodeTop <= (y + vh) + offset)) {
          n.classList.add('is-visible')
          cache.splice(i, 1)
        }
      })
    })

    return function stop () {
      listener()
      cache = []
    }
  }
}
