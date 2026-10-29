# SABR — прототип сайта магазина

Статичный сайт без сборки: `index.html` (о магазине), `catalog.html` (каталог).

## Файлы
- `products.js` — товары. Поля: `id, cat ('Обувь'|'Одежда'), brand, name, sub, price (null = «по запросу»), sizes, pre (размеры под заказ), icon, img, imgs (несколько фото), left (остаток, показывается при ≤3), isNew, demo`.
- `fonts.js` — шрифты (`?font=A|B|C|D|O`) и тема (светлая/тёмная).
- `manifest.webmanifest`, `sw.js`, `icon-*.png` — установка как приложение (работает только по https).

## Что хранится в браузере (localStorage)
`sabr.sizes` размеры · `sabr.viewed` просмотры · `sabr.cart` корзина · `sabr.fav` избранное · `sabr.recent` недавние запросы · `sabr.theme` тема · `sabr.font` шрифт.

## Ссылка на товар
`catalog.html#p=<id>` открывает карточку товара.
