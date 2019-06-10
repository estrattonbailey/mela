import vsbl from 'vsbl'

export default function mela (attr = 'data-animate', opts = {}) {
  let cache = new Map()

  return function init () {
    cache.forEach((listener, node, map) => {
      !document.documentElement.contains(node) && cache.delete(node)
    })

    const nodes = document.querySelectorAll('[' + attr + ']')

    for (let i = nodes.length - 1; i > -1; i--) {
      if (cache.has(nodes[i])) continue

      const reset = opts.reset || /reset/.test(nodes[i].getAttribute('data-animate'))

      const scroller = vsbl(nodes[i], { threshold: opts.threshold || 0 })(() => {
        nodes[i].classList.add('is-visible')
        !reset && cache.delete(nodes[i])
      }, () => {
        reset && nodes[i].classList.remove('is-visible')
      })

      scroller.update()

      cache.set(
        nodes[i],
        scroller
      )
    }

    return function stop () {
      cache.forEach(scroller => scroller.destroy())
      cache.clear()
    }
  }
}
