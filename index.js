import vsbl from 'vsbl'

export default function rola (attr = 'data-animate', opts = {}) {
  let cache = new Map()

  return function init () {
    cache.forEach((listener, node, map) => {
      !document.documentElement.contains(node) && cache.delete(node)
    })

    const nodes = document.querySelectorAll('[' + attr + ']')

    for (let i = nodes.length - 1; i > -1; i--) {
      if (cache.has(nodes[i])) continue

      cache.set(
        nodes[i],
        vsbl(nodes[i], { threshold: opts.threshold || 0 })(() => {
          nodes[i].classList.add('is-visible')
          !opts.reset && cache.delete(nodes[i])
        }, () => {
          opts.reset && nodes[i].classList.remove('is-visible')
        })
      )
    }

    return function stop () {
      cache.clear()
    }
  }
}
