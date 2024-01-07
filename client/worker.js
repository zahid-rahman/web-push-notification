console.log("Service worker loaded...");
self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("push Received...");
  self.registration.showNotification(data.title, {
    body: 'Notified by Zahid Rahman',
    icon: 'https://zahid-rahman.netlify.app/static/media/profile_image.ed56833e.jpg'
  })
});
