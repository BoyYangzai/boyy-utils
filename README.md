# boyy-utils

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

some useful or interesting utils for me

### Installation
```bash
npm install boyy-utils
```
or
```bash
yarn add boyy-utils
```
### Usage
```ts
import { useClickOutsidePlus, useSingleClickOutside } from 'boyy-utils';
```
### API
#### useSingleClickOutside ⚡️
A custom React hook that allows you to detect a `single` click outside a specified element.

##### Advantages

- **Simplicity**: The `useSingleClickOutside` Hook has concise code and requires only a ref and a callback function to be passed.
- **Event handling**: This Hook focuses on handling single click events and triggers the callback function when the click occurs outside the specified DOM element.
- **Flexibility**: Custom event names and listener options can be provided to meet specific requirements.

###### Usage
```ts
import { useRef } from 'react';
import { useSingleClickOutside } from 'boyy-utils';

const App = () => {
  const handleClickOutside = (event: KeyboardEvent) => {
    // Handle single click outside logic
  };

  const ref = useRef<HTMLDivElement>(null);
  useSingleClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref}>
      {/* Your component content */}
    </div>
  );
};

export default App;
```

#### useClickOutsidePlus 💪
A custom React hook that allows you to detect clicks outside `multiple specified elements`. 
It also supports `custom events` for detecting clicks outside the elements.

###### Advantages

- **Multiple elements support**: You can specify multiple elements to monitor for click events by passing an array of refs to the refCurrents prop.
- **Event customization**: The hook allows you to customize the events to listen for by providing an array of event strings to the events prop. The default event is "click".
- **Efficient event handling**: The hook efficiently handles click events outside the specified elements by utilizing addEventListener and removeEventListener methods.
- **Automatic cleanup**: When the component unmounts, the hook automatically removes the event listeners, ensuring proper cleanup and preventing memory leaks.

######  Usage
```ts
import { useRef } from 'react';
import useClickOutsidePlus from 'boyy-utils';

const MyComponent = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const handleClickOutside = () => {
    // Handle click outside logic
  };

  useClickOutsidePlus({
    refCurrents: [ref1, ref2],
    callback: handleClickOutside,
    events: ['click', 'mousedown'], 
    // Customize the events to listen for
  });

  return (
    <div>
      <div ref={ref1}>Element 1</div>
      <div ref={ref2}>Element 2</div>
    </div>
  );
};
```
### License
This project is licensed under the MIT License - see the LICENSE file for details.
