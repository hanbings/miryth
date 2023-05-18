# Java实现一个简单的EventBus

### 0x00 EventBus

EventBus 是一种低耦合甚至完全分离的消息传递模块设计

实现 EventBus 通常基于发布/订阅者模式或观察者模式两种设计模式
例如基于前者的 Google/Guava 基于后者的 Minecraft Bukkit Event
在这个实现中 EventBus 是基于前者的，也就是发布/订阅者模式

其实写这个玩具是想给其他项目做一个 插件/模组 事件系统来着 阿巴阿巴阿巴 （小声）



### 0x01 发布/订阅者模式与观察者模式

前面说过了，这两个模式是常见实现设计模式，发布/订阅者模式在某种意义上是观察者模式的一个扩展和补充

**观察者模式由消息发布者与消息监听者两方组成**，消息发布者和消息监听者互相知晓，也就是说这样的模式只是低耦合
**发布/订阅者模式由消息发布者、消息传递者和消息监听者三方组成**，消息发布者和消息监听者互不相识，完全隔离，由一个第三方消息传递者来进行通知，是一个完全分离的设计



> 昂... 观察者模式就像课堂上老师给同学说过两天要考试，消息发布者是老师，消息监听者是同学，同学直接从老师那里得知了消息，而发布/订阅者模式就像老师把过两天要考试的消息发布在了电子消息公告栏上一样，消息监听者同学们收到了由公告栏消息传递者发布的消息，同学们是不知道消息到底是老师发的还是校长发的



### 0x02 结构

![EventBus](https://picture.hanbings.com/2021/08/27/d855263eb4dd9.png)

<p class="note note-success">项目地址：<a href="https://github.com/Hanbings/Cynops-event">https://github.com/Hanbings/Cynops-event</a></p>



#### 类与类功能描述

| 类名/接口名        | 功能描述                                                     |
| ------------------ | ------------------------------------------------------------ |
| Event              | Event模板类 注册到EventBus的事件都需要继承自Event类          |
| Listener           | Listener模板类 注册到EventBus的事件都需要继承自Event类       |
| @EventHandler      | 事件处理器注解 当在注册一个符合条件 Listener 后 EventBus 将自动扫描 Listener 中带有此注解的方法 并且自动识别方法内第一个参数且只能是唯一的一个参数所要求的事件 当事件向 EventBus 中发布一次事件的时候 EventBus 将通知所有订阅了这一个事件的 Listener 然后执行 Listener 中对应的 @EventHandler 方法 |
| Cancellable        | 一个 Event 接口, 实现该接口标识事件可以取消 如果不理解 可以先阅读 Blockable 使用接口中的 setCancelled(bollean cancel) 取消一个事件后 仅仅在 Event 中可能会存在的 cancel 标志位标记事件已经取消/未取消 但事件将继续向下传递到 @EventHandler 的方法中 ignoreCancelled() 参数保持 false 的处理器方法 在声明 @EventHandler时设置参数 ignoreCancelled 为 true 即忽略已经标记取消的事件 那么将不会被执行 |
| Blockable          | 一个 Event 接口 实现该接口标识事件可以阻断 阻断的意思是如果一个事件实现了这个接口 并且一个 EventHandler 使用了 接口中的 setBlocked(boolean block) 方法 本次事件将会就地结束 |
| EventBus           | EventBus 提供 registerEvent() / unregisterEvent () registerListener() / unregisterListener() callEvent() 等方法注册 注销 发布事件等操作 |
| EventPriority      | 这个枚举使用在 @EventHandler 注解的 priority 参数中 LOWEST, LOW, NORMAL, HIGH, HIGHEST, MONITOR 是枚举内容 LOWEST 优先级最高, 是第一个被触发的等级, MONITOR 优先级最低, 是最后一个被触发的等级 |
| RegisteredHandler  | 当 @EventHandler 被扫描后注册后加载到这个类                  |
| RegisteredListener | 当 Listener 被扫描后并且扫描了 @EventListener 后将 RegisteredHandler 加载到这个类 事件的优先级排序是在这个过程中完成的 |



### 0x03 背后的故事

#### 1. Event - 事件

来看看一个事件是怎么样注册和发布的

1. 一个类**继承**了 Event
2. 使用一个  EventBus 实例的 registerEvent(Event event) 
3. EventBus 经过一些操作后**注册事件到内部的一张 Map 中**
4. 使用 EventBus 实例的 **callEvent(Event event) 发布事件**



在第一步中，一个类继承自 Event 类，这样的设计是为了限定在 EventBus 中与 Event 相关的方法所能接受的类型



第二步和第三步，使用 EventBus 中的 registerEvent(Event event) 注册事件到一张Map中

昂... 那张 Map大概长这个样：

```java
private final Map<Class<? extends Event>, RegisteredListener> handlers = new ConcurrentHashMap<>();
```

Map 的第一个参数自然是 Event 的子类 而第二个参数则是集合了所有有注册到这个事件的事件处理器的监听器（有点绕）的容器，它（RegisteredListener）看上去是这样的：

```java
package io.hanbings.cynops.event;

import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("unused")
public class RegisteredListener {
    private final List<RegisteredHandler> handlerList = new ArrayList<>();
    private final List<Integer> priorityIndex = new ArrayList<>();

    public RegisteredListener() {
        for (int count = 0; count < 6; count++) {
            priorityIndex.add(0);
        }
    }

    public List<RegisteredHandler> getHandlerList() {
        return handlerList;
    }

    public void addHandler(RegisteredHandler handler) {
        // 这一处非常糟糕的说
        int priority = getPriorityShadow(handler.getPriority());
        handlerList.add(priorityIndex.get(priority), handler);
        for (int count = priority; count < 6; count++) {
            priorityIndex.set(count, priorityIndex.get(count) + 1);
        }
    }

    public void removeHandler(RegisteredHandler handler) {
        handlerList.removeIf(registeredHandler -> registeredHandler.getListener().equals(handler.getListener()));
    }
    
    private int getPriorityShadow(EventPriority priority) {
        switch (priority) {
            case LOWEST:
                return 0;
            case LOW:
                return 1;
            case HIGH:
                return 3;
            case HIGHEST:
                return 4;
            case MONITOR:
                return 5;
            default:
                return 2;
        }
    }
}
```



这个类当中又又又有两个列表，其中一个是 RegisteredHandler 的列表，另一个则是用于实现优先级的列表，回到事件注册，在EventBus中有：

```java
public void registerEvent(Event event) {
    if (!handlers.containsKey(event.getClass())) {
        handlers.put(event.getClass(), new RegisteredListener());
    }
}
```

这样大概明了了吧，在一个 EventBus 示例中，有一张存储监听器的 Map ，Event 类的 Class 作为键，一个 RegisteredListener 实例作为值，在 RegisteredListener 实例中又存储了 RegisteredHandler 事件处理器方法列表和优先级列表



到第四步，使用 callEvent (Event event) 触发事件：

```java
public void callEvent(Event event) {
    if (handlers.containsKey(event.getClass())) {
        for (RegisteredHandler handler : handlers.get(event.getClass()).getHandlerList()) {
            if (event instanceof Blockable && ((Blockable) event).isBlocked()) {
                return;
            }
            if (event instanceof Cancellable
                    && ((Cancellable) event).isCancelled()
                    && handler.isIgnoreCancelled()) {
                continue;
            }
            try {
                handler.getMethod().invoke(handler.getListener(), event);
            } catch (IllegalAccessException | InvocationTargetException e) {
                e.printStackTrace()
            }
        }
    }
}
```

首先通过 `handlers.containsKey(event.getClass())` 来判断 前面所说的 Map 中是否存在对应的 Event ，然后通过一个循环遍历 **Map 中的 RegisteredListener 中的 HandlerList** 的注册的 @EventHandler ，接着判断有没有实现 Cancellable 和 Blockable 并在判断到接口有实现时判断状态做出对应动作，最后，通过一个反射来执行注册的 @EventHandler 方法 `handler.getMethod().invoke(handler.getListener(), event)`

<p class="note note-success">有关于 Method#invoke 的用法在：<a href="https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/reflect/Method.html">https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/reflect/Method.html</a></p>

**这样就完成了一个事件从注册到发布的一个过程** 这一部分倚重解释如何发布事件的，接下来说说 RegisteredListener RegisteredHandler 和 @EventHandler 的处理



#### 2. @EventHandler - 事件处理器注解

```java
package io.hanbings.cynops.event.interfaces;

import io.hanbings.cynops.event.EventPriority;

import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@SuppressWarnings("unused")
public @interface EventHandler {
    EventPriority priority() default EventPriority.NORMAL;
    boolean ignoreCancelled() default false;
}
```

 以上是 @EventHandler 注解的完整代码，它有两个参数，一个是 EventPriority 类型的 priority，另一个是 boolean 类型的 ignoreCancelled，此外 @Target(ElementType.METHOD) 标注了它只能用于方法，@Retention(RetentionPolicy.RUNTIME) 则标注它在运行时加载，@Documented 表示它将会生成在 Javadocs 中，至于 @SuppressWarnings("unused") 是为了屏蔽 idea 一直在给这个类画黄线说没有被其他类引用，如果造一个单独模块的话这样的情况会常常会出现，但这个注解是无关紧要的，只是为了屏蔽 warning



#### 3. RegisteredHandler - 多了一层皮的事件处理器

```
package io.hanbings.cynops.event;

import io.hanbings.cynops.event.interfaces.Listener;

import java.lang.reflect.Method;

@SuppressWarnings("unused")
public class RegisteredHandler {
    private EventPriority priority;
    private boolean ignoreCancelled;
    private Listener listener;
    private Method method;

    private RegisteredHandler() {
    }

    public RegisteredHandler(EventPriority priority, boolean ignoreCancelled
            , Listener listener, Method method) {
        this.priority = priority;
        this.ignoreCancelled = ignoreCancelled;
        this.listener = listener;
        this.method = method;
    }

    public EventPriority getPriority() {
        return priority;
    }

    public boolean isIgnoreCancelled() {
        return ignoreCancelled;
    }

    public Listener getListener() {
        return listener;
    }

    public Method getMethod() {
        return method;
    }
}
```

这是 RegisterHandler 的完整代码，主要用于存储 @EventHandler 所注解代码的完整信息，优先级 是否忽略已经取消的事件 监听器类 监听处理器方法（真的是方法，是反射扫描注解获得的监听处理器方法 Method 对象）扫描这一块我们下面 RegisterListener 说，RegisterHandler 理解起来就是一个 Java Bean，也就是对象容器，存储反射得到的内容避免重复反射浪费性能



#### 4. RegisterListener - 监听器容器 处理器列表 优先级排序

RegisterListener 实际上已经在第二节里面说过了，这里主要讲讲注册一个监听器到变成 RegisterListener 的部分

先是在 EventBus 中的 registerListener

```
public void registerListener(Listener listener) {
    Class<?> clazz = listener.getClass();
    for (Method method : clazz.getDeclaredMethods()) {
        if (method.isAnnotationPresent(EventHandler.class)) {
            final Class<?> event;
            method.setAccessible(true);
            event = method.getParameterTypes()[0];
            if (handlers.containsKey(event)) {
                EventHandler annotation = method.getAnnotation(EventHandler.class);
                handlers.get(event).addHandler(
                        new RegisteredHandler(annotation.priority()
                                , annotation.ignoreCancelled(), listener, method));
            }
        }
    }
}
```

registerListener 主要是扫描 Listener 中带有 @EventHandler 注解的方法，扫描当然是大家都喜欢的反射啦



```
if (handlers.containsKey(event)) {
                EventHandler annotation = method.getAnnotation(EventHandler.class);
                handlers.get(event).addHandler(
                        new RegisteredHandler(annotation.priority()
                                , annotation.ignoreCancelled(), listener, method));
            }
```

这部分就更是重量级（代码缩进我也不知道是怎么回事，就这样先）先询问 handlers 图中有无存储 @EventHandler 方法要求的 Event，**如果存在，则拿到值，也就是一个 RegisterListener 实例**，然后使用 RegisterListener 的 addHandler 方法向 RegisterListener 的两个列表中添加 RegisterHandler 和 优先级索引



```
public void addHandler(RegisteredHandler handler) {
        // 这一处非常糟糕的说
        int priority = getPriorityShadow(handler.getPriority());
        handlerList.add(priorityIndex.get(priority), handler);
        for (int count = priority; count < 6; count++) {
            priorityIndex.set(count, priorityIndex.get(count) + 1);
        }
    }
```



#### 5. EventBus - 事件总线

到这里其实已经把整个 EventBus 完整的接受了一次了，再看看 EventBus 里面剩下的部分吧

```
public void unregisterListener(Listener listener) {
        Class<?> clazz = listener.getClass();
        for (Method method : clazz.getDeclaredMethods()) {
            if (method.isAnnotationPresent(EventHandler.class)) {
                final Class<?> event;
                method.setAccessible(true);
                event = method.getParameterTypes()[0];
                if (handlers.containsKey(event)) {
                    EventHandler annotation = method.getAnnotation(EventHandler.class);
                    handlers.get(event).removeHandler(
                            new RegisteredHandler(annotation.priority()
                                    , annotation.ignoreCancelled(), listener, method));
                }
            }
        }
    }
```

移除一个 Listener 是对 registerListener() 的反向操作，同样是拿到 RegisterListener 然后从里面的列表移除 RegisterHandler 然后更新索引



```
public void unregisterEvent(Event event) {
        handlers.remove(event.getClass());
    }
```

这个更简单，直接从 Map 移除 Event 完事



### 0x04 最后

非常感谢有耐心读到这里，至此已经是这篇文章的全部内容了，如果有错误的地方欢迎各位指出

项目的开源地址是：https://github.com/hanbings/cynops-event

我的Github是：https://github.com/hanbings

欢迎 follow ~

![](https://picture.hanbings.com/2021/06/03/b24c7abcfb26f.gif)
