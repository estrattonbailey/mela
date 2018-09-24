# rola
Tiny scroll animation utility. **440 bytes gzipped.**

## Install
```
npm i rola --save
```

# Usage
Define animations in your markup:
```html
<h1 data-animate='slide-up fast ease delay'>Rolaaaaa</h1>
```

Use CSS attribute selectors to define transitions:
```css
[data-animate] {
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}

[data-animate*="fast"] {
  transition-duration: 200ms;
}

[data-animate*="ease"] {
  transition-timing-function: ease-in-out;
}

[data-animate*="delay"] {
  transition-delay: 200ms;
}

[data-animate*='slide-up'] {
  opacity: 0;
  transform: translateY(20px);
  transition-property: opacity, transform;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Set up JavaScript:
```javascript
import rola from 'rola'

// setup
const animations = rola()

// bind listeners, check position
animations()
```
To bind new elements or re-check positions, call it again:
```javascript
animations()
```
*Call this every time the DOM changes*, like page transitions and other
mutations. Any nodes no longer in the DOM will be removed from the listener
cache.

## API
### `rola(attribute, options)`
- `attribute` - string, default: `data-animate`
- `options` - object, default: `{}`
  - `options.threshold` - A fraction of the viewport height. Positive values
    increase scroll depth, negative values decrease it.

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
