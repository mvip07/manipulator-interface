# Ozodov Mirabzal - Manipulation Interface

## Общая информация
Этот проект представляет собой веб-интерфейс для управления манипулятором в подземной лаборатории, разработанный Ozodov Mirabzal. Приложение построено с использованием React, Redux Toolkit, Material UI и других современных технологий. Оно позволяет визуализировать движение манипулятора, оптимизировать команды и сохранять историю операций в localStorage. Проект оптимизирован для работы без бэкенда, что делает его легким и удобным для локального использования. Анимации и графики добавляют интерактивности, демонстрируя процесс выполнения команд.

## Umumiy ma’lumot
Bu loyiha Ozodov Mirabzal tomonidan yaratilgan yer osti laboratoriyasida manipulyatorni boshqarish uchun mo‘ljallangan veb-interfeysdir. React, Redux Toolkit, Material UI va boshqa zamonaviy texnologiyalar asosida ishlab chiqilgan bo‘lib, manipulyatorning harakatlarini vizualizatsiya qilish, buyruqlarni optimallashtirish va operatsiyalar tarixini localStorage’da saqlash imkonini beradi. Backend’iz holda ishlaydigan bu loyiha oson va qulay bo‘lib, animatsiyalar va grafiklar interaktivlik qo‘shadi.

## Функциональные возможности
- **Авторизация**: Простая авторизация с логином и паролем (admin/admin), данные сохраняются в localStorage.
- **Ввод и оптимизация команд**: Поддержка команд (Л, П, В, Н, О, Б) с автоматической оптимизацией.
- **Анимации**: Визуализация движения манипулятора с плавными переходами, управляемая скоростью.
- **Графики**: Интерактивная сетка для отображения позиций образцов до и после выполнения команд.
- **История**: Сохранение истории команд с датой, временем и позициями образцов, доступное после перезагрузки страницы.

## Funksional imkoniyatlar
- **Avtorizatsiya**: Oddiy login va parol bilan kirish (admin/admin), ma’lumotlar localStorage’da saqlanadi.
- **Buyruqlar kiritish va optimallashtirish**: Buyruqlarni (Л, П, В, Н, О, Б) kiritish va avtomatik optimallashtirish.
- **Animatsiyalar**: Manipulyatorning harakatini silliq o‘tkazishlar bilan vizualizatsiya qilish, tezlikni boshqarish imkoni.
- **Grafiklar**: Buyruqlar bajarilishidan oldin va keyin namunalar pozitsiyalarini ko‘rsatish uchun interaktiv tarmoq.
- **Tarix**: Buyruqlar tarixi sana, vaqt va namunalar pozitsiyasi bilan saqlanadi, sahifa qayta yuklanganda ham ko‘rinadi.

## Установка и запуск
1. **Клонирование репозитория**:
   ```bash
   git clone https://github.com/mvip07/manipulator-interface.git
   cd manipulator-interface
   ```
2. **Установка зависимостей**:
   Убедитесь, что установлен Node.js (версия 16.x или выше) и Yarn. Затем выполните:
   ```bash
   yarn install
   ```
3. **Запуск проекта**:
   Для разработки используйте:
   ```bash
   yarn start
   ```
   Проект будет доступен на `http://localhost:3000`.
4. **Сборка для деплоя**:
   Для создания оптимизированной версии выполните:
   ```bash
   yarn build
   ```

## O‘rnatish va ishga tushirish
1. **Repozitoriyani klon qilish**:
   ```bash
   git clone https://github.com/mvip07/manipulator-interface.git
   cd manipulator-interface
   ```
2. **Qaramliklarni o‘rnatish**:
   Node.js (16.x yoki undan yuqori versiya) va Yarn o‘rnatilganligiga ishonch hosil qiling, keyin:
   ```bash
   yarn install
   ```
3. **Loyihani ishga tushirish**:
   Ishlab chiqish uchun:
   ```bash
   yarn start
   ```
   Loyiha `http://localhost:3000` manzilida ochiladi.
4. **Deploy uchun yig‘ish**:
   Optimallashtirilgan versiya uchun:
   ```bash
   yarn build
   ```

## Использование анимаций и графиков
- **Анимации**: Движение манипулятора отображается в реальном времени с помощью анимации, управляемой скоростью (5 кадров в секунду по умолчанию). Команды (Л, П, В, Н) вызывают плавные переходы.
- **Графики**: Интерактивная сетка 10x10 показывает позиции образцов до и после выполнения команд. Используется MUI Grid для визуализации.

## Foydalanish animatsiyalar va grafiklardan
- **Animatsiyalar**: Manipulyatorning harakati real vaqt rejimida animatsiya orqali ko‘rsatiladi, tezlik boshqariladi (standartda 5 kadr/sekund). Buyruqlarga (Л, П, В, Н) asoslangan silliq o‘tkazishlar mavjud.
- **Grafiklar**: 10x10 o‘lchamdagi interaktiv tarmoq namunalar pozitsiyalarini buyruqlar bajarilishidan oldin va keyin ko‘rsatadi. Vizualizatsiya uchun MUI Grid ishlatilgan.

## Разработка и вклад
- Код написан на TypeScript с использованием React и Redux.
- Для предложений или баг-репортов создайте issue на GitHub.
- Для вклада выполните fork репозитория, внесите изменения и отправьте pull request.

## Rivojlanish va hissa qo‘shish
- Kod TypeScript, React va Redux yordamida yozilgan.
- Takliflar yoki xatoliklar uchun GitHubda issue yarating.
- His sa qo‘shish uchun repozitoriyani fork qiling, o‘zgarishlarni kiritib, pull request yuboring.
