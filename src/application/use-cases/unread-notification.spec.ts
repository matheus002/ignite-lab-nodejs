import { Content } from "@application/entities/content"
import { Notification } from "@application/entities/notification"
import { NotificationRepository } from "@application/repositories/notification-repository"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification"
import { NotificationNotFound } from "./errors/notification-not-found"
import { UnreadNotification } from "./unread-notification"

 describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(notificationsRepository)

    const notification = makeNotification({ readAt: new Date()});

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].readAt).toBeNull()

  })

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(notificationsRepository)

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
 })