const cache = []

let scroll
let resize
let vh

function inViewport (node, threshold = 0, y) {
  const bounds = node.getBoundingClientRect()
  const nodeTop = bounds.top + y
  const nodeBot = nodeTop + bounds.height
  const offset = threshold * vh
  return (nodeBot >= y - offset) && (nodeTop <= (y + vh) + offset)
}

function pop (arr, cb) {
  for (let i = arr.length - 1; i > -1; i--) {
    cb(arr[i], i)
  }
}

export default function rola (attr = 'data-animate', opts = {}) {
  function check () {
    pop(cache, (n, i) => {
      if (inViewport(n, opts.threshold, window.scrollY)) {
        n.classList.add('is-visible')
        cache.splice(i, 1)
      }
    })
  }

  return () => {
    if (!scroll) {
      scroll = window.addEventListener('scroll', e => {
        requestAnimationFrame(check)
      })
    }

    if (!resize) {
      resize = window.addEventListener('resize', e => {
        requestAnimationFrame(() => {
          vh = window.innerHeight
          check()
        })
      })
    }

    vh = window.innerHeight

    const nodes = document.querySelectorAll('[' + attr + ']')

    pop(cache, (n, i) => {
      !document.documentElement.contains(n) && (
        cache.splice(i, 1)
      )
    })

    pop(nodes, n => {
      cache.indexOf(n) < 0 && cache.push(n)
    })

    check()

    return check
  }
}
