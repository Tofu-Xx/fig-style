## 使用方式

### 包管理安装

```bash
npm i fig-style
yarn add fig-style
pnpm i fig-style
```
### CDN引入
```html
<script src="https://unpkg.com/fig-style/dist/main.umd.js"></script>
```

## fig 样式写法

### 原子样式

#### 一般写法

_fig 写法:_

```html
<div width:100px></div>
```

> 原子样式一般写法与 css 语句写法基本一致.

_css 写法:_

```css
width: 100px;
```

> 如果你愿意的话,原子样式也可以在末尾加分号

```html
<div width:100px;></div>
```

- 本质上这整体是一个 html 标签的属性名,所以**千万不要加空格哦**
- 冒号前部分映射 css 属性,我们称之为**fig 属性**
- 冒号后部分映射 css 属性值,我们称之为**fig 属性值**

##### 映射 css 函数

> 正常写法,没有特殊要注意的

```html
<div color:rbg(255,0,0)></div>
```

##### 映射 css 复合属性值

```html
<div padding:10_5_20_15></div>
```

- 注意一个 html 属性不可有空格

> 因为不可有空格,所以 fig 复合属性是用下划线分隔的\
> 而 css 的复合属性是用空格分隔的

##### 关于 px 单位的省略

**px 单位通常可以省略但是也有个别例外**\
CSS
中的某些属性可以直接应用数值，而不需要指定单位，这是因为这些属性具有默认的单位。例如，当你设置宽度（width）、边距（margin）、填充（padding）等属性时，如果你没有指定单位，CSS
会默认使用像素（px）作为单位。\
然而，并不是所有的 CSS
属性都可以省略单位。例如，当你设置字体大小（font-size）时，如果你没有指定单位，它可能不会按照你期望的方式工作，因为
font-size 的默认单位不是像素，而是依赖于父元素的字体大小。

> 所以这是一个原生 css 的知识,fig 并没有做特殊处理

```html
<div width:100></div>
```

#### 属性映射

```js
w: "width",
h: "height",
p: "padding",
m: "margin",
ml: "margin-left",
mt: "margin-top",
mr: "margin-right",
mb: "margin-bottom",
pl: "padding-left",
pt: "padding-top",
pr: "padding-right",
pb: "padding-bottom",
t: "top",
b: "bottom",
l: "left",
r: "right",
w: "width",
h: "height",
p: "padding",
m: "margin",
ml: "margin-left",
mt: "margin-top",
mr: "margin-right",
mb: "margin-bottom",
pl: "padding-left",
pt: "padding-top",
pr: "padding-right",
pb: "padding-bottom",
t: "top",
b: "bottom",
l: "left",
r: "right",
pos: "position",
bor: "border",
bgc: "background-color",
borr: "border-radius",
fs:"font-size",
```

> 以上是部分内置的属性映射,所以上面一般写法的例子也可以这样写\
> 映射的对象属性必须是小写哦,这是 html 属性特性导致的\
> 但是你可以用字符串属性的方式设置特殊标识

```html
<div w:100></div>
```

> 也可以自定义属性映射,如下

```html
<div c:red>!!!</div>

<script>
  setAttrMap({
    c: "color",
  });
</script>
```

> **setAttrMap**是暴露在全局的函数\
> 接收一个对象\
> 用于配置**fig 属性**和**css 属性**的映射关系

#### 属性值映射

> 同上,但属性值没有内置的映射,不过你可以发挥你的想象自行设置,比如

```html
<div display:\>看不到我</div>

<script>
  setValMap({
    "\\": "none",
  });
</script>
```

> **setValMap**是暴露在全局的函数\
> 接收一个对象\
> 用于配置**fig 属性值**和**css 属性值**的映射关系

> '\\\\' 第一个反斜杠是用于转义\
> 所以原子样式中写一个反斜杠代表 none 属性值\
> 斜杠才是自闭和标签哦,这里用反斜杠没关系的

#### 简写形式

> 当 fig 属性值以数字开头时,我们可以把冒号省略\
> 所以这个例子最简单的写法如下

```html
<div w100></div>
```

#### !important

- 标签选择器< 原子样式的优先级 < 属性选择器
  > 可见原子样式的优先级不高\
  > 所以你可以用类样式轻松覆盖\
  > 但如果不希望原子样式被覆盖的话,你可以这样做
  ```html
  <div bgc:red!>lorem</div>
  ```
  > 也就是在 fig 属性后加一个感叹号 **这样最后千万不可以加分号**\
  > 当然也可以写全称 !important **全称最后可以加分号** _如果你真的喜欢这样的话_
  ```html
  <div bgc:red!important;>lorem</div>
  ```

### fig 函数

#### 空参

> fig 函数的声明其实就是写一个 css 类样式\
> 只是在使用类样式的标签上不用写类名\
> 而是类似函数调用的写法

```html
<style>
  .fig-center {
    display: grid;
    place-content: center;
  }
</style>

<div center()>lorem</div>
```

> 自己声明 fig 函数时记得加 **fig-** 类名前缀,为了避免与普通的类名冲突\
> 当然,你也可以用 传统的 class 形式

```html
<div class="fig-center">lorem</div>
```

> 但是 fig 函数的写法是可以传参的哦

#### 默认传参

```html
<style>
  .fig-wh {
    --wh1: 100%;
    --wh2: transparent;
    width: var(--wh1);
    height: var(--wh1);
    background-color: var(--wh2);
  }
</style>

<div wh()></div>
<div wh(100)></div>
<div wh(100|rgb(225,0,0))></div>
```

> 类的命名法是 fig- + **fig函数名** 类中写上 css 变量,**css 变量名必须是
> fig函数名 + 数字** 数字代表着传参位置,从 1 开始\
> 参数根据位置直接传 fig 属性值就可以\
> fig 函数中参数中用**管道符|分隔**\
> 如果逗号的话,第三个 div中的fig函数不就相当于穿了四个参了嘛

#### 指定传参

```html
<style>
 .fig-box {
    --width: 100px;
    --height: 100px;
    --p: 0;
    --c: transparent;
    padding: var(--p);
    width: var(--width);
    height: var(--height);
    background-color: var(--c);
  }
</style>

<div box()>1</div>
<div box(width20)>2</div>
<div box(c:rgb(225,0,0)|height20)>3</div>
<div box(p5_10_20)>4</div>
```

> 这里 fig 函数的参数写法类似于原子样式\
> 不过 fig 属性的位置对应的 **css 变量**,这样就可以选择性传参了\
> 不过传入的是 fig 属性值,也就是说,也可以做属性值映射的

#### 内置函数

```css
.fig-center {
  display: grid;
  place-content: center;
}
.fig-wh {
  --fig1: 100%;
  --fig2: transparent;
  width: var(--fig1);
  height: var(--fig1);
  background-color: var(--fig2);
}
.fig-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.fig-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.fig-pseudoEl {
  --a: "";
  --b: "";
  &::before,
  &::after {
    display: block;
  }
  &::after {
    content: var(--a);
  }
  &::before {
    content: var(--b);
  }
}
```

#### fig 函数优先级

> fig 函数仍然可以被类样式轻松覆盖\
> 由于 fig 函数本质是类样式,所以**fig 函数比原子样式优先级高**

### 行内选择器(fig 选择器)

- 原子化的弊端就是当有相同样式的时候需要写相同的原子样式
- fig 选择器就是来解决这个问题的

#### 选择器

##### 概述

> css 选择器能做的,fig 选择器基本都可以\
> 由于 fig 选择器是以 html 属性的形式书写的\
> 所以它在一个固定的标签上\
> 所以它一定是一个联合选择器\
> fig 选择器以所在的标签为参考系,这是他的魅力所在...\
> 嗯么,那么..

```html
<div +.box{}>lorem</div>
```

> 例如上面这个例子就类似于下面这个 css 选择器

```css
div + .box {
}
```

> 但如果你看一下控制台,就会看到实际解析出的选择器长的十分复杂且怪异

- **css 选择器**会选择所有 div,而**fig 选择器**是以所在的标签为起点
- 或许应该这样表示

```css
所在标签 + .box {
}
```

- fig 选择器也支持伪类和伪元素选择器,后面例子中会提到

##### 子级选择器

- 由于 css 的子级选择器的连接符是>,所以如果写在 html 属性中的话

```html
<div>test > lorem</div>
```

> 看出问题了吗\
> 所以 fig 选择器的子级分隔符做了修改,改为了反斜杠

```html
<div \.box{w100%}>...</div>
```

> 等于

```css
所在标签 > .box {
  width: 100%;
}
```

##### 后代选择器

- 后代选择器与子级选择器有同样的问题,css 的后代选择器分隔符是空格,在 html
  属性中无法使用
  > 所以 fig 选择器的后代分隔符做了修改,改为了两个反斜杠\
  > _挺合理的吧 哈哈哈_

```html
<div \\span{color:#6af}>...</div>
```

##### 其他选择器

> 其他的与 css 一样,下面举一些栗子

```html
<div  ::after{content:"你好呀"}
      \:nth-child(2){bgc:#fab}
      \#foo,\.bar,\\span{fs2em}
> ... </div>
```

> 哈哈哈,还习惯嘛,别忘了这是 div 标签中有三个 html 属性哦

- 第三个是并集选择器,每个都是相对于所在标签的
- 也可以写交集,对于自身的交集,比如

```html
<div .active{bgc:red}></div>
```

> 当自身有 active 类时,背景色变红

#### 选中后设置样式

> 直接在大括号中写就好,用分号作分隔\
> 原子样式或者 fig 函数都可以

```html
<div +.box{bgc:rgb(225,0,0);h100;center()}>lorem</div>
```

- 虽然整体很长,但本质还是一个 html 属性,所以不能有空格,否则会视为多个 html 属性
- 注意 rgb 是 css 函数,center 是 fig 函数,都是可以使用的,css 函数可以看做是 css
  属性值的一部分

### 注释

> 单独把一个 html 属性注释掉,原生是做不到的\
> 不过如果你想注释掉 fig 样式的效果你可以在它们最前面加一个**井号**

_注释前:_

```html
<ul
  flex1
  \li{wh(50|#fab);center();bor:1px_#000_solid}
  innerRow()
  main:center
  cross:center>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```

_全部注释后:_

```html
<ul
  #flex1
  #\li{wh(50|#fab);center();bor:1px_#000_solid}
  #innerRow()
  #main:center
  #cross:center>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```

## class 写法

- 以上所有 html 属性名的写法都可以写类名形式
  > 这是为了解决渲染真实 dom 节点时 html 属性名无法使用特殊字符的问题

## fig 标签

> 弹性盒可以解决百分之八十的布局\
> 而弹性盒无非就是横着布局或竖着布局\
> 所以...

### 行标签 <f-row\></f-row\>

```
<div wh(100) \f-row{h100%}>
  <f-row></f-row>
  <f-row></f-row>
  <f-row></f-row>
</div>
```

> div 中有三行\
> f-row 会使父盒子纵向弹性布局

### 列标签 <f-col\></f-col\>

```
<div wh(100) \f-col{w100%}>
  <f-col></f-col>
  <f-col></f-col>
  <f-col></f-col>
</div>
```

> div 中有三列\
> f-col 会使父盒子横向弹性布局

### 标签注意事项

> 行标签和列标签是可以嵌套使用的\
> 行标签和列标签做兄弟节点时,列标签是不起效的\
> 当然你可以选择不用这两个标签\
> 用内置 fig 函数 row()和 col()一样方便
