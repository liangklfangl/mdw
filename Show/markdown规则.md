### 1.关于markdown的meta头部信息

```js
---
category: Components
type: Compatiable
title: Select
subtitle: 搜索框
---
```
其中*category*指定是否是组件，可以是*Components*或者不填。type表示在该category属于哪一种类型，比如我们将后台兼容的组件category设置为"Compatiable",title表示组件标题，而subtitle表示子标题。注意上面的markdown头部必须符合[yaml格式](http://baike.baidu.com/link?url=SJfUHyvXYlH-8IcmlCcoVoPbzb-Jvk7Jzy8ZuallsHj3wSjM9gBIUOq-kk1PN4VojffZ5nGzydj0g028wtawvq)

### 2.关于组件说明的markdown格式

组件说明的markdown文件一般在组件文件夹下(不限定具体位置)。该文件包含上面说的meta头部信息和markdown内容信息。markdown的meta头部信息已经在上面说过了，这里不再细说。而关于markdown的内容来说，其所有标签全部采用*h2*开头。*API*字符串对应的*h2*标签以前会被解析为一部分，而*API*标签以后的部分会被解析为另外一部分。我们推荐，在*API*标签以后采用[markdown table](http://www.tablesgenerator.com/markdown_tables#)来描述组件每一个参数的具体信息。其中API以前的部分对应于页面下面的内容：

![](../image/des.png)

而API以后的部分对应于下面的内容:

![](../image/api.png)


### 2.关于组件demo的markdown格式
