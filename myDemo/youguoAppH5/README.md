# 启动方式
## 依赖包安装 npm install
## 前端测试环境 npm run dev
## 服务器端正式与测试环境 npm run build 打包后会出现一个dist文件夹
### 备注：项目上传git请先打包dist文件，运营要求
src/assets文件存储静态文件
assets/js文件存储公共调用js,模块整合调用js，axios的config文件，公共filter文件
components文件存储相关调用模块
views文件存储相关SPA文件