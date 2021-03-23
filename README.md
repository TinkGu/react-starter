# 脚手架

React + Webpack + TypeScript

支持代码分割、动态加载页面、hmr 热加载。

# 项目启动（本地开发）

```bash
npm install

# 编译 dll(只需要编译一次)
npm run dll:dev

# 项目启动
npm run start
```

# 生产部署

```bash
# 编译 dll 文件
npm run dll

# 生产代码
npm run release
```

# 项目结构

```
.
├── README.md
├── babel.config.js
├── build
│   ├── index.html
│   ├── webpack-common
│   ├── webpack.config.analyzer.js
│   ├── webpack.config.base.js
│   ├── webpack.config.dev.js
│   ├── webpack.config.dll.js
│   └── webpack.config.prod.js
├── dist
│   └── lib
├── jsconfig.json
├── package.json
├── postcss.config.js
├── tsconfig.json
└── src
    ├── App.tsx     # 主入口
    ├── Routes.js   # 页面路由配置
    ├── components  # 公共 UI 组件
    ├── containers  # 公共业务组件
    ├── services    # 接口描述
    ├── constants   # 常量
    ├── pages       # 页面
    ├── states      # 公共状态
    ├── store
    └── utils       # 工具代码
```

# 页面组织

```
.
└── xx-page
    ├── index.tsx   # 页面入口
    ├── main.tsx    # 页面实际代码
    ├── styles.scss # 页面样式
    ├── state       # 页面特有状态数据
    ├── components  # 页面特有组件
    ├── controllers # 页面对应接口处理、状态处理
    ├── constants   # 常量
    └── utils       # 页面特有工具代码
```

# 规范整理

```bash
文件名、文件夹: 小写 中划线 eg: home-page

内　容: class 大驼峰, eg: TestComponent

注　释:
  方法前注释: /* note something */
  函数内注释: // note something
```
