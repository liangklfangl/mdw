### 1.dora-data-loader与markdown-data-loader
其中前者只是将文件树对象转化为require类型，如下:
```js
module.exports = {
  markdown: {
  'components': {
    'alert': {
      'demo': {
        'banner': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/banner.md'),
        'basic': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/basic.md'),
        'closable': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/closable.md'),
        'close-text': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/close-text.md'),
        'description': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/description.md'),
        'icon': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/icon.md'),
        'style': require('C:/Users/Administrator/Desktop/mdw/components/alert/demo/style.md'),
      },
      'index': require('C:/Users/Administrator/Desktop/mdw/components/alert/index.md'),
    },
  }
 }
}
```
而markdown-data-loader是真正的对markdown文件进行的处理的地方~~~