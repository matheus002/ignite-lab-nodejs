import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification";
import { NotificationRepository } from "@application/repositories/notification-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor( private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId
      }
    })

    if (!notification) { 
      return null
    }

    const mapp = PrismaNotificationMapper.toDomain(notification)

    console.log(`Mapper 23: ${JSON.stringify(mapp)}`)
    return mapp
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      }
    })
    return notifications.map(PrismaNotificationMapper.toDomain)
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      }
    })
    return count
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    
    await this.prisma.notification.create({
      data: raw,
    })
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    // console.log(`Date : ${new Date("2023-01-03T02:25:29.978Z")}`)
     console.log(`Notification Raw: ${JSON.stringify(raw)}`)
    // console.log(`Notification Raw: ${JSON.stringify(notification)}`)
    raw.createdAt = new Date(raw.createdAt)

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
   
}