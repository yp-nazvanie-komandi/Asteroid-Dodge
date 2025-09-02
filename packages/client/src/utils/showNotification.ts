type NotificationType = {
  body: string
  icon?: string
}

export default function showNotification(
  title: string,
  options: NotificationType
) {
  if (Notification.permission === 'granted') {
    new Notification(title, options)
  } else if (Notification.permission !== 'denied') {
    // Запросить разрешение, если еще не дано
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, options)
      }
    })
  }
}
