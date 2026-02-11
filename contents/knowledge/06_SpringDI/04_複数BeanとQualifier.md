---
title: 複数Beanと@Qualifier / @Primary
date: "2026-02-14"
---

## 1. 実装が複数ある場合

``` java
interface PaymentService { }
```

## 2. @Primary

デフォルトの実装を決める。

``` java
@Primary
@Service
class samplePaymentService implements PaymentService { }
```

## 3. @Qualifier

明示的に指定する。

``` java
public OrderService(@Qualifier("samplePaymentService") PaymentService service)
```
