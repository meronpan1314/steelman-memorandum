---
title: 04_Spring Bootとリクエスト処理
date: "2026-02-12"
---

## Spring Bootとは

Spring Bootは **APサーバーを内包した実行パッケージ**。
Tomcatをライブラリとして組み込み、簡単に起動できる。

---

## 起動時の構造

```
java -jar app.jar
 └─ Spring Boot
      └─ Embedded Tomcat
           └─ Application
```

---

## リクエスト処理の流れ

1. クライアントがHTTP送信
2. Tomcatが受信・スレッド割当
3. DispatcherServlet呼び出し
4. Controller実行
5. レスポンス生成
6. スレッド解放

---

## DispatcherServletの役割

* URLとControllerの対応付け
* 引数バインド
* 例外処理
* レスポンス変換

---

## パフォーマンスの本質

* 処理中はTomcatスレッドを占有
* 遅い処理 = スレッド圧迫

---

## まとめ

* Tomcat：入口・スレッド
* Spring：判断・制御
* 性能はスレッド解放速度で決まる
