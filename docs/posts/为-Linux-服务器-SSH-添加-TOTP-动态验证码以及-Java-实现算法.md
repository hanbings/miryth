# 为 Linux 服务器 SSH 添加 TOTP 动态验证码以及 Java 实现算法

### 0x00 TOTP 动态验证码？

TOTP **基于时间的一次性密码算法**（Time-Based One-Time Password）是一种根据预共享的密钥与当前时间计算一次性密码的算法，利用不同设备时间相同的特性，将时间作为特定算法的一部分从而达到无需网络进行安全验证的目的。 该算法有两个输入，一个输出，**一个输入是随机生成的密钥**，密钥需要被验证方和验证器同时持有，**另一个输入即系统时间，通常是 UNIX 时**，输出则是两方相同的验证码。一般的验证码有效期为 30 秒，每 30

 秒生成一个新的验证码。当前有很多领域和行业在使用 TOTP 作为它们的安全验证，比如银行使用的实体验证器，网易的网易将军令等。

这套算法在 [RFC6238](https://datatracker.ietf.org/doc/html/rfc6238) 中有详细的说明，在后面的实现算法部分详细说明。



### 0x01 Linux 服务器安装 Google Authenticator

服务器采用**腾讯云轻量服务器 Debian Linux 系统**，腾讯云轻量服务器是腾讯云基于 CVM 服务器推出以应用为中心的轻量级服务器，优点在于快速部署应用、价格便宜等。有需要在云环境练习 Linux 技能的推荐购买 [【腾讯云】云产品限时秒杀，爆款2核4G云服务器首年74元](https://cloud.tencent.com/act/cps/redirect?redirect=1077&cps_key=42eeddb226d35120b98485ba26e1009e&from=console) [【腾讯云】境外1核2G服务器低至2折，半价续费券限量免费领取！](https://cloud.tencent.com/act/cps/redirect?redirect=1068&cps_key=42eeddb226d35120b98485ba26e1009e&from=console)

1. SSH 远程登录后 先更新当前源列表

   ```
   apt update
   ```

   

2. 然后执行安装指令

   当然，如果已经在 [腾讯云里买了一堆轻量机子](https://curl.qcloud.com/V468ZsNQ) 了，不想做这些繁琐的步骤，可以用轻量的自动化助手一键完成安装后再进入机子进行 Authenticator 密钥设置

   ![非常好用的轻量自动化助手](https://picture.hanbings.com/2021/12/24/d3755daa74a51.PNG)

   ```
   apt install libpam-google-authenticator
   ```

   ![安装Google Authenticator](https://picture.hanbings.com/2021/12/20/59bd359263290.PNG)

   

3. 输入 google-authenticator 并按照说明进行配置

   ```
   google-authenticator
   ```

   ![设置 Authenticator](https://picture.hanbings.com/2021/12/20/f74f7a7aa2325.PNG)

   图中黄线框部分为密钥，红色线框部分为备用验证码，备用验证码是在丢失验证器的情况下输入的验证码，验证码输入后将失效。**请妥善保管这两个内容，它们是生成验证码的关键，也请不要泄露这个二维码**

   粗略翻译下选项

   ```
   Do you want authentication tokens to be time-based
   
   需要启用基于时间的认证吗？
   
   Do you want me to update your "/root/.google_authenticator" file?
   
   需要更新配置文件吗？
   
   Do you want to disallow multiple uses of the same authentication
   token? This restricts you to one login about every 30s, but it increases
   your chances to notice or even prevent man-in-the-middle attacks ?
   
   禁止多次使用同一个身份验证令牌吗？这将限制大约每 30 秒登录一次，它将减少中间人攻击的机会
   
   By default, a new token is generated every 30 seconds by the mobile app.
   In order to compensate for possible time-skew between the client and the server,
   we allow an extra token before and after the current time. This allows for a
   time skew of up to 30 seconds between authentication server and client. If you
   experience problems with poor time synchronization, you can increase the window
   from its default size of 3 permitted codes (one previous code, the current
   code, the next code) to 17 permitted codes (the 8 previous codes, the current
   code, and the 8 next codes). This will permit for a time skew of up to 4 minutes
   between client and server.
   Do you want to do so? 
   
   默认情况下，移动应用程序每 30 秒生成一个新令牌。
   为了补偿客户端和服务器之间可能的时间偏差，
   我们允许在当前时间之前和之后一个额外的令牌。这允许一个
   身份验证服务器和客户端之间的时间偏差最大为 30 秒。如果你
   遇到时间同步不好的问题，可以增加窗口
   从其默认大小的 3 个允许代码（一个以前的代码，当前的
   代码，下一个代码）到 17 个允许的代码（前 8 个代码，当前代码
   代码，以及接下来的 8 个代码）。这将允许最多 4 分钟的时间偏差
   客户端和服务器之间。
   要这样做吗？
   
   If the computer that you are logging into isn't hardened against brute-force
   login attempts, you can enable rate-limiting for the authentication module.
   By default, this limits attackers to no more than 3 login attempts every 30s.
   Do you want to enable rate-limiting?
   
   如果您登录的计算机没有针对蛮力进行强化
   登录尝试，您可以为身份验证模块启用速率限制。
   默认情况下，这会将攻击者限制为每 30 秒不超过 3 次登录尝试。
   您要启用速率限制吗？
   ```



4. **这个时候二步认证是还没有生效的**，还需要修改 pam 以及 ssh 配置，**请仔细小心地修改配置，任何一处错误都可能导致 ssh 无法连接**

   鉴于操作危险性，建议提前对机子进行备份，**比如 [腾讯云轻量](https://curl.qcloud.com/V468ZsNQ) 的镜像备份**，一个地区五个免费配额，不用白不用是吧 （手动狗头）

   ![腾讯云轻量提供免费备份](https://picture.hanbings.com/2021/12/24/1f289ea40f270.PNG)
   
   文件 **/etc/pam.d/sshd**

   ```
   添加一行 auth required pam_google_authenticator.so
   ```

   ![修改 PAM 配置](https://picture.hanbings.com/2021/12/20/9ce4d755ead45.PNG)
   
   文件 **/etc/ssh/sshd_config**

   ```
   ChallengeResponseAuthentication no 更改为 ChallengeResponseAuthentication yes
   ```
   
   ![修改 SSH 配置](https://picture.hanbings.com/2021/12/20/b867e11c35126.PNG)



5. **保存好二维码、密钥以及备用验证码后**断开连接重新登录服务器，这时输入密码后将会出现二步验证

   ![尝试连接 ssh](https://picture.hanbings.com/2021/12/20/bd4593c88b95e.PNG)



### 0x02 设置验证码生成设备

目前有很多家验证器客户端 比较流行的有 **Google Authenticator 、 Microsoft Authenticator、Authy** 等。

Microsoft Authenticator、Authy 相比 Google Authenticator 多了一套云同步系统，能防止意外清除软件数据之后丢失密钥导致的各种问题出现。但请注意，选择了带有云同步功能的应用中使用的同步账号**必须设置一个高强度密码**，避免同步账号被盗取泄露验证码。

~~因为各家 Authenticator 都不允许界面截图，所以它欠咱几张图片~~

这里选用 Google Authenticator 下载安装后进入软件，选择扫描条形码，然后扫描上面保存的图片即可，或选择手动输入，账户为备注名字，可随意，密钥则为保存的密钥。



### 0x03 算法原理

现有实现了 TOTP 的软件中的算法 本质上就是 HMAC-SHA-1 算法，也就是带有盐值的 SHA-1

1. 以 secret 密钥为盐值取当前时间的摘要，即 HMAC-SHA-1(K,C) 

   K 为密钥，C 为当前 UNIX 时间 / 30，之所以除以 30 就是为了取整获得一个 30 内相同的值

   这样就得到了一个原始的哈希值，当然得到这个哈希值还不行，因为哈希值是 20 字节长的，对于 30 秒的验证码来说太长了，所以 **HEX = HMAC-SHA-1(K,C)**  等下还要用

2. 取 HEX 的第 20 字节，也就是 **HEX[19] 的低四位（后四位）**作为偏移量 OFFEST

3. 在 HEX 中，从偏移量 OFFEST 开始**取四个字节**作为验证码中间值 WIP

4. 将 **WIP mod 10^6** 得到 6 位数字，不够 6 位高位补 0 即验证码

举个例子

![TOTP 取验证码](https://picture.hanbings.com/2021/12/20/40b25bb993265.png)





### 0x04 使用 Java 实现算法

**魔法时刻** 

1. **核心算法 HMAC-SHA-1**

   ```
   /**
        * HmacSHA1 计算
        *
        * @param source 数据源
        * @param key    密钥
        * @return String 计算结果
        */
       public static String sha1(String source, String key) {
           try {
               Mac mac = Mac.getInstance("HmacSHA1");
               SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA1");
               mac.init(keySpec);
               byte[] byteArray = mac.doFinal(source.getBytes(StandardCharsets.UTF_8));
               StringBuilder stringBuilder = new StringBuilder();
               for (byte temp : byteArray) {
                   stringBuilder.append(String.format("%02x", temp));
               }
               return stringBuilder.toString();
           } catch (Exception e) {
               e.printStackTrace();
               return null;
           }
       }
   ```

   

2. **流程**

   ```
   package io.hanbings.cynops.extra.otpauth;
   
   import javax.crypto.Mac;
   import javax.crypto.spec.SecretKeySpec;
   import java.io.ByteArrayInputStream;
   import java.io.DataInput;
   import java.io.DataInputStream;
   import java.io.IOException;
   import java.util.Objects;
   
   /**
    * 实现 RFC6238 中描述的 TOTP <br>
    * Time-Based One-Time Password 基于时间的一次性密码 <br>
    * 参考 <br>
    * 1. https://datatracker.ietf.org/doc/html/rfc6238 <br>
    * 2. https://www.aqniu.com/tools-tech/4671.html
    */
   @SuppressWarnings("unused")
   public class Totp {
       public static String totp(byte[] secret, String algorithm, int distance, long offset) {
           // (当前时间 + 时间偏移量) / 时间片间隔
           long time = ((System.currentTimeMillis()) / 1000) / distance;
           byte[] data = sha1(longToByte(time), secret, algorithm);
           int index = Objects.requireNonNull(data)[19] & 0xf;
           int wip = byteToInt(data, index) & 0x7fffffff;
           return padding(wip);
       }
   
       /**
        * SHA1 计算
        *
        * @param source 数据源
        * @param key    密钥
        * @return String 计算结果
        */
       private static byte[] sha1(byte[] source, byte[] key, String algorithm) {
           try {
               Mac mac = Mac.getInstance(algorithm);
               SecretKeySpec keySpec = new SecretKeySpec(key, algorithm);
               mac.init(keySpec);
               return mac.doFinal(source);
           } catch (Exception e) {
               e.printStackTrace();
           }
           return null;
       }
   
       /**
        * long 转换为 byte
        *
        * @param time long 数据
        * @return byte 数组
        */
       private static byte[] longToByte(long time) {
           byte[] bytes = new byte[8];
           for (int count = 0; count < 8; count++) {
               int offset = 64 - (count + 1) * 8;
               bytes[count] = (byte) ((time >> offset) & 0xff);
           }
           return bytes;
       }
   
       /**
        * byte 转换 int
        *
        * @param bytes byte 数组
        * @param start 开始位移
        * @return int
        */
       private static int byteToInt(byte[] bytes, int start) {
           DataInput input = new DataInputStream(new ByteArrayInputStream(bytes, start, bytes.length - start));
           int temp;
           try {
               temp = input.readInt();
           } catch (IOException e) {
               throw new IllegalStateException(e);
           }
           return temp;
       }
   
       /**
        * 高位补0
        *
        * @param wip 已经处理好的验证码
        * @return 最终结果
        */
       private static String padding(int wip) {
           StringBuilder code = new StringBuilder(String.valueOf(wip % 1000000));
           for (; ; ) {
               if (code.length() < 6) {
                   code.insert(0, "0");
               } else {
                   return code.toString();
               }
           }
       }
   }
   
   ```

   

3. **处理符合 Google Authenticator 要求的 Base32 格式的密钥**

   注意下这里处理只是为了得到 Google Authenticator 能识别的密钥，**事实上传入 HMAC-SHA-1 的还是需要解码 Base32 的原始密钥**

   ```
   /**
        * 编码 Base32
        *
        * @param source 原始字符
        * @return Base 编码字符
        */
       private static String encode(byte[] source) {
           char[] chars = new char[((source.length * 8) / 5) + ((source.length % 5) != 0 ? 1 : 0)];
           for (int count = 0, handle = 0, index = 0; count < chars.length; count++) {
               if (index > 3) {
                   int token = source[handle] & (0xFF >> index);
                   index = (index + 5) % 8;
                   token <<= index;
                   if (handle < source.length - 1) {
                       token |= (source[handle + 1] & 0xFF) >> (8 - index);
                   }
                   chars[count] = ALPHABET[token];
                   handle++;
               } else {
                   chars[count] = ALPHABET[((source[handle] >> (8 - (index + 5))) & 0x1F)];
                   index = (index + 5) % 8;
                   if (index == 0) {
                       handle++;
                   }
               }
           }
           return new String(chars);
       }
   
       /**
        * Base32 解码
        *
        * @param source Base32 编码字符串
        * @return 原始字符
        */
       private static byte[] decode(String source) {
           char[] stringData = source.toCharArray();
           byte[] data = new byte[(stringData.length * 5) / 8];
           for (int count = 0, handle = 0, index = 0; count < stringData.length; count++) {
               int token = DECODE_TABLE[stringData[count]];
               if (index <= 3) {
                   index = (index + 5) % 8;
                   if (index == 0) {
                       data[handle++] |= token;
                   } else {
                       data[handle] |= token << (8 - index);
                   }
               } else {
                   index = (index + 5) % 8;
                   data[handle++] |= (token >> index);
                   if (handle < data.length) {
                       data[handle] |= token << (8 - index);
                   }
               }
           }
           return data;
       }
   ```

   

4. **计算验证码**

   ```
   /**
        * 生成符合要求的密钥
        *
        * @return 密钥
        */
       public static String secret() {
           try {
               SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
               return encode(random.generateSeed(10)).toUpperCase(Locale.ROOT);
           } catch (NoSuchAlgorithmException e) {
               e.printStackTrace();
           }
           return null;
       }
   
       /**
        * 获取当前验证码
        *
        * @param secret 密钥
        * @return 验证码
        */
       public static String code(String secret) {
           return Totp.totp(
                   decode(secret),
                   "HmacSHA1"
                   , 30
                   , 0);
       }
   ```



### 0x05 最后

文章中可能还有错误的地方，欢迎各位提出。

文中提及的代码均在我的开源 Java 中间件项目 [Cynops](https://github.com/Hanbings/Cynops) 中 ，欢迎 Star ，也可以 Follow 我的 Github [Hanbings](https://github.com/Hanbings) 还请前辈们多多指教。
