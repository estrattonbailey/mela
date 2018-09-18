# rola
Tiny scroll animation utility. **500 bytes gzipped.**

## Install
```
npm i rola --save
```

# Usage
```javascript
import rola from 'rola'

// setup
const animations = rola()

// init listeners, check position
animations()
```
To re-check position, call it again:
```javascript
animations()
```

## CSS
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

## API
### `rola(attribute, options)`
- `attribute` - string, default: `data-animate`
- `options` - object, default: `{}`
  - `options.threshold` - A fraction of the viewport height. Positive values
    makes image load sooner, negative values makes image load later.

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
