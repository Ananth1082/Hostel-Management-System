interface NOTIFICATION {
  id: number;
  title: string;
  message: string;
  senderName: string;
  senderEmail:string;
  recipientName: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type { NOTIFICATION };
