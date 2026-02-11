---
title: SpringとBean管理
date: "2026-02-14"
---

## 1. Beanとは

Springが管理するオブジェクトのことをBeanと呼びます。

## 2. Bean登録方法

-   @Component
-   @Service
-   @Repository

``` java
@Service
public class UserService { }
```

## 3. Bean生成タイミング

デフォルトはアプリ起動時に生成されます。

### 遅延初期化

``` java
@Lazy
```

## 4. スコープ

-   singleton（デフォルト）
-   prototype
-   request
-   session
