<h1 align="center">⭐ Miryth</h1>

## ⭐ 开始吧！

1. Clone 本项目 `git clone https://github.com/hanbings/miryth.git`

2. 安装依赖 `npm install`

3. 编译 `npm run build`

4. 获得 `miryth.js` 并在 html 页面中创建 body 元素后导入它

## 😶‍🌫️ 配置！

1. 创建一个 html 文件，并编写合适的 meta 信息，以及引入 miryth.js 文件：

   ```html
   <!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
       <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
       <title>寒冰的猫窝</title>
   </head>
   
   <body></body>
   <script src="https://picture.hanbings.com/miryth.js"></script>
   
   </html>
   ```

   请注意！`<script src="./miryth.js"></script>` 必须在 `<body></body>` 声明之后声明，因为 miryth 默认会获取 dom 上的 body 元素作为整个站点的显示区域。

2. 通过全局对象赋值配置 miryth：

   在  `<body></body>` 后 `<script src="./miryth.js"></script>` 前再插入 `<script>` 并写入 `window.miryth` 对象

   ```
   <script>
       window.miryth = {
           footer: { moeIcp: "萌ICP备 20212512 号" }
       }
   </script>
   ```

   Miryth 页面的整体设计结构

   ![Miryth.jpeg](https://i.imgloc.com/2023/06/06/VlfICX.jpeg)

   具体可配置项如下：

   *为了方便标记配置项将在配置后方使用 // 注释，但 json 并不支持此注释方式，请复制后自行去除*

   *配置项如果留空将使用默认配置*

   **调试设置**

   开启调试模式将会在 Console 输出页面的 Route 以及 Config 信息

   ```
   setting: { debug: true }
   ```

   **页面头部**

   ```js
   header: {
       logo: "", // LOGO url 暂不支持
   	title: "寒冰的猫窝", // 博客的标题
   	nav: [ // 博客顶部显示的页面小标签
   		{ name: "首页", href: "/", icon: "home" }, // name 标签显示出来的文字
   		{ name: "文章", href: "/posts", icon: "article" }, // href 点击后跳转的 url
   		{ name: "关于", href: "/about", icon: "info" }, // 无论是 hash 模式还是 history 都应该在最前方加上 /
   		{ name: "友链", href: "/friends", icon: "link" } // icon 图标 暂不支持
   	]
   }
   ```

   **页面内容**

   ```js
   content: {
     "path": "/posts", // 文章页面的 url
     "posts": { // 文章页面的配置
       "posts": [ // 这里是文章的索引 文章显示的顺序将根据 create 时间排序
         {
           "path": "/posts/java-eventbus", // path 文章的 url 路径
           "source": "/posts/Java实现一个简单的EventBus.md", // source 文章的原始位置
           "title": "Java 实现一个简单的 EventBus", // title 文章标题
           "create": "2023-05-29 12:00:00", // create 文章创建时间 格式为 yyyy-mm-dd hh-mm-ss
           "icon": "fa fa-coffee" // icon 显示在标题前的图标 使用 https://fontawesome.dashgame.com/ FA 图标库
         },
         {
           "path": "/posts/what-is-the-totp",
           "source": "/posts/为-Linux-服务器-SSH-添加-TOTP-动态验证码以及-Java-实现算法.md",
           "title": "为 Linux 服务器 SSH 添加 TOTP 动态验证码以及 Java 实现算法",
           "create": "2023-05-30 12:00:00",
           "icon": "fa fa-coffee"
         }
       ],
       "source": "/spec/posts.md" // 显示在索引前的文章
     },
     "home": { // 主页的配置
       "source": "/spec/home.md" // 显示在主页的文章
     },
     "notfound": { // 404 页面的配置
       "path": "/notfound",
       "source": "/spec/notfound.md"
     },
     "about": { // 关于页的配置
       "path": "/about",
       "source": "/spec/about.md"
     },
     "friends": { // 友联页的配置
       "path": "/friends",
       "source": "/spec/friends.md",
       "friends": [
         {
           "avatar": "https://blog.hanbings.io/img/avatar.jpeg", // avatar 头像
           "name": "寒冰是喵喵", // name 名字
           "link": "https://blog.hanbings.io/", // link 链接
           "about": "🍀 这里寒冰，很高兴认识你！" // about 简介
         }
       ]
     }
   }
   ```

   **页面尾部**

   ```js
   footer: {
       html: "", // html 在页面尾部插入一段 html
       moeIcp: "萌ICP备 20212512 号", // moeIcp 萌备信息
       cnIcp: "" // cnIcp 备案信息
   }
   ```

3. 发布页面

   将文件上传至 Github repo 中，并[打开 Github Pages](https://docs.github.com/zh/pages/getting-started-with-github-pages) 即可部署

## 🍀 关于开源

开源是一种精神。

开源运动所坚持的原则：

1. 坚持开放与共享，鼓励最大化的参与与协作。
2. 尊重作者权益，保证软件程序完整的同时，鼓励修改的自由以及衍生创新。
3. 保持独立性和中立性。

与来自五湖四海的开发者共同**讨论**技术问题，**解决**技术难题，**促进**应用的发展是开源的本质目的。

**众人拾柴火焰高，开源需要依靠大家的努力，请自觉遵守开源协议，弘扬开源精神，共建开源社区！**
