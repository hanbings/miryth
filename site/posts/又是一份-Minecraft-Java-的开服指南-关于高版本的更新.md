![](https://picture.hanbings.com/2021/09/23/09aa2e81bcfff.jpg)

### 0x00 开始之前

**阅读** [Minecraft EULA | Minecraft 最终用户许可协议](https://account.mojang.com/documents/minecraft_eula) **了解 Mojang 允许做什么，不允许做什么**



### 0x01 服务端

1. 服务端是一个软件
2. 服务端主要负责计算游戏中的生物AI 实体状态 对各种各样的事件处理
3. 客户端主要负责加载本地资源和正确渲染它们，使得从服务端接收的数据显示在屏幕上，也就是说，无论是2048x的纹理包还是3080都开不起的光影包，**在客户端使用这些包都不会对服务端的性能产生影响**，另外，服务端是用于计算游戏中的各种需要计算的逻辑运算的，真正导致卡服很多时候都是服务端计算游戏中**过多的实体** ~~就是Mojang写得烂~~



### 0x02 服务端类型选择

1. 原版服务端

2. 插件服务端

3. MOD服务端

4. 插件MOD混合服务端

5. 其他类型

   

插件是一些能帮助服主完成管理工作的额外组件，它**不需要再客户端安装**，插件端有很多，主要是 Bukkit 和 Sponge 两个阵营，相比于插件，**MOD 在大部分情况下在服务端安装后客户端也需要进行安装**，相对来说，提高了一部分玩家进服的门槛，常见的 MOD 加载器有 Forge 和 Fabric

下面是照往例的对比表，但这篇文章不再讨论 1.7.10 的支持性，也就是说如果服务端甚至都不支持 1.12.2 将不会被列在下表之中 如果确实需要 1.7.10 的服务端比较，可以参考以前的一篇文章 [旧的服务端介绍](https://hanbings.io/2020/03/16/%E4%B8%80%E4%BB%BDJava-Minecraft%E7%9A%84%E5%BC%80%E6%9C%8D%E6%89%8B%E5%86%8C-%E8%AF%B7%E7%AD%BE%E6%94%B6-OvO/) 同样，✅表示支持 ❌表示不支持



**对模组和插件的支持**

| 服务端                                                       | Bukkit 插件 | Sponge 插件 | Forge 模组 | Fabric 模组 |
| ------------------------------------------------------------ | ----------- | ----------- | ---------- | ----------- |
| [Minecraft](https://www.minecraft.net/zh-hans/download/server) | ❌           | ❌           | ❌          | ❌           |
| [Forge](https://files.minecraftforge.net/net/minecraftforge/forge/) | ❌           | ❌           | ✅          | ❌           |
| [Fabric](https://fabricmc.net/)                              | ❌           | ❌           | ❌          | ✅           |
| [MCDR](https://github.com/Fallen-Breath/MCDReforged)         | ❌           | ❌           | ❌          | ❌           |
| [Spigot](https://www.spigotmc.org/)                          | ✅           | ❌           | ❌          | ❌           |
| [Sponge](https://www.spongepowered.org/)                     | ❌           | ✅           | ❌          | ❌           |
| [Paper](https://papermc.io/)                                 | ✅           | ❌           | ❌          | ❌           |
| [Akarin](https://github.com/Akarin-project/Akarin)           | ✅           | ❌           | ❌          | ❌           |
| [Purpur](https://purpur.pl3x.net/)                           | ✅           | ❌           | ❌          | ❌           |
| [Yatopia](https://github.com/YatopiaMC/Yatopia)              | ✅           | ❌           | ❌          | ❌           |
| [Airplane](https://airplane.gg/)                             | ✅           | ❌           | ❌          | ❌           |
| [Sugarcane](https://sugarcanemc.org/)                        | ✅           | ❌           | ❌          | ❌           |
| [ArcLight](https://github.com/IzzelAliz/Arclight)            | ✅           | ❌           | ✅          | ❌           |
| [Mohist](https://github.com/MohistMC/Mohist)                 | ✅           | ❌           | ✅          | ❌           |
| [LoliServer](https://github.com/Loli-Server/LoliServer1.16)  | ✅           | ❌           | ✅          | ❌           |
| [CatServer](https://github.com/Luohuayu/CatServer)           | ✅           | ❌           | ✅          | ❌           |
| [SpongeForge](https://www.spongepowered.org/)                | ❌           | ✅           | ✅          | ❌           |
| [Carboard](https://cardboardpowered.org/)                    | ✅           | ❌           | ❌          | ✅           |
| [Minestom](https://github.com/Minestom/Minestom)             | ❌           | ❌           | ❌          | ❌           |
| [CubeRite](https://cuberite.org/)                            | ❌           | ❌           | ❌          | ❌           |

**更新情况 截至 2021年 10 月 11 日**

| 服务端                                                       | 1.12 | 1.13 | 1.14 | 1.15 | 1.16 | 1.17 | 是否有功能更新 |
| ------------------------------------------------------------ | ---- | ---- | ---- | ---- | ---- | ---- | -------------- |
| [Minecraft](https://www.minecraft.net/zh-hans/download/server) | ✅    | ✅    | ✅    | ✅    | ✅    | ✅    | ✅              |
| [Forge](https://files.minecraftforge.net/net/minecraftforge/forge/) | ✅    | ✅    | ✅    | ✅    | ✅    | ✅    | ✅              |
| [Fabric](https://fabricmc.net/)                              | ✅    | ✅    | ✅    | ✅    | ✅    | ✅    | ✅              |
| [MCDR](https://github.com/Fallen-Breath/MCDReforged)         | ✅    | ✅    | ✅    | ✅    | ✅    | ✅    | ✅              |
| [Spigot](https://www.spigotmc.org/)                          | ✅    | ✅    | ✅    | ✅    | ✅    | ✅    | ✅              |
| [Sponge](https://www.spongepowered.org/)                     | ✅    | ❌    | ❌    | ❌    | ✅    | ✅    | ✅              |
| [Paper](https://papermc.io/)                                 | ✅    | ✅    | ✅    | ✅    | ✅    | ✅    | ✅              |
| [Akarin](https://github.com/Akarin-project/Akarin)           | ✅    | ✅    | ✅    | ✅    | ✅    | ❌    | ✅              |
| [Purpur](https://purpur.pl3x.net/)                           | ❌    | ❌    | ✅    | ✅    | ✅    | ✅    | ✅              |
| [Yatopia](https://github.com/YatopiaMC/Yatopia)              | ❌    | ❌    | ❌    | ✅    | ✅    | ✅    | ❌              |
| [Airplane](https://airplane.gg/)                             | ❌    | ❌    | ❌    | ❌    | ✅    | ✅    | ✅              |
| [Sugarcane](https://sugarcanemc.org/)                        | ❌    | ❌    | ❌    | ❌    | ❌    | ✅    | ✅              |
| [ArcLight](https://github.com/IzzelAliz/Arclight)            | ❌    | ❌    | ✅    | ✅    | ✅    | ✅    | ✅              |
| [Mohist](https://github.com/MohistMC/Mohist)                 | ✅    | ❌    | ❌    | ❌    | ✅    | ❌    | ✅              |
| [LoliServer](https://github.com/Loli-Server/LoliServer1.16)  | ❌    | ❌    | ❌    | ❌    | ✅    | ❌    | ✅              |
| [CatServer](https://github.com/Luohuayu/CatServer)           | ✅    | ❌    | ❌    | ❌    | ❌    | ❌    | ❌              |
| [SpongeForge](https://www.spongepowered.org/)                | ✅    | ❌    | ❌    | ❌    | ❌    | ❌    | ✅              |
| [Carboard](https://cardboardpowered.org/)                    | ❌    | ❌    | ❌    | ❌    | ✅    | ✅    | ✅              |
| [Minestom](https://github.com/Minestom/Minestom)             | ❌    | ❌    | ❌    | ❌    | ❌    | ✅    | ✅              |
| [CubeRite](https://cuberite.org/)                            | ✅    | ❌    | ❌    | ❌    | ❌    | ❌    | ✅              |



#### Minecraft Server

原版服务端 由 Mojang 开发 能保证得到最快的更新

**性能较低** ~~对，就是 Mojang 写得烂~~



#### Forge / Fabric

原版服务端与模组加载器的结合 由各自的开发团队维护

Fabric 也算是新起之秀了，能在官方核心更新后几个小时最长几天得到更新，而 Forge 将经历几周到几个月的开发时间，Forge 因为起步时间早，留存了众多的模组开发者以及拥有一套完善的API，相比于 Fabric，Forge 的模组数量和开发者数量要多很多

如果需要开一个 **生电服务器** ，可以考虑使用 Fabric 为服务器提供一些辅助功能的支持，因为 Forge 除了 模组接口以外还对游戏做了一些特性修复，而 Fabric 以相对干净的方式侵入服务端，能最大程度的保留原版体验



#### MCDR

严格来说，MCDR (MCDReforged) 不属于一个服务端，它是一个完全独立于服务端以外，利用服务端输出的日志来达到一小部分的功能的插件加载器

MCDR 由于独立于服务端进程的特性，能做到一些侵入补丁式模组/插件加载器所做不到的功能，比如 备份文件 定时任务 和各种奇怪的聊天软件奇妙联动 ~~或者是留后门删除服务端~~

推荐与 Fabric 使用或是与原版使用，适应场景还是以保留原汁原味的游戏体验为主



#### Spigot / Paper 

两个性能优秀，更新较快的服务端，可以说是服务端们的老前辈了，它们拥有众多的插件开发者和各式各样的插件，最重要的是它们拥有一个十分稳定的 API -- **Bukkit API**

如果没有特殊需求，可以考虑这两个服务端，其中 Paper 比 Spigot 有更多的可选优化项



#### Akarin / Purpur / Yatopia / Airplane / Sugarcane

以上列举的服务端都是基于 Spigot 或是 Paper，它们或多或少的提供了更多的性能优化和可选功能选项

如果游戏的大部分玩法都在于小游戏而不是原版内容，可以考虑这些服务端

*因为没有人对它们进行过性能比较，故不多评价它们的性能*



#### ArcLight / Mohist / LoliServer / CatServer / SpongeForge / Carboard

其中 ArcLight / Mohist / LoliServer / CatServer 提供了 Bukkit + Forge 的功能，SpongeForge 则提供了 Sponge 插件与 Forge 的功能，Carboard 提供了 Bukkit 插件与 Fabric 模组的功能

除去已经[宣布停止更新的 CatServer](https://www.mcbbs.net/forum.php?mod=viewthread&tid=1148454&extra=page%3D1&ordertype=1) 以外，Arclight 提供了比较快的更新速度，除了更新速度外其余参数，如性能等问题在这里不做讨论



#### Minestom / CubeRite

使用C++语言编写和进行了游戏逻辑运算多线程拆分尝试的探险家们

不支持现有的插件模组生态，如果喜欢尝试这些更新更好玩的东西，可以到它们那里看看



### 0x03 下载JDK和服务端核心

有关于 JDK 的选择，移步 [[2021.8.18] 换个 JVM，最高节省43.3%内存，提高36.9%CPU效率 -- MCBBS](https://www.mcbbs.net/thread-1232993-1-1.html) 

当然，几个朋友一起玩玩的服务器没有这么多花里胡哨的需求，直接下载 [OpenJDK](https://openjdk.java.net/) 或 [AdoptOpenJDK](https://adoptopenjdk.net/) 使用即可，可以在 [Java I tell you](https://www.injdk.cn/) 获取对于国内友好的下载链接

**小提示：1.17 需要至少 Java 16 才能运行**



服务端核心可以到各个核心各自的网站上下载，它们网站的链接已经嵌入到上面对比表格的服务端名称中，点击即可跳转，当然，这些核心的下载也有镜像站提供对于国内友好的下载链接，但文章不提供这一部分内容，需要自行使用搜索引擎查找，**请注意数据安全**



**文章使用 [Paper](https://papermc.io/) 服务端和[腾讯云轻量服务器](https://curl.qcloud.com/AUtS8IIV)进行实际操作演示**



### 0x04 搭建服务器

操作系统：Debian 10

连接方式：VSCode Remote SSH

硬件配置：腾讯云轻量服务器 香港 2核4G 30Mbps



#### 服务器

腾讯云轻量服务器是随便选的，因为刚好腾讯云搞活动送了我一台，然后香港那边 30Mbps 带宽还行，适合一个人折腾服务器和就几个朋友联机，如果有需要可以点后方链接购买 [【腾讯云】境外1核2G服务器低至2折，半价续费券限量免费领取！](https://curl.qcloud.com/gO13xFN3) 

![服务器](https://picture.hanbings.com/2021/10/11/45a662faede0a.PNG)

如果是需要开一个常驻在线玩家大于 10 人的服务器，还是需要购买更好的服务器，尤其是**高版本的服务端**，一般来说游戏服务器都需要比较高 CPU 主频高和比较高带宽，这里就不展开讨论了



#### 操作系统

相比于 Windows，Linux 更能压榨硬件性能以及更少的内存占用，本文选用 Debian 10 作为操作系统进行演示，如果是购买的腾讯云轻量服务器，除去可以选择操作系统以外可以直接偷懒选开箱即用的操作系统捆绑宝塔面板软件包

![轻量开箱即用](https://picture.hanbings.com/2021/10/11/c35be491019be.PNG)



#### 远程连接

既然已经在电脑上装了 VSCode，当然是用万能的 VSCode 来解决问啦，阿巴阿巴阿巴阿巴，还是我懒，其实有很多可以选择的，比如 FinalSSH XShell Putty 等，可以根据需求自行选择，~~能连上就行~~

到 VSCode 的插件商城下载 Remote SSH 插件即可纵享丝滑

![Remote](https://picture.hanbings.com/2021/10/11/c5b3a7bc4806c.PNG)



#### 连接服务器

根据服务商提供的账号密码进行登录 在 remote 插件中的登录格式为 **用户名@主机地址:端口** 随后根据提示输入密码

在 腾讯云 阿里云 百度云 等厂家购买的服务器通常自动开启防火墙，需要手动将远程端口打开

![连接服务器](https://picture.hanbings.com/2021/10/11/ca531182cf34b.PNG)



#### 在 Debian 中安装 JDK 16

**老传统了，连上服务器之后先 apt update 一手**

按照顺序，执行以下命令，添加 AdoptOpenJDK 的公钥以及源列表给 apt，如果是以 root 身份登录的服务器，那么 sudo 头是可选的

**但是，请记住，在 root 用户下启动服务器是十分危险的，特别是在不确定服务端和插件模组的来源的情况下，因为 root 是 Linux 下用户态的最高权限账户**



更新软件源列表

```
sudo apt update
```

确保已经安装所需要的软件

```
sudo apt install -y wget apt-transport-https gnupg
```

下载 Adopt Open JDK 的 GPG 密钥

```
wget https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public
```

安装密钥

```
gpg --no-default-keyring --keyring ./adoptopenjdk-keyring.gpg --import public
gpg --no-default-keyring --keyring ./adoptopenjdk-keyring.gpg --export --output adoptopenjdk-archive-keyring.gpg
```

清理用不到的文件

```
rm adoptopenjdk-keyring.gpg
```

将密钥保存到根目录

```
sudo mv adoptopenjdk-archive-keyring.gpg /usr/share/keyrings && sudo chown root:root /usr/share/keyrings/adoptopenjdk-archive-keyring.gpg 
```

将源添加到源列表

```
echo "deb [signed-by=/usr/share/keyrings/adoptopenjdk-archive-keyring.gpg] https://adoptopenjdk.jfrog.io/adoptopenjdk/deb buster main" | sudo tee /etc/apt/sources.list.d/adoptopenjdk.list
```

再次更新

```
sudo apt update
```

下一步就是安装 JDK 了

```
sudo apt install adoptopenjdk-16-hotspot
```

可以使用下面的指令查看其他版本的 JDK

```
sudo apt-cache search adoptopenjdk
```



#### 确认 Java 可用于启动服务器

输入 java --version以确保正确安装 JDK

```
java --version
```

![确认安装完成](https://picture.hanbings.com/2021/10/12/9957b991ba65a.PNG)



#### 下载服务端

用到前面用到过的 wget 指令，前往 [PaperMC Downloads](https://papermc.io/downloads#Paper-1.16) 然后右键下载按钮复制下载链接，直接追加到 wget 指令后

但下载之前或者说启动服务端之前最好先创建一个没有文件的空目录，然后使用 wget 下载核心

```
mkdir minecraft && cd minecraft
```

下载

```
wget https://papermc.io/api/v2/projects/paper/versions/1.16.5/builds/788/downloads/paper-1.16.5-788.jar
```

![wget 下载服务端](https://picture.hanbings.com/2021/10/12/e07eec88abb03.PNG)



#### 启动！

使用指令 ls 查看目录下的文件，找到 paper-x.xx.x-xxx.jar 这样子的文件，复制它的文件名，以 paper-1.16.5-788.jar 为例

```
java -jar paper-1.16.5-788.jar
```

第一次启动服务器请耐心等待，因为需要下载依赖以及原版核心进行注入，**且需要修改启动后自动生成的 eula.txt中 false 为 true 同意 EULA**

![同意 EULA](https://picture.hanbings.com/2021/10/12/06c590c171da7.PNG)

 

修改完成后再一次使用指令

```
java -jar paper-1.16.5-788.jar
```

当看到

```
Done (9.441s)! For help, type "help"
```

时，服务端已经成功启动啦！在游戏内连接服务器应该填写的IP是：**服务器的公网IP:25565**

![启动完成](https://picture.hanbings.com/2021/10/12/49e03dc0e8cb4.PNG)



### 0x05 最后

1. **选择 Linux 切记不要使用 root 账户启动服务器，文章只是用于演示**
2. 无论是什么服务端，**它们存在，它们就有它们各自的价值**，不需要诋毁其他的服务端来吹捧自己的选择
3. 如果文章中有疏漏或是错误，请联系我，我会第一时间修改，感谢你的帮助，也非常感谢你能阅读到这里



