---
title: DIとAOPとトランザクション
date: "2026-02-14"
---

## 1. AOPとは

ログ、トランザクション、セキュリティなどの共通処理を分離する仕組み。

## 2. Proxyの仕組み

SpringはBeanの代わりにProxyを注入します。

    Controller → Proxy → Service

## 3. @Transactionalの動き

1.  Proxyが呼ばれる
2.  トランザクション開始
3.  本体実行
4.  commit / rollback

## 4. 注意点

同一クラス内メソッド呼び出しではAOPが効かない。
