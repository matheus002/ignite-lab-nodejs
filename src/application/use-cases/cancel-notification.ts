import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repositories/notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface CancelNotificationRequest {
  notificationId: string
} 

type CancelNotificationResponse = void;

@Injectable() 
export class CancelNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(request: CancelNotificationRequest
    ): Promise<CancelNotificationResponse> {
    const { notificationId } = request
    console.log(`Request ${request.notificationId}`)

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );
    // console.log(`Notification: ${notification.createdAt}`)

    if(!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    console.log(`Notification calceled: ${JSON.stringify(notification)}`)

    await this.notificationsRepository.save(notification)

  }
}