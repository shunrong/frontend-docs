---
nav:
  title: 笔记
  path: /notes
group:
  title: 中枢-工程化
  order: 2
type:
  title: 包管理器
  order: 2
title: yarn 的核心命令
order: 11
---

# yarn 的核心命令

1. **初始化**

初始化：```yarn init [--yes/-y]```

2. **安装**

添加指定包：```yarn [global] add package-name [--dev/-D] [--exact/-E]```

安装package.json中的所有依赖：```yarn install [--production/--prod]```

3. **脚本和本地CLI**

运行脚本：```yarn run 脚本名``` 

> start、stop、test可以省略run

运行本地安装的CLI：```yarn run CLI名```

4. **查询**

查看bin目录：```yarn [global] bin```

查询包信息：```yarn info 包名 [子字段]```

列举已安装的依赖：```yarn [global] list [--depth=依赖深度]```

> yarn的list命令和npm的list不同，yarn输出的信息更加丰富，包括顶级目录结构、每个包的依赖版本号

5. **更新**

列举需要更新的包：```yarn outdated```

更新包：```yarn [global] upgrade [包名]```

6. **卸载**

卸载包：```yarn remove 包名```
