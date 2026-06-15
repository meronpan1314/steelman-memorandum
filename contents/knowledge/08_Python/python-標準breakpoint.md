---
title: Python標準のbreakpoint
date: "2026-04-14"
tags: ["python"]
---

## 結論

`breakpoint()` は、Python標準で使えるデバッグ用の関数である。

コードの途中に置くと、その場所で実行を一時停止し、変数の中身を確認したり、1行ずつ処理を進めたりできる。

内部的には、標準デバッガである `pdb` を起動する。

---

## 1. breakpointとは何か

`breakpoint()` は、Python 3.7から追加された組み込み関数。

従来は以下のように書いていた。

```python
import pdb

pdb.set_trace()
```

これを短く書けるようにしたものが `breakpoint()`。

```python
breakpoint()
```

つまり、`breakpoint()` は「ここで処理を止めて、調査モードに入る」という目印である。

---

## 2. 基本的な使い方

調査したい場所に `breakpoint()` を置く。

```python
def calculate_total(price, quantity):
    subtotal = price * quantity
    breakpoint()
    tax = subtotal * 0.1
    return subtotal + tax

result = calculate_total(1000, 3)
print(result)
```

このコードを実行すると、`breakpoint()` の行で処理が止まる。

その時点で以下のような確認ができる。

```python
subtotal
price
quantity
```

実行中の変数をその場で確認できるのが大きな利点。

---

## 3. よく使うpdbコマンド

`breakpoint()` で止まると、ターミナルがデバッガの入力待ちになる。

よく使うコマンドは以下。

| コマンド | 意味 |
| --- | --- |
| `n` | 次の行へ進む |
| `s` | 関数の中に入る |
| `c` | 次のブレークポイントまで実行を続ける |
| `l` | 現在位置周辺のコードを表示する |
| `p 変数名` | 変数の値を表示する |
| `q` | デバッグを終了する |

例：

```text
(Pdb) p subtotal
3000

(Pdb) n

(Pdb) c
```

---

## 4. printデバッグとの違い

### ■ printデバッグ

```python
print(subtotal)
print(tax)
```

- 手軽
- ログとして残しやすい
- 消し忘れが起きやすい
- 確認したい値が増えるたびにコードを書き換える必要がある

### ■ breakpoint

```python
breakpoint()
```

- その場で自由に変数を確認できる
- 1行ずつ実行できる
- 関数の中にも入れる
- 本番コードに残すと処理が止まるため危険

「とりあえず値を1つ見たい」なら `print`。
「処理の流れごと追いたい」なら `breakpoint()` が向いている。

---

## 5. 実務で便利な場面

### ■ 条件分岐の原因を調べたいとき

```python
if user.is_active:
    breakpoint()
    send_mail(user)
```

なぜこの分岐に入ったのかを、その場で確認できる。

### ■ ループ中の特定データを見たいとき

```python
for user in users:
    if user.id == target_id:
        breakpoint()
```

大量データの中から、特定条件のときだけ止められる。

### ■ 例外の直前を見たいとき

```python
def divide(a, b):
    breakpoint()
    return a / b
```

例外が起きる直前の引数や状態を確認できる。

---

## 6. 無効化する方法

環境変数 `PYTHONBREAKPOINT` を使うと、`breakpoint()` の動作を制御できる。

### ■ breakpointを無効化する

```bash
PYTHONBREAKPOINT=0 python app.py
```

この場合、コードに `breakpoint()` が残っていても何もしない。

### ■ 別のデバッガを使う

```bash
PYTHONBREAKPOINT=ipdb.set_trace python app.py
```

`ipdb` など、別のデバッガに差し替えることもできる。

---

## 7. 注意点

### ■ 本番コードに残さない

`breakpoint()` が実行されると処理が停止する。

Webアプリやバッチ処理に残すと、処理がそこで止まってしまう。

### ■ コミット前に確認する

コミット前に以下のような検索をしておくとよい。

```bash
rg 'breakpoint\('
```

### ■ 標準入力がない環境では使いにくい

Docker、CI、バックグラウンドジョブなど、対話入力できない環境では扱いづらい。

---

## 8. まとめ

- `breakpoint()` はPython標準のデバッグ用関数
- 実行を一時停止して、その場で変数や処理の流れを確認できる
- 内部的には `pdb` を起動する
- `print` より深く調査したいときに便利
- 本番コードやコミットに残さないよう注意する
