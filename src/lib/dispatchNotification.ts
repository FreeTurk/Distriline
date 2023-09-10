export  function releaseNotification(type: "error" | "alert" | "success" | "loading", title: string, body: string, fading: boolean) {
  const newevent = new CustomEvent("notificationIncoming", {
    detail: {
      type: type,
      body: body,
      title: title,
      fading: fading
    }
  })

  document.dispatchEvent(newevent)
}

export function deleteNotification(key: number) {
  const newevent = new CustomEvent("deleteNotification", {
    detail: {
      id: key
    }
  })


  document.dispatchEvent(newevent)
}