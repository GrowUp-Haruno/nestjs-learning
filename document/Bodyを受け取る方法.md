# Body を受け取る方法

ハンドラの各引数の先頭に`@Body`デコレータを記述し、引数の型を指定する

```ts:items.controler.ts
create(
  @Body('id') id: string,
  @Body('name') name: string,
  @Body('price') price: number,
  @Body('description') description: string,
): Item {}
```
