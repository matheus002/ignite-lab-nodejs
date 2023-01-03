import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repositories/notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface CountRecipientNotificationRequest {
  recipientId: string
} 

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable() 
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(request: CountRecipientNotificationRequest
    ): Promise<CountRecipientNotificationResponse> {
    const { recipientId } = request

    const count = await this.notificationsRepository.countManyByRecipientId(recipientId)

   return {
    count,
   }

  }
}