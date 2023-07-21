function notifications(window) {
  "use strict";
  // Кнопка подписки/отписки для push-уведомлений
  const pushElement = document.querySelector(".push");
  const pushImgElement = document.querySelector(".push__image");
  // Проверяем, поддерживаются ли push-уведомления
  function isPushSupported() {
    // Разрешил ли пользователь отправлять push-уведомления
    if (Notification.permission === "denied") {
      alert("Вы заблокировали push-уведомления");
      return;
    }
    //Поддерживаются ли push-уведомления браузером пользователя
    if (!("PushManager" in window)) {
      alert("Извините, push-уведомления не поддерживаются вашим браузером.");
      return;
    }
    // Если service-worker зарегистрирован, проверяем, подписан ли пользователь на push-уведомления
    navigator.serviceWorker.ready.then(function (registration) {
      registration.pushManager
        .getSubscription()
        .then(function (subscription) {
          if (subscription) {
            changePushStatus(true);
          } else {
            changePushStatus(false);
          }
        })
        .catch(function (error) {
          console.error("Возникла ошибка", error);
        });
    });
  }
  // Предлагаем пользователю подписаться на push-уведомления
  function subscribePush() {
    navigator.serviceWorker.ready.then(function (registration) {
      if (!registration.pushManager) {
        alert("push-уведомления не поддерживаются вашим браузером.");
        return false;
      }

      // Создаем функцию для конвертации данных из base64 в Uint8Array
      function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
          .replace(/\-/g, "+")
          .replace(/_/g, "/");
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
      }

      // Подписываемся
      registration.pushManager
        .subscribe({
          userVisibleOnly: true, // Всегда показывать уведомления
          applicationServerKey: urlBase64ToUint8Array(
            "BKE_DGQc088XNjFPpt1riP1wBfDhBB5YKx8yKV7q-ixRO_wlCMTEmuNgTayD9K77tzKAMU8JR_eolwvEqSQFe-0" // Руководство - https://web.dev/push-notifications-subscribing-a-user/ Публичный ключ - BKE_DGQc088XNjFPpt1riP1wBfDhBB5YKx8yKV7q-ixRO_wlCMTEmuNgTayD9K77tzKAMU8JR_eolwvEqSQFe-0 (отправляется в браузер и впоследствии сравнивается с секретным ключом, полученным в заголовке запроса с сервера). Секретный ключ - Piu3Jj-de2rGGIYPsDgotx7WSJx6r5MFhj9ju7obEF4. Сервис для генерации ключей - https://web-push-codelab.glitch.me/
          ),
        })
        .then(function (subscription) {
          alert("Успешно подписаны.");
          console.info("Подписаны на push-уведомления.");
          console.log(subscription);
          changePushStatus(true);

          return subscription;
        })
        .then((subscription) => {
          // Отправление данных подписки на сервер
          fetch(`http://localhost:3000/save-subscription/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
          })
            .then((response) => {
              console.log("response", response);
              if (!response.ok) {
                throw new Error("Bad status code from server.");
              }
              return response.json();
            })
            .then((responseData) => {
              if (!(responseData.data && responseData.data.success)) {
                throw new Error("Bad response from server.");
              }
            })
            .catch(function (error) {
              changePushStatus(false);
              console.error("Ошибка подписки на push-уведомления: ", error);
            });
        });
    });
  }
  // Отписка от push-уведомлений
  function unsubscribePush() {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.pushManager
        .getSubscription()
        .then(function (subscription) {
          // Если подписки нет, то выходим
          if (!subscription) {
            alert("Невозможно отписаться от push-уведомлений.");
            return;
          }
          // Непосредственно отписка
          subscription
            .unsubscribe()
            .then(function () {
              alert("Успешно отписаны.");
              console.info("push-уведомления отменены.");
              console.log(subscription);
              changePushStatus(false);
            })
            .catch(function (error) {
              console.error(error);
            });
        })
        .catch(function (error) {
          console.error("Не получилось отписаться от push-уведомлений.");
        });
    });
  }
  // Изменение статуса (подписан/не подписан)
  function changePushStatus(status) {
    pushElement.dataset.checked = status;
    pushElement.checked = status;
    if (status) {
      pushImgElement.src = "/img/push-on.png";
    } else {
      pushImgElement.src = "/img/push-off.png";
    }
  }

  // Обработка нажатия на кнопку подписки/отписки
  pushElement.addEventListener("click", function () {
    const isSubscribed = pushElement.dataset.checked === "true";
    if (isSubscribed) {
      unsubscribePush();
    } else {
      subscribePush();
    }
  });
  isPushSupported();
}
// Ненадёжное решение, которое позволяет дождаться отрисовки страницы, прежде чем выполнить скрипт
setTimeout(function () {
  notifications(window);
}, 1000);
