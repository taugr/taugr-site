---
title: 'Two tricks with the Chrome developer console'
description: 'How to easily copy values to the clipboard, and how to pretty print objects and collections.'
date: 2018-06-20
tags: ['javascript']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-06-20-two-chrome-dev-console-tricks/'
archivePath: '2018-06-20-two-chrome-dev-console-tricks'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-06-20-two-chrome-dev-console-tricks/](https://tomauger.gitlab.io/posts/2018-06-20-two-chrome-dev-console-tricks/).

How to easily copy values to the clipboard, and how to pretty print objects and collections.

## Copying to the clipboard with `copy`

Suppose you want to copy the value of a variable to the clipboard. Rather than printing it out and then manually selecting and copying it you can do:

```javascript
const a = 'Something to copy ...';
copy(a);

// Clipboard now has contents "Something to copy ..."
```

You can also copy objects, which will be stringified to JSON:

```javascript
const a = {
  fruit: 'banana',
  quantity: 10,
};
copy(a);

/*
 *  Clipboard now has contents:
 *  {
 *    "fruit": "banana",
 *    "quantity": 10
 *  }
 */
```

## Pretty print with `console.table`

Use `console.table` to pretty print lists or objects in the developer console. For example:

```javascript
console.table(['banana', 'apple', 'pear', 'plum']);
```

![console table array](/img/2018-06-20/console_table_array.jpg)

The rows can be sorted by clicking on the column headers.

You can also pretty print objects, for example:

```javascript
console.table({ fruit: 'banana', quantity: 12, price: 1.55 });
```

![console table object](/img/2018-06-20/console_table_object.jpg)

and an array of objects:

```javascript
const receipt = [
  { fruit: 'banana', quantity: 12, price: 1.55 },
  { fruit: 'apple', quantity: 5, price: 0.67 },
];
console.table(receipt);
```

![console table array objects](/img/2018-06-20/console_table_array_objects.jpg)

## References

- See the [MDN page](https://developer.mozilla.org/en-US/docs/Web/API/Console/table) for a full description of what you can do with `console.table`.
