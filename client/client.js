const publicVapidKey =
  "BN2iWqYnSdhXaR3LLoQE7WTlYscm3nn3LwhyhRjsV-1Psi3McBchBxlZAtRhF6aSC2hHzPab2QuMKGyuDStHMEA";

const button = document.querySelector("#push-btn");

// Registyer SW, Register Push, Send Push

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Notification Permission not granted");
  } else {
    // new Notification("Hello");
  }
}

button.addEventListener("click", (e) => {
  e.preventDefault();

  // check for service worker
  if ("serviceWorker" in navigator) {
    send().catch((error) => console.error(error));
  }

  async function send() {
    // Register service worker
    console.log("Registering service worker");
    const register = await navigator.serviceWorker.register("/worker.js", {
      scope: "/",
    });
    console.log("Service worker registered...");

    // Register push
    console.log("Registring push...");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    console.log("push registered...");

    // Send push notification
    console.log("sending push notification");
    await fetch("/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json",
      },
    });

    console.log("push sent...");
  }
  send();
});

requestNotificationPermission();
