```
安装依赖
```
# npm install --production --ignore-scripts

```
dev运行  该运行需要依赖于 package.json devDependencies 
```
# npm install
# npm run dev

```
打包
```
# npm run build

```
打包后运行
```
# npm run start



```
基于  express + typescript + puppeteer（测试框架） 实现读取 .apsx 页面的数据抓取

本文仅供 参考学习

config 说明

chromRoute 需要依赖于chrom浏览器去爬虫数据，这里需要给出当前环境的chrom路径

port 当前服务对外开放接口设置
```
