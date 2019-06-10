import vsbl from 'vsbl'

export default function mela ({
  attribute = 'data-animate',
  reset = false,
  threshold = 0
}) {
  let cache = new Map()

  return function init () {
    cache.forEach((listener, node, map) => {
      !document.documentElement.contains(node) && cache.delete(node)
    })

    const nodes = document.querySelectorAll('[' + attribute + ']')

    for (let i = nodes.length - 1; i > -1; i--) {
      if (cache.has(nodes[i])) continue

      const res = reset || /reset/.test(nodes[i].getAttribute('data-animate'))

      const scroller = vsbl(nodes[i], { threshold: threshold || 0 })(() => {
        nodes[i].classList.add('is-visible')
        !res && cache.delete(nodes[i])
      }, () => {
        res && nodes[i].classList.remove('is-visible')
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
