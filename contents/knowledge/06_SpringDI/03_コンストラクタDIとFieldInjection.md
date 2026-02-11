---
title: コンストラクタDIとField Injection
date: "2026-02-14"
---

## 1. コンストラクタDIが推奨される理由

-   必須依存関係を保証できる
-   finalが使える
-   テストが容易
-   循環参照を検知しやすい

``` java
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }
}
```

## 2. Field Injectionの問題点

``` java
@Autowired
private UserRepository repo;
```

-   依存関係が見えない
-   テストしにくい
-   finalが使えない
