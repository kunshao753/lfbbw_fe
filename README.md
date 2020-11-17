# volunteer-bottle志愿瓶
uni-app框架开发，此版本主导微信小程序
#目录结构
├──common                    # 全局样式，全局js，工具js等
├─components                 # 全局公用组件，uni-app官方组件等
├─pages                      # 所有页面源代码
|	├─component              # 页面内容组件
|   |   ├─tabbar             # 顶部tab切换
|   |   ├─viewall            # 点击查看全部/收起
|   |   ├─filter             # 下拉筛选
|   |   ├─schoolcell         # 学校信息列表
|   ├─tabBar                 # 底部tabBar所有页面
|	├─school                 # 院校优先填报相关页面
|	├─specialities           # 专业优先填报相关页面
├─platforms                  # 各个平台
├─static                     # 静态资源
|	└── images               # 图片资源
├─store                      # 全局 store管理
├─unpackage                  # 构建 打包相关
├─wxcomponents               # 微信自定义组件
├─App.vue                    # 入口页面
├─main.js                    # 入口文件 加载组件 初始化等
├─manifest                   # 基础配置 小程序appID配置等
├─uni.scss                   # uni-app内置的常用样式变量
└──pages                     # 所有页面path