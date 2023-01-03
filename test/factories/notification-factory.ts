import { Content } from "@application/entities/content";
import { Notification, NotificationPros } from "@application/entities/notification";

type Override = Partial<NotificationPros>

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('New friendership request received!'),
    recipientId: 'recipient-2',
    ...override
});
}