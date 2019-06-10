# mela
Tiny utility to trigger animations on scroll. **800 bytes gzipped.**

## Install
```
npm i mela --save
```

## Usage
`mela` works by applying an `is-visible` class to an element when it enters the
viewport.

### Config
It's configured using an attribute in your markup. For each element you wish to
animate, define `data-animate` and pass it the values you would like to use:
```html
<h1 data-animate='slide-up fast ease delay'>I will slide in!</h1>
```

### Styles
Use CSS attribute selectors to define those transition values:
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

### JavaScript
Create an instance:
```javascript
import mela from 'mela'

const animations = mela()
```

Then call that instance to bind elements and check position:
```javascript
animations()
```

When the DOM changes, like after a page load, you'll need to rebind. Simply call
the instance again:
```javascript
animations()
```

### Options
By default `mela` only animates in once. To repeat the animation each time the
element enters the viewport, pass `reset` to your `data-animate` attribute:
```html
<h1 data-animate='slide-up fast ease delay reset'>I will slide in every time!</h1>
```

`mela` users [vsbl](https://github.com/estrattonbailey/vsbl) internally, so to
adjust how soon/late the animation occurs, use `data-threshold`:
```html
<h1 data-animate='slide-up fast ease delay reset' data-threshold='0.25'>I will slide in every time!</h1>
```

If you want to apply a `threshold` value to all animations, or ensure all
animations reset, you can pass these options to the constructor:
```javascript
const animations = mela({
  threshold: 0.25,
  reset: true
})
```

Finally, if you'd rather use something other than data-animate:
```javascript
const animations = mela({
  attribute: 'data-anim'
})
```

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
