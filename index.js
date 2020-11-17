import vsbl from 'vsbl'

export default function mela ({
  attribute = 'data-animate',
  reset = false,
  threshold = 0
} = {}) {
  let cache = new Map()

  return function init ({ name } = {}) {
    cache.forEach((scroller, node) => {
      if (!document.documentElement.contains(node)) {
        cache.delete(node)
        scroller.destroy()
      }
    })

    const nodes = document.querySelectorAll('[' + attribute + ']')

    for (let i = nodes.length - 1; i > -1; i--) {
      if (cache.has(nodes[i])) continue

      const attr = nodes[i].getAttribute(attribute)
      const res = reset || /reset/.test(attr)

      console.log(attr, res)

      if (name !== undefined && !attr.includes(name)) continue

      const scroller = vsbl(nodes[i], { threshold: threshold || 0 })(() => {
        nodes[i].classList.add('is-visible')
        if (!res) {
          scroller.destroy()
          cache.delete(nodes[i])
        }
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
