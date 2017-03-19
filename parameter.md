### 1.如果pick指定

如果pick指定了，那么就会使用所有的plugin的`node`模块对文件树对象进行处理，进一步得到jsonml，同时把每次的jsonml传入到pick的value对相应的函数中，如果该函数返回了值，那么按照如下方式处理i:

```js
    const picker = config.pick[key];
    const pickedData = picker(parsedMarkdown);
    //If pick is configured, we will process markdown tree object with all `node` part to generate
    //jsonml, then we put jsonml to every function of pick object. If something returned, we will 
    //push it to picked object, then return!
    if (pickedData) {
      picked[key].push(pickedData);
    }
```
