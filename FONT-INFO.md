# NASALIZATION Font - Информация

## О шрифте

**NASALIZATION** - это футуристичный шрифт, вдохновленный знаменитым логотипом NASA "worm" 1975 года.

- **Автор:** Typodermic Fonts
- **Лицензия:** Free for personal and commercial use
- **Формат:** OpenType (.otf)
- **Стиль:** Космический, технологичный, геометрический

## Расположение

Шрифт находится в папке `/fonts/Nasalization Rg.otf`

## Подключение

Шрифт подключен через файл `/css/nasalization.css`:

```css
@font-face {
    font-family: 'Nasalization';
    src: url('../fonts/Nasalization Rg.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}
```

## Использование

Шрифт применяется для:
- Логотипа MARSIANS MCC
- Всех заголовков (h1-h6)
- Навигационного меню
- Hero-секции
- Названий секций
- Бейджей и лейблов

## Проверка работоспособности

1. Запустите локальный сервер:
   ```bash
   python3 -m http.server 8000
   ```

2. Откройте http://localhost:8000 в браузере

3. Откройте DevTools (F12) → Network → Fonts
   - Должен загрузиться `Nasalization Rg.otf`
   - Статус: 200 OK

4. Проверьте визуально - текст должен выглядеть футуристично и технологично

## Альтернативные варианты

Если возникают проблемы с OTF, можно конвертировать в WOFF2:
- Онлайн конвертер: https://cloudconvert.com/otf-to-woff2
- Или использовать fonttools: `pyftsubset`

## Источник

Шрифт скачан с: https://www.dafont.com/nasalization.font
