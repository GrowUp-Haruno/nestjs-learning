# Param を受け取る方法

`@Get`デコレータの引数に`":パラメータ名"`を記述し、
ハンドラ側の引数の先頭に`@Param("パラメータ名")`を引数の型を指定する
`:`のつける場所に注意すること

```ts:items.controler.ts
@Get(":id")
findById(
  @Param('id') id: string,
): Item {}
```
