export interface InsertMessageRequest {
  connectionId: string;
  senderId: string;
  senderEmail: string;
  receiverEmail: string;
  receiverId: string;
  text: string;
  timestamp: number;
}
