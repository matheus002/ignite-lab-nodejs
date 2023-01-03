import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { Notification as RawNotification } from '@prisma/client'

export class PrismaNotificationMapper {
  static toPrisma( notification: Notification ) {
    return {
      id: notification.id,
      category: notification.category,
      recipientId: notification.recipientId,
      content: notification.content.value,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt
    }
  }

  static toDomain(raw: RawNotification): Notification {
    console.log(`Mapper: ${JSON.stringify(raw)}`)
    return new Notification({
      category: raw.category,
      content: new Content(raw.content),
      recipientId: raw.recipientId,
      readAt: raw.readAt,
      canceledAt: raw.canceledAt,
      createdAt: raw.createdAt,
    }, raw.id)
  }
}