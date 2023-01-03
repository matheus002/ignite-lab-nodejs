import { Content } from "@application/entities/content"
import { Notification } from "@application/entities/notification"
import { NotificationRepository } from "@application/repositories/notification-repository"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification"
import { CountRecipientNotifications } from "./count-recipient-notifications"
import { NotificationNotFound } from "./errors/notification-not-found"
import { GetRecipientNotifications } from "./get-recipient-notifications"
import { SendNotification } from "./send-notification"

 describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository)

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1'})
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1'})
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2'})
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1'
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(expect.arrayContaining([ 
      expect.objectContaining({ recipientId: 'recipient-1'}),
      expect.objectContaining({ recipientId: 'recipient-1'})
    ]))

  })
 })