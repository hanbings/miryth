# 使用Gradle发布项目到私有仓库

**通常情况下 使用 maven-publish 插件进行发布**



在 build.gradle 中添加 maven-publish 设置

```
task sourcesJar(type: Jar) {
        from sourceSets.main.allSource
        archiveClassifier.convention('sources')
        archiveClassifier.set('sources')
    }

    task javadocJar(type: Jar) {
        from javadoc
        archiveClassifier.convention('javadocs')
        archiveClassifier.set('javadocs')
    }

    publishing {
        repositories {
            maven {
                url = uri(project.findProperty("repository_root_url") ?: System.getenv("REPOSITORY_ROOT_URL")
                        + (project.version.toString().endsWith('dev') ? 'snapshots' : 'releases'))
                credentials {
                    username = project.findProperty("repository_user") ?: System.getenv("REPOSITORY_USER")
                    password = project.findProperty("repository_token") ?: System.getenv("REPOSITORY_TOKEN")
                }
            }
        }
        publications {
            mavenJava(MavenPublication) {
                artifact(jar)
                artifact(sourcesJar)
                artifact(javadocJar)
            }
        }
    }

    javadoc {
        options.addBooleanOption('html5', true)
        options.encoding('utf-8')
    }
```



在添加设置以前 应该先添加插件 添加完成后可能会出现划红线报错 只需要点击 gradle 小按钮同步设置即可

```
apply plugin: 'maven-publish'
```



像是

```
username = project.findProperty("repository_user") ?: System.getenv("REPOSITORY_USER")
```

这样的代码 是先使用 gradle 的 API 查找项目下的**配置文件**是否包含 repository_user 为**键值**的配置项 有则读取为用户名 没有则从**系统环境变量**中获取  REPOSITORY_USER 变量值 idea 会在启动的时候加载系统环境变量 所以添加在系统中后 大概率重启 idea 变量才会生效
