document.addEventListener("DOMContentLoaded", function() {
    M.AutoInit();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw2.js")
        .then(function() {
          console.log("service worker behasil dregistrasi");
        })
        .catch(function() {
          console.log("Registrasi sw gagal!");
        });
    } else {
      console.log("ada yg salah ni");
    }

    if ("Notification" in window) {
      Notification.requestPermission().then(function(response) {
        if (response == "denied") {
          console.log("fitur notifikasi tidak dijalankan");
          return;
        } else if (response == "default") {
          console.log("pengguna menutup kotak dialog permintaan ijin");
        }

        console.log("Fitur notifikasi diijinkan.");
      });
    }
    if ("PushManager" in window) {
      navigator.serviceWorker
        .getRegistration()
        .then(function(registration) {
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                "BOhoACl14WsTPwhNh8d3YCiu-ZlQVCse3Ol8RnuwykXJxb6-tw1XOqHR1TkIA1EsmyqEw_aFv0u1d6cOu4-HWoY"
              )
            })
            .then(function(subscribe) {
              console.log(
                "Berhasil subscribe dengan endpoint : ",
                subscribe.endpoint
              );
              console.log(
                "Berhasil subscribe dengan p256dh key : ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("p256dh"))
                  )
                )
              );
              console.log(
                "Berhasil melakukan subscribe dengan auth key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("auth"))
                  )
                )
              );
            })
            .catch(function(e) {
              console.log("Tidak dapat melakukan subscribe ", e.message);
            });
        });
    }
    function urlBase64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
  });