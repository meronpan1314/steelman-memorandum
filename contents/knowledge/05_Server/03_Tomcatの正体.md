---
title: 03_Tomcatの正体
date: "2026-02-11"
---

## Tomcatとは何か

Tomcatは **Java製のServletコンテナ** であり、
HTTPリクエストを受け取り、Servlet仕様に従ってJavaコードを実行する。

---

## Tomcatの責務

* ポート待ち受け
* HTTP解析
* スレッド管理
* Servlet呼び出し

---

## Tomcatは何を知らないか

* 業務ロジックの意味
* Controllerの存在
* DBの中身

---

## WARとの関係

```
[ EC2 ]
  └─ Tomcat
       └─ WAR
            └─ Servlet / Spring
```

* WARはTomcatにデプロイされる前提の形式
* TomcatがServletを起動する

---

## 重要な事実

> 1リクエスト = 1 Tomcatスレッド

* スレッド枯渇が性能劣化の主因

---

## まとめ

* Tomcatは入口と実行基盤
* 賢さはないが重要
