# Attrigen
Attrigen is a data attribute generator tool for quicker and easier location of elements in DOM, used in e2e testing.
It will generate `data-test-id` attribute on every DOM element it finds, so it will look like this:   
```html
<div id="test" data-test-id="d1">
    <p data-test-id="d1p1">One</p>
    <p data-test-id="d1p2">Two</p>
    <p data-test-id="d1p3">Three</p>
</div>
```   
For example, `d1p3` stands for `div-1`(parent id) `paragraph-3`(element id), which is elements type and position in the DOM. The longer the `data-test-id` is, the deeper is elements location in DOM.   
## Installation
```sh
npm install attrigen
```   
## Usage
> We will use Playwright project for example

```javascript
const attrigen = require('attrigen');
test('Example e2e test', async ({page}) => {
    // ...
    await page.addInitScript(attrigen);
    // ...
})
```
Now you can search for the elements in DOM using simple css selector `[data-test-id^=d1p]`:   
```javascript
this.pageElement = page.locator('[data-test-id^=d1p]');
```