# 解析在 Flutter 开发中会使用到的状态管理库

---

# 序言

任何人事物都有状态，水结冰、天起大雾、人生气这些何尝不是状态呢?那么对于程序而言，对于语言来说，他们的状态又是什么呢？我们知道前端有那么几个大的框架 Vue.js,React.js,包括但不限于小程序语法、移动端，他们都会有自己活跃的生态环境，同时也会衍生出自己的状态管理工具，像 Vuex，像 Vue 的男朋友一样，形影不离，像 Mobx Redux，好像他们无处不在，为什么说状态管理是那么的重要呢，有时候不用状态管理，简简单单、单单纯纯不就挺好的。虽然话是这么说，可是真正在企业项目的时候，大家又都说组件化开发，组件化开发，那就造成了一个问题，这个数据，这个值怎么办，传来传去不怕传丢了，那这段路让我们一起来聊聊状态管理在 Flutter 中又是什么的一个角色，谁和谁又是“情敌”呢
写分享第一点要考虑的就是起名字，就是一段视频 ，封面到底怎么样才能够吸引人，文章也不例外，一个大家 都乐于去阅读的多是那些名字听起来就炸天的，比如**状态管理看这篇就够了**， **Flutter 状态管理终极秘籍**等等，当然咱们也不愿去做震惊派，所以暂且称为`Flutter 状态管理一锅端` 灵感是来自之前看过的一篇文章，毕竟人家写的也是真的很好，希望能趁上这个名字。闲扯了那么多，还是没有一点技术性在，那开始吧……

- 文章字数
- 阅读建议

# 第一章 走进官方推荐的解决方案 Provider

在开始写之前，我决定从官方文档找切入，虽然一些中文的文档写的也很好，咱们从[https://flutter.dev/][1]看会不会发现什么蛛丝马迹
![120601.png](https://user-gold-cdn.xitu.io/2019/12/14/16f026aa70a820f4?w=1796&h=768&f=png&s=378815)
我么发现官网还真的有关于状态的描述

![120602.png](https://user-gold-cdn.xitu.io/2019/12/14/16f026d51b37dff3?w=1763&h=800&f=png&s=149417)

映入眼帘的便是这个小动画，大致意思讲的是添加购物车的 demo，也就是说探索 Flutter 时，有时需要跨应用程序在屏幕之间共享应用程序状态。当然我们也必须考虑很多问题
![120603.gif](https://user-gold-cdn.xitu.io/2019/12/14/16f026dee2f6571e?w=847&h=432&f=gif&s=643776)
那对于从事 Ios 或者安卓的开发者来说，真的需要从新的角度去看问题嘛，对于前端开发者来说早已司空见惯。
可以从头开始重建 UI 的某些部分，而不用对其进行修改。Flutter 的速度足够快，即使需要时也可以在每一帧上执行。还有说道`UI = F(state)`

## 1.1 了解状态

### 短时 (ephemeral) 状态

不需要使用状态管理架构（例如 ScopedModel, Redux）去管理这种状态。你需要用的只是一个 StatefulWidget。
在下方你可以看到一个底部导航栏中当前被选中的项目是如何被被保存在 \_MyHomepageState 类的 \_index 变量中。

```dart
class MyHomepage extends StatefulWidget {
  @override
  _MyHomepageState createState() => _MyHomepageState();
}

class _MyHomepageState extends State<MyHomepage> {
  int _index = 0; // 这个index便是短时的，别的地方也不需要去访问它不是吗

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: _index,
      onTap: (newIndex) {
        setState(() {
          _index = newIndex;
        });
      },
      // ... items ...
    );
  }
}
```

### 应用状态

如果你想在你的应用中的多个部分之间共享一个非短时的状态，并且在用户会话期间保留这个状态，我们称之为应用状态（有时也称共享状态）。什么意思呢，就是说一个状态在 A 页面也要用在 B 页面也要使用，就像一个渣男一样，和谁都有染
![03.png](https://user-gold-cdn.xitu.io/2019/12/14/16f0274511f339aa?w=1079&h=564&f=png&s=20937)

也就是说哪位女士都有点状态上的联系
在这里

> Use React for ephemeral state that doesn't matter to the app globally and doesn't mutate in complex ways. For example, a toggle in some UI element, a form input state. Use Redux for state that matters globally or is mutated in complex ways. For example, cached users, or a post draft.

> Sometimes you'll want to move from Redux state to React state (when storing something in Redux gets awkward) or the other way around (when more components need to have access to some state that used to be local).

> The rule of thumb is: do whatever is less awkward.

翻译过来就是

> 将 React 用于短暂状态，该状态对应用程序全局无关紧要，并且不会以复杂的方式进行更改。 例如，在某些 UI 元素中切换，即表单输入状态。 将 Redux 用于全局重要的状态或以复杂方式突变的状态。 例如，缓存的用户或后期草稿。

> 有时，您可能希望从 Redux 状态转换为 React 状态（当在 Redux 中存储某些内容变得笨拙时），或者反过来（当更多组件需要访问某些曾经是本地的状态时）。

> 经验法则是：做些不太尴尬的事情。

大致就是这些意思

## 2 开始实践

从官方看到，这也印证了一点，它是官方建议使用的状态管理工具
首先咱们先建立几个互不相干的文件来一下

- MyPageA

```dart
import 'package:flutter/material.dart';

class MyPageA extends StatefulWidget {
  MyPageA({Key key}) : super(key: key);

  @override
  _MyPageAState createState() => _MyPageAState();
}

class _MyPageAState extends State<MyPageA> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Center(
          child: Text('我是A页面'),
        ),
      ),
    );
  }
}

```

- MyPageB
- MyPageC
  后两个同样的道理。那么在首页呢咱们写三个按钮，分别可以跳向不同的按钮，在这里为了演示案例，咱们就不做代码的封装等问题。

```dart
   child: Center(
          child: Column(
            children: <Widget>[
              RaisedButton(
                onPressed: () {},
                child: Text('我是跳转到A页面的按钮'),
              ),
              RaisedButton(
                onPressed: () {},
                child: Text('我是跳转到B页面的按钮'),
              ),
              RaisedButton(
                onPressed: () {},
                child: Text('我是跳转到C页面的按钮'),
              )
            ],
          ),
        ),
```

现在期望是这样子的我们在页面 A 做测试

```dart
  child: Column(
                children: <Widget>[
                  Container(
                    child: RaisedButton(
                      onPressed: () {},
                      child: Text('+'),
                    ),
                  ),
                  Container(
                    child: Text('现在的值是'),
                  ),
                ],
              )),
```

想必已经知道要做个什么效果了就是没点击一次的时候，默认值就加一
![04.png](https://user-gold-cdn.xitu.io/2019/12/14/16f0275d530ab113?w=408&h=689&f=png&s=32708)

```dart
  Container(
                    child: RaisedButton(
                      onPressed: () {
                        setState(() {
                          count = count + 1;
                        });
                      },
                      child: Text('+'),
                    ),
                  ),
                  Container(
                    child: Text('现在的值是$count'),
                  ),
```

现在已经可以实现了，那么我们要在首页也显示这个值怎么办呢，这相当于是他的父亲也想看的值，就像是，儿子过年的时候收了一大笔压岁钱，此时长辈期望知道咱收了多少压岁钱然后，没收好伐
这样子吧，父亲给个方法过来，也就是给个袋子过来，我把压岁钱装进去

```dart
 void callback() {
    print('我是首页的方法');
  }
```

在跳转的时候，把方法传过去，Flutter 中可以任意的传递他们

```dart
 Navigator.push(
                    context,
                    new MaterialPageRoute(
                        builder: (context) => MyPageA(myCallBack)),
                  );
```

可是会有一个问题，但是对于全局应用状态来说你需要在不同的地方进行修改，可能需要大量传递回调函数
写到这儿，忽然有个很有意思的想法，那就是咱们脑海中有个这个想法，
![05.png](https://user-gold-cdn.xitu.io/2019/12/14/16f027567c3c2f77?w=982&h=427&f=png&s=18683)

- 父亲：父组件即是 main.dart 文件
- 大儿子：子组件一也就是 MyPageA 文件
- 二女儿：子组件二 MyPageB 文件
- 老小：子组件三 MyPageC 文件
  目前是这样的一个情况

```dart
 void myCallBack(val) {
    print('我是父亲，这是我的收钱袋子，从孩子哪里没收的压岁钱是$val');
  }
```

```dart

 onPressed: () {
                        setState(() {
                          count = count + 1;
                        });
                        // 调用回调
                        widget.callback(count);
                      },
```

那这样就会有一个问题，在开发的过程中，就会出现大量的回调函数，这里就引用官方推荐的一种方式，`provider package`
需要理解 3 个概念

- ChangeNotifier
  这个是 Flutter SDK 里用来向大家发送通知的一个类，类似于村里的喇叭 用来通知村民一些事情的变化等
  那么就像如上提到的压碎钱的案例，怎们才能把压碎钱在父亲和几个孩子之间进行来回的传递呢，接下来我打算用一下这个类似于广播的东西。
  在`lib`下新建一个文件夹命名`provider` `lib/provider/money_provider.dart`

```dart
import 'package:flutter/material.dart';

// MoneyProvider 这个类继承自发布者
class MoneyProvider extends ChangeNotifier {
  /// 这里就不说是数据了咱们暂且称为私有数据，并_开头命名
  num _money = 0;
  //  把数据get 一下，类似于暴露
  num get money => _money;
  // 定义一个没有返回值的方法，主要是用来增加自己的压岁钱并展示给其他家里人
  void addMoneyAndShowOthers() {
    _money = _money + 1;
    // 该调用告诉正在侦听此模型的小部件进行重建。
    notifyListeners();
  }
}

```

- ChangeNotifierProvider
  ChangeNotifierProvider widget 可以向其子孙节点暴露一个 ChangeNotifier 实例。它属于 provider package。
  那我们喇叭已经搞好了，现在就是要高高挂起。放在所有村民都能够听的地方
  这也就是说`hangeNotifierProvider` 要放在使用它的部件之上，但是又不可以放的太上，在这个案例中，我们暂且放在
  Remove Link
  ![121401.png](https://user-gold-cdn.xitu.io/2019/12/14/16f02768661b2203?w=858&h=363&f=png&s=34849)
  这里需要注意的是`provider 3.2.0`中
- 提供者不赞成使用的“构建器”，而赞成“创建”
- 不赞成使用代理提供程序的“ builder” /“ initialBuilder”，而分别建议使用“ create”和“ update”
  也就是说 builder 已经是不建议使用了，那么这时候就需要使用新的 api

```dart
void main() => runApp(
      ChangeNotifierProvider(
        // builder: (context) => MoneyProvider(),
        create: (context) => MoneyProvider(),
        child: MyApp(),
      ),
    );

```

当然了，当我们尝试需要多个共享的状态的时候呢，比如压岁钱状态、孩子有没有男女朋友状态等
就可以使用这种方式

```dart
void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider( create: (context) => MoneyProvider()),
        Provider( create: (context) => MoneyProvider(),),
      ],
      child: MyApp(),
    ),
  );
}
```

- Consumer
  如上村长大喇叭都已经就绪了，接下来就是村民应该做的事儿了，就是一条通知发出，广大的村民该怎么接收呢，这里就需要一个部件`Consumer`我们可以把它想象成一个`Container`是一样的道理，只不过它不单单的提供布局功能

```dart
return Consumer<MoneyProvider>(
  builder: (context, state, child) {
    return Text("${state}是什么呢？");
  },
);
```

那这个时候，咱们就去二女儿页面去监听一下试试，那这个时候可能需要咱们把有状态的部件更改为无状态的部件即`StatelessWidget`

```dart
  return Container(
      child: Consumer<MoneyProvider>(
        builder: (context, state, child) {
          return Text("");
        },
      ),
    );
```

我们简单的来看一下这个代码段

- MoneyProvider 我们必须指定要访问的模型类型（是哪个 provider 类）。在这个示例中，我们要访问 MoneyProvider 那么就写上 Consumer<MoneyProvider>
- builder 当 ChangeNotifier 发生变化的时候会调用 builder 这个函数
- context 在每个 build 方法中都能找到这个参数。
- state 也就是第 2 个参数 ChangeNotifier 的实例
- child 用于优化目的
  121402

显然我们是成功了的，目前已经可以显示状态数据`0`了

- Provider.of

有时候就像这样，我们可能是单独的想读出来状态的数据，还不想让压岁钱加 1 呢，也就是说有的时候你不需要模型中的 数据 来改变 UI，但是你可能还是需要访问该数据。
这个时候

```dart
Provider.of<MoneyProvider>(context, listen: false)
```

就像这个样子

```dart
Container(
            child: Column(
          children: <Widget>[
            Text('$moneyFromState'),
            Consumer<MoneyProvider>(
              builder: (context, state, child) {
                return Column(
                  children: <Widget>[
                    RaisedButton(
                      onPressed: () {
                        state.addMoneyAndShowOthers();
                      },
                      child: Text('我是一个按钮'),
                    ),
                    Text('${state.money}')
                  ],
                );
              },
            ),
          ],
        ))
```

最后看一下完整的效果吧
![121402.png](https://user-gold-cdn.xitu.io/2019/12/14/16f02777380b3a58?w=897&h=638&f=png&s=62197)

## 本章总结

这篇`provider`相关的分享其实是在`1206号`左右就开始写了，由于种种原因到今天才写了差不多，在工作中也有用到状态管理，方案也是用的`provider`,总体使用下来尤其是和后台通信结合起来个人并没觉得很方便，反而是麻烦了点，可能是项目比较小的原因，所以说还是那句话`不近视的话呢，先可以不要戴眼镜`。由于平时开发任务也比较重，加上自己也在维护一个全栈的项目。所以这个系列

- [Flutter 实战 从头撸一个「孤岛」APP（No.3、书单、搜索框、Dio 初探）](https://juejin.im/post/5de2b7aa5188256e913c991d)
- [Flutter 实战 从头撸一个「孤岛」APP（No.2、闪屏 Splash Page、引导页）](https://juejin.im/post/5dd97d3fe51d45234f582cbe)
- [Flutter 实战 从头撸一个「孤岛」APP（No.1、项目初始化、屏幕适配）](https://juejin.im/post/5dd0142be51d453fc01e8a25)

还是会不断的更新，目前 github 也有几颗星了，下一篇章打算写一下 Model 类的转换，希望看到这儿的你能够多多给个鼓励，希望你也有点收获，盼望每个人都能过上儿时梦想搬的生活
这篇分享的相关代码会同步到 github

---

-- End but thank you --

[1]: https://flutter.dev/
