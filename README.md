# Data Binding

A minimal data-binding library.

## Install

```sh
$ npm install --save bind-store
```

## Usage

Say we are developing a stock ticker. We would want to update stock price values in real time.

In our markup we could call out the need to bind view elements to data with a data attribute.

```html
<li data-bind='stocks.google'></li>
<li data-bind='stocks.microsoft'></li>
<li data-bind='stocks.amazon'></li>
<li data-bind='stocks.facebook'></li>
```

Values are namespaced, the portion before the `.`. The name space is the store name.

For example:

```js
import { createStore } from 'bind-store'

const stocks = createStore('stocks')
```

The key name is then the portion after the `.`.

```js
stocks.set('google', 1000)
stocks.set('microsoft', 101)
stocks.set('amazon', 1700)
stocks.set('facebook', 178)
```

The values would then appear as the inner text of the corresponding HTML elements. There can be multiple elements on the page bound to the same key.

The store object also allows us to retrieve values once they are set.

```js
const value = stocks.get('google')
```