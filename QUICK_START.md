# 🚀 快速开始 - 5 分钟部署清单

## ✅ 复用到新项目的步骤

### 第 1 步：修改配置（2 分钟）

#### 选项 A：自动化脚本（推荐）

```bash
# 1. 编辑配置脚本
vim setup-deployment.sh

# 2. 修改这些变量（在 "配置区域" 部分）
NEW_PROJECT_NAME="your-project-name"
NEW_GITHUB_REPO="username/your-repo"
NEW_ACR_REGION="cn-chengdu"
NEW_ACR_NAMESPACE="your-namespace"
NEW_DOMAIN="your-domain.com"

# 3. 运行脚本
bash setup-deployment.sh
```

#### 选项 B：手动修改

编辑 `.github/workflows/deploy.yml` 顶部：

```yaml
env:
  PROJECT_NAME: your-project-name # 改这里
  GITHUB_REPO: username/your-repo # 改这里
  ACR_REGION: cn-chengdu # 改这里（可选）
  ACR_NAMESPACE: your-namespace # 改这里
  # ... 其他通常不需要改
```

编辑 `deployment.yaml`，全局替换：

- `portal-task-web` → `your-project-name`
- `task.tt829.cn` → `your-domain.com`

---

### 第 2 步：配置 GitHub Secrets（2 分钟）

进入 GitHub 仓库：`Settings` → `Secrets and variables` → `Actions` → `New repository secret`

**必需配置：**

| Secret 名称         | 值                | 获取方式                               |
| ------------------- | ----------------- | -------------------------------------- |
| `ALICLOUD_USERNAME` | 阿里云 ACR 用户名 | 阿里云控制台 → 容器镜像服务 → 访问凭证 |
| `ALICLOUD_PASSWORD` | 阿里云 ACR 密码   | 同上                                   |
| `KUBECONFIG`        | K8s 配置内容      | 运行：`cat ~/.kube/config`             |

**可选配置（根据项目需求）：**

| Secret 名称                      | 说明                   |
| -------------------------------- | ---------------------- |
| `SUPABASE_POSTGRES_DATABASE_URL` | 数据库连接（构建时用） |
| `SUPABASE_POSTGRES_DIRECT_URL`   | 数据库直连（构建时用） |
| `SSH_PRIVATE_KEY`                | SSH 私钥（私有仓库用） |

---

### 第 3 步：准备云资源（1 分钟检查）

#### 阿里云 ACR

- [ ] 开通容器镜像服务
- [ ] 创建命名空间（如 `mycompany`）
- [ ] 获取访问凭证

#### Kubernetes 集群

- [ ] 集群可访问（`kubectl cluster-info`）
- [ ] 已安装 nginx-ingress-controller
- [ ] 已安装 cert-manager（用于 HTTPS）

#### 域名

- [ ] DNS 已解析到 K8s Ingress IP

---

### 第 4 步：部署！（30 秒）

```bash
git add .
git commit -m "feat: setup deployment"
git push origin main
```

✅ **完成！**

查看部署进度：

```
https://github.com/{username}/{repo}/actions
```

---

## 🎯 一键检查命令

```bash
# 检查阿里云 ACR 登录
docker login registry.cn-chengdu.aliyuncs.com -u <USERNAME> -p <PASSWORD>

# 检查 K8s 集群
kubectl cluster-info
kubectl get nodes

# 检查 Ingress
kubectl get ingress

# 检查域名解析
nslookup your-domain.com
```

---

## 📊 配置对照表

### 当前配置 → 新项目配置

| 项目         | 当前值                        | 修改为               |
| ------------ | ----------------------------- | -------------------- |
| 项目名       | `portal-task-web`             | `your-project-name`  |
| GitHub 仓库  | `tt472625987/portal-task-web` | `username/your-repo` |
| ACR 命名空间 | `ray321`                      | `your-namespace`     |
| 域名         | `task.tt829.cn`               | `your-domain.com`    |
| 端口         | `3000`                        | 根据项目调整         |

---

## 🐛 快速故障排查

### 问题 1：镜像推送失败

```bash
# 检查 ACR 凭证
echo $ALICLOUD_USERNAME
echo $ALICLOUD_PASSWORD

# 手动登录测试
docker login registry.cn-chengdu.aliyuncs.com
```

### 问题 2：K8s 部署失败

```bash
# 查看 Pod 状态
kubectl get pods

# 查看详细日志
kubectl logs -f deployment/your-project-deployment

# 查看事件
kubectl get events --sort-by='.lastTimestamp'
```

### 问题 3：域名无法访问

```bash
# 检查 Ingress
kubectl get ingress
kubectl describe ingress your-project-ingress

# 检查证书
kubectl get certificates

# 检查 DNS
nslookup your-domain.com
```

---

## 📚 详细文档

需要更多信息？查看：

- 📖 [完整部署指南](DEPLOYMENT_GUIDE.md) - 总览和详细说明
- 📝 [配置说明](DEPLOYMENT_CONFIG.md) - 每个配置项的详细解释
- 🔍 [变量参考](VARIABLES.md) - 所有变量的快速查找表
- 🏗️ [架构说明](DEPLOYMENT_ARCHITECTURE.md) - 工作原理和架构图

---

## 💡 提示

1. **首次部署可能较慢**：Docker 镜像构建需要 5-10 分钟
2. **后续部署很快**：有缓存后只需 2-3 分钟
3. **零停机部署**：滚动更新策略，用户无感知
4. **自动回滚**：部署失败自动恢复到上一版本

---

## ✅ 成功标志

部署成功后，你应该看到：

### GitHub Actions

```
✅ Build & Push Docker Image
✅ Deploy to Kubernetes
```

### Kubernetes

```bash
$ kubectl get pods
NAME                                    READY   STATUS    RESTARTS   AGE
your-project-deployment-xxxx-yyyy       1/1     Running   0          2m
your-project-deployment-xxxx-zzzz       1/1     Running   0          2m
```

### 浏览器

访问 `https://your-domain.com` 应该看到你的应用 🎉

---

**祝你部署顺利！** 🚀

有问题？查看 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) 或提交 Issue。
