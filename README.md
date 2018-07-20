### Agile Server

敏捷无限技术部通用的 、快速开发的、性能强劲的、功能齐全的 node 服务器解决方案。 

大家可以一起来完善它！

#### 项目背景：

* 通用业务高度重复

        在开发一个常规服务器业务的时候，我们能够发现，绝大部分接口，都是在进行数据库的增删改查操作，这是一个非常重复劳动，这里必须得到简化，以提高开发速度。

        开发中，我们队数据库的操作，分为两类：单表操作和多表操作。针对这两类常见业务，我们对其进行了封装和规范，提高其复用程度，提高其开发效率。

* 开发人员习惯不同

        一千个工程师，或许有一千种开发风格，很多时候，这些风格并没有好坏之分，只有喜好与否。而这种喜好，很多时候导致重复造轮子的情况发生。因此，统一其开发习惯，是一件提高效率的事情。

* 项目架构不合理，难以扩展

        小型项目中，扩展性的问题不必考虑太多，但是一旦项目到了一定的规模，就会非常的麻烦。比如，公用业务的调用问题；比如，用户的授权问题；比如，接口数量巨大导致的项目结构问题...等等，这些问题都需要去解决，并且需要一种可扩展的、稳定、简单的方式去解决。

针对以上这些问题，我们提出了这样的一个本解决方案，Agile Server：

* 复用

        高度复用关键代码，节省大量人力，并且提高其可靠性

* 简单

        以文件和文件夹来组织代码，直观、简单、易定位问题，也容易迁就工程师们的习惯

* 预定义规范

        针对常见的功能，考虑项目本身变的大而复杂的可能，做了非常合理的预定义配置：从项目结构，到功能设置...在此约定下，可以保证可持续开发，合理的预定义规范，可以保证代码的持久健壮性


#### 代码结构：

    -- config 配置文件
        -- auth 需要认证的 URL 的配置
        -- env 环境变量配置
        -- oss 阿里云的 OSS 的参数配置
        -- sequelize MySQL 数据库配置
        -- session 会话配置
        -- status 全局状态配置

    -- dao 数据操作方法，自带有基本方法，可自定义方法

    -- models 数据模型，将会同步到数据库

    -- router 映射地址，所有的 api 操作

    -- utils 插件和库
        -- cron 定时任务，注意引入即开启
        -- lib 各种库文件代码
        -- midware 自定义的 KOA 中间件，请注意开发格式
        -- service 抽象出来的公共服务，以求代码能够在多种场合被直接复用，比如：一段既可以在响应 HTTP 请求，也可以在定时任务中执行的代码，这样定时任务可以直接调用这个 service，而不用通过 HTTP 来调用这段代码；因此，service 应该是函数。注意：service 和 lib 的区别在于，lib 提供公共方法，而 service 则针对具体业务
        -- pre，router 的前置处理，比如，参数去除空值等公用方法
        -- after，router 的后置处理，比如，将一个包含唯一对象的数组转换成一个对象，或者对返回值进行处理操作

#### 运行启动：

    npm install

    npm start

    npm run pm2 （线上部署）

#### 技术框架：

    后端框架：KOA

    数据模型：Sequelize

    日志工具：Log4JS

#### 开发步骤：

    -- 1.定义 model，修改数据库字段定义，直接从以前的 model 文件复制修改即可；

    -- 2.定义 dao，直接复制一个基本的 dao 就好，甚至代码都不用动；如果有复杂数据库操作，需要单加方法；

    -- 3.定义 router 也就是 api 文件 URL，这里可能操作一个 dao，也可能操作好几个 dao；

#### DAO 详解：

    -- 1. 4个基本方法，增、删、改、查：add、delete、update、list

    -- 2. 4个高阶方法，求和、计数、自增、模糊搜索：sum、count、increment、search

    -- 3. 关联查表方法，一对多：list_include；一对一：list_with

    -- 4. 其他自定义方法，按照实际需求在每一个 model 对应的 dao中自由定制