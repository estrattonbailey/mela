# mela
Tiny utility to trigger animations on scroll. **700 bytes gzipped.**

## Install
```
npm i mela --save
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
import mela from 'mela'

// setup
const animations = mela()

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
### `mela(attribute, options)`
- `attribute` - string, default: `data-animate`
- `options` - object, default: `{}`
  - `options.threshold` - Trigger animations sooner or later, see
    [vsbl](https://github.com/estrattonbailey/vsbl) docs for more options.
  - `options.reset` - Repeat transition every time element enters viewport.

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
