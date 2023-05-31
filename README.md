<h1 align="center">⭐ Miryth</h1>

## ⭐ 开始吧！

1. Clone 本项目 `git clone https://github.com/hanbings/miryth.git`

2. 安装依赖 `npm install`

3. 编译 `npm run build`

4. 获得 `miryth.js` 并在 html 页面中创建 body 元素后导入它

   [![VWJkxy.png](https://i.imgloc.com/2023/06/01/VWJkxy.png)](https://imgloc.com/i/VWJkxy)
   [![VWJWl3.png](https://i.imgloc.com/2023/06/01/VWJWl3.png)](https://imgloc.com/i/VWJWl3)
   [![VWJ0L5.png](https://i.imgloc.com/2023/06/01/VWJ0L5.png)](https://imgloc.com/i/VWJ0L5)
   [![VWJln8.png](https://i.imgloc.com/2023/06/01/VWJln8.png)](https://imgloc.com/i/VWJln8)

## 😶‍🌫️ 试试！

1. 创建 `index.html` 文件

2. 导入编译得到的 `miryth.js` 并以覆盖赋值全局变量的方式更改配置项

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
   <script>
       window.miryth = {
           setting: {debug: true},
           header: {
               title: "寒冰的猫窝",
               nav: [
                   {name: "首页", href: "/", icon: "home"},
                   {name: "文章", href: "/posts", icon: "article"},
                   {name: "关于", href: "/about", icon: "info"},
                   {name: "友链", href: "/friends", icon: "link"}
               ]
           },
           content: {
               posts: {
                   posts: [
                       {
                           path: "/posts/java-eventbus",
                           source: "/posts/Java实现一个简单的EventBus.md",
                           title: "Java 实现一个简单的 EventBus",
                           create: "2023-05-29 12:00:00",
                           icon: "fa fa-coffee"
                       },
                       {
                           path: "/posts/what-is-the-totp",
                           source: "/posts/为-Linux-服务器-SSH-添加-TOTP-动态验证码以及-Java-实现算法.md",
                           title: "为 Linux 服务器 SSH 添加 TOTP 动态验证码以及 Java 实现算法",
                           create: "2023-05-30 12:00:00",
                           icon: "fa fa-coffee"
                       }
                   ],
                   source: "/spec/posts.md"
               },
               home: {source: "/spec/home.md"},
               notfound: {source: "/spec/notfound.md"},
               about: {source: "/spec/about.md"},
               friends: {source: "/spec/friends.md"}
           },
           footer: {moeIcp: "萌ICP备 20212512 号"}
       }
   </script>
   <script src="miryth.js"></script>
   
   </html>
   ```
   
3. 创建 `index.json` 作为目录索引

## 🍀 关于开源

开源是一种精神。

开源运动所坚持的原则：

1. 坚持开放与共享，鼓励最大化的参与与协作。
2. 尊重作者权益，保证软件程序完整的同时，鼓励修改的自由以及衍生创新。
3. 保持独立性和中立性。

与来自五湖四海的开发者共同**讨论**技术问题，**解决**技术难题，**促进**应用的发展是开源的本质目的。

**众人拾柴火焰高，开源需要依靠大家的努力，请自觉遵守开源协议，弘扬开源精神，共建开源社区！**
