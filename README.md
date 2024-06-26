
# Демонстрационная версия фронтенда сайта онлайн настольных игр

*https://the-box-of-board-games.fun*

## Описание всего проекта

1. Frontend
2. Backend
3. Структура проекта

</br>

___
___
### Frontend

![react](https://img.shields.io/badge/React-gray?logo=react&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-gray?logo=typescript&logoColor=white)
![vite](https://img.shields.io/badge/Vite-gray?logo=vite&logoColor=white)
![zustand](https://img.shields.io/badge/Zustand-gray?logo=zustand&logoColor=white)

![axios](https://img.shields.io/badge/Axios-gray?logo=axios&logoColor=white)
![websocket](https://img.shields.io/badge/WebSocket_(socket.io)-gray?logo=socket.io&logoColor=white)
![vitest](https://img.shields.io/badge/Vitest-gray?logo=vitest&logoColor=white)
![testing-library](https://img.shields.io/badge/Testing--library-gray?logo=testing-library&logoColor=white)
![docker](https://img.shields.io/badge/docker-gray?logo=docker&logoColor=white)
![nginx](https://img.shields.io/badge/nginx-gray?logo=nginx&logoColor=white)

___
**Начало**

На начальных этапах разработки использовал Redux Toolkit.</br>
Затем переписал на Zustand, т.к. для моих задач Redux казался слишком нагроможденным

Когда структура папок разрослась я переписал фронтенд на FSD архитектуру

Периодически проводил code review, т.к. набирался опыт и приходилось переписывать некоторые части сайта

___
**Функционал сайта**

- Регистрация/Авторизация</br>
  ( при регистрации отправляется письмо на почту с кодом активации )
  - По почте и паролю через форму
  - С помощью OAuth через Яндекс или ВКонтакте

- Боковая панель
  - общий чат</br>
  - список друзей и их активность

- Домашняя страница
  - Список открытых активных комнат
  - Фильтр комнат

- Страница ежедневных заданий
  - Каждый день пользователи получают задания для каждой игры</br>
    За задания пользователи могут получить опыт и внутреннюю валюту

- Страница новостей
  - Админинистратор может добавлять новости

- Страница магазина
  - Можно купить временную подписку,</br>
    чтобы получить доступ к дополнительному функционалу</br>
  - Можно купить игры
  - Можно купить различные предметы для игр

- Вкладка с уведомлениями

- Страница профиля
  - Главная вкладка
    - Смена аватара
    - Смена никнейма
    - Доступные игры
    - Доступные предметы для игр
    - Коммнетарии от других игроков
  - Вкладка со статистикой
    - Общая статистика
    - Статистика по каждой игре ( доступна только с подпиской )
  - Вкладка с настройками профиля
    - Смена почты
    - Смена пароля
    - Авторизации через OAuth сервисы
    - Подключение двухфакторной аутентификации
    - Настройка уведомлений
    - Дополнительные настройки</br>
      Например:</br>
      разрешение на приглашения в лобби,</br>
      разрешение заявок в друзья,</br>
      разрешение оставлять комментарии в профиле

- Страница жалоб и предложений
  - Форма отправки найденной ошибки или предложения идеи
  - Список отправленных репортов другими пользователями</br>
    С пометками и комментариями разработчика

- Страница профиля другого игрока
  - Главная вкладка</br>
    Кнопки добавить в друзья, жалоба и заблокировать</br>
    Форма отправки комментария
  - Вкладка со статистикой

- Страница комнаты
  - Выбор игры и количества игроков
  - Настройки игры
  - Если создана открытая комната, то она появится на домашней странице и другие пользователи смогут присоединиться
  - Кнопки удалить игрока из комнаты, передать хоста и пригласить игрока

- Игры</br>
  На данный момент готовы 2 игры
    - Монополия
    - Лабиринт с медведем

- Администратор
  - Возможность удалять сообщения в чате и временно запретить отправку сообщений пользователю
  - Публикация новостей
  - Доступ к панели администратора
  - Возможность оставлять комментарии на странице жалоб и предложений и менять статус репорта

___
**Дополнительно**

Frontend собирается в docker контейнер вместе с nginx

Настроено CI/CD через GitHub Actions
  1. прогоняются тесты
  2. собирается образ и сохраняется в GitHub Container Registry
  3. Подкючается по SSH к VPS и скачивается обновленная версия сайта

Поработал над SEO и подключил Яндекс метрику

Добавил метатэги для подгрузки описания при отправке ссылки в мессенджерах 

___
Написал на gulp конвертер изображений в webp формат.</br>
Т.к. нужно было оптимизировать много картинок для игр, я принял решение написать свой для удобства

</br>

___
___
### Backend

![node](https://img.shields.io/badge/Node-gray?logoColor=white&logo=node.js)
![express](https://img.shields.io/badge/Express-gray?logoColor=white&logo=express)
![typescript](https://img.shields.io/badge/TypeScript-gray?logoColor=white&logo=typescript)
![webpack](https://img.shields.io/badge/Webpack-gray?logoColor=white&logo=webpack)
![mongo](https://img.shields.io/badge/MongoDB_(mongoose)-gray?logoColor=white&logo=mongoDB)

![axios](https://img.shields.io/badge/Axios-gray?logoColor=white&logo=axios)
![websocket](https://img.shields.io/badge/WebSocket_(socket.io)-gray?logoColor=white&logo=socket.io)
![docker](https://img.shields.io/badge/docker-gray?logoColor=white&logo=docker)
![nginx](https://img.shields.io/badge/nginx-gray?logoColor=white&logo=nginx)
![jwt](https://img.shields.io/badge/JWT-gray)
![rest](https://img.shields.io/badge/REST_API-gray?logoColor=white&logo=node)

___
**Начало**

Изначально база данных была PostgreSQL</br>
Затем переписал бэкенд под Mongoose

Архетиктура</br>
http endpoint -> router -> controller -> service</br>
websocket endpoint -> wsevent -> service

___
**Функционал**

- Регистрация/Авторизация реализована с помощью JWT
- запросы по HTTP
  - Регистрация / Авторизация / Перевыдача токена
  - Отправка и проверка кода активации аккаунта
  - Смена пароля
  - OAuth
- запросы по WebSocket
  - api запросы</br>
    чат, активность друзей, получение данных профиля, покупки и тд
  - функционал администратора
  - функционал комнат
  - игры

___
**Дополнительно**

Email письма генерируются с помощью библиотеки React Email

</br>

___
___
## Структура проекта

Сайт лежит на VPS

На машине настроен nginx, который проксирует запросы по endpoint'ам на нужный докер контейнер

___
Сплошная линия - HTTP</br>
Пунктирная линия - WebSocket

```mermaid
flowchart TB
node1(Client)
node2(nginx)
node3(Main Service)
node4(MongoDB)
node5(Games Proxy Service)
node6(... Games Services ...)

node1 <--> node2 <--> node3
node1 <.-> node2 <.-> node3

node3 --- node4
node3 <--> node5

node2 <.-> node6

node5 <--> node6

subgraph Frontend
node1
end
subgraph Backend
node2
node3
node4
node5
node6
end
```