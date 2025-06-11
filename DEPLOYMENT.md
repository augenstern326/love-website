# 爱情网站 Vercel 部署指导

## 项目概述
这是一个为您女朋友制作的浪漫网站，包含：
- 💕 浪漫的首页，带有在一起计时器
- 📅 课表页面，显示2024-2025学年第二学期课程安排
- 🎨 精美的响应式设计，支持桌面和移动设备

## 部署到 Vercel 的步骤

### 方法一：通过 Vercel CLI（推荐）

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **在项目目录中部署**
   ```bash
   cd love-website
   vercel
   ```

4. **按照提示操作**
   - 选择项目名称
   - 选择团队（如果有）
   - 确认部署设置

### 方法二：通过 Vercel 网站

1. **访问 Vercel 官网**
   - 前往 https://vercel.com
   - 使用 GitHub、GitLab 或 Bitbucket 账号登录

2. **上传项目**
   - 点击 "New Project"
   - 选择 "Import Git Repository" 或直接拖拽项目文件夹

3. **配置项目**
   - 项目名称：love-website
   - 框架预设：React
   - 构建命令：npm run build
   - 输出目录：dist

4. **部署**
   - 点击 "Deploy" 按钮
   - 等待构建完成

### 方法三：手动上传（最简单）

1. **准备文件**
   - 将整个 `love-website` 文件夹压缩为 ZIP 文件

2. **上传到 Vercel**
   - 登录 Vercel 控制台
   - 点击 "New Project"
   - 选择 "Upload" 选项
   - 上传 ZIP 文件

3. **配置设置**
   - 确保构建命令为：`npm run build`
   - 确保输出目录为：`dist`

## 重要文件说明

- `vercel.json` - Vercel 部署配置文件
- `package.json` - 项目依赖和脚本
- `src/` - 源代码目录
- `dist/` - 构建输出目录（部署后自动生成）

## 自定义域名（可选）

部署成功后，您可以：
1. 在 Vercel 控制台中找到您的项目
2. 进入 "Settings" > "Domains"
3. 添加自定义域名

## 注意事项

- 确保所有依赖都已正确安装
- 项目已经过本地测试，所有功能正常
- 响应式设计已优化，支持移动设备
- 计时器会自动从2025年6月6日晚上8点开始计算

## 技术特性

- ⚡ 使用 Vite 构建，加载速度快
- 🎨 Tailwind CSS 样式框架
- 📱 完全响应式设计
- 💖 自定义动画和交互效果
- 🔄 实时计时器更新

部署完成后，您将获得一个永久的 HTTPS 网址，可以随时访问这个爱情网站！

