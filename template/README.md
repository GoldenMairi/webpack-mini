# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 定制的功能
- 建议使用scss

  项目引入了bootstrap4，并且使用scss封装了一些公用样式

- [定制bootstrap](https://getbootstrap.com/docs/4.1/getting-started/theming/)

  在build/utils.js的`sass-resources-loader`中全局化了`bootstrap4`的`_functions.scss _variables.scss _mixins.scss`，以便于全局使用其中的内容。

  在frameworks\bootstrap文件中：

  `bootstrap.scss`按项目所需引入bootstrap4部分文件

  `_variables.scss`用于设置变量以覆盖bootstrap原_variables.scss文件以定制

  `_mixins.scss`封装**换肤**及**滚动条样式**等公用样式mixin

- vue-router，axios，vuex三者配合，架设了完善而强大的路由权限校验 请求封装 共享状态

  ##### 路由权限校验
  路由权限通过meta配置，自动在适当的情况跳转登陆页或登录后重定向,
  建议创建一个github的[SSH Key](https://github.com/settings/ssh/new)体验这些功能

  ##### 请求封装
  请求将简单如
  ```js
    async apiName => {
      // 请求已Promise化
      const data = await {{axiosAlias}}(apiName)
      console.log('请求数据：')
      console.log(data)
    }
  ```
  ##### 共享状态
  当前状态有 `userInf`用户登录信息，`loadNum`当前页loading的请求数，`crt`当前页路由
  并且封装了登录、退出的[vuex actions](https://vuex.vuejs.org/zh/guide/actions.html)
