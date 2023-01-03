import { Content } from "@application/entities/content"
import { Notification } from "@application/entities/notification"
import { NotificationRepository } from "@application/repositories/notification-repository"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification"
import { CountRecipientNotifications } from "./count-recipient-notifications"
import { NotificationNotFound } from "./errors/notification-not-found"
import { SendNotification } from "./send-notification"

 describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository)

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1'})
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1'})
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2'})
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1'
    })

    expect(count).toEqual(2)

  })
 })