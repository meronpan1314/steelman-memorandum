---
title: O/Rマッパー
date: "2026-04-17"
tags: ["db", "orm"]
---

## 結論

O/Rマッパー（ORM）は、オブジェクトとリレーショナルデータベースの表を対応付ける仕組み。

SQLを直接たくさん書かなくても、プログラム上のオブジェクトとしてDBデータを扱えるようにする。

---

## 1. O/Rとは何か

O/Rは以下の略。

- Object
- Relational

つまり「オブジェクト」と「リレーショナルDB」の対応関係を意味する。

```text
Userクラス       usersテーブル
---------       ------------
id        ←→    id
name      ←→    name
email     ←→    email
```

---

## 2. ORMがない場合

SQLを書いて、結果を自分でオブジェクトに詰め替える。

```java
ResultSet rs = statement.executeQuery("select * from users");

User user = new User();
user.setId(rs.getLong("id"));
user.setName(rs.getString("name"));
```

この詰め替え処理が増えると、コードが冗長になる。

---

## 3. ORMがある場合

ORMを使うと、DBの行をオブジェクトとして扱える。

```java
User user = userRepository.findById(1L);
```

裏側ではSQLが実行されるが、アプリ側はオブジェクト操作として書ける。

---

## 4. メリット

- SQLの記述量を減らせる
- オブジェクト指向のコードと相性がよい
- CRUD処理を定型化できる
- テーブルとクラスの対応が見えやすい

---

## 5. 注意点

ORMはSQLを完全に不要にするものではない。

特に以下は理解しておく必要がある。

- 実際にどんなSQLが発行されるか
- N+1問題
- トランザクション境界
- 遅延読み込み
- 複雑な集計SQL

ORMを使っていても、DBとSQLの知識は必要。

---

## 6. まとめ

- ORMはオブジェクトとDBテーブルを対応付ける仕組み
- DBデータをオブジェクトとして扱いやすくする
- CRUD処理を簡潔に書ける
- 裏側のSQLを理解しないと性能問題が起きる
