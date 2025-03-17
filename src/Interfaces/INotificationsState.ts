// type for single notification
export default interface NotificationState {
    // recipientId: string;
    // type: string;
    // content: string;
    // isRead: boolean;
    notifications: Object[]
    status: string;
    error: string | null;
}