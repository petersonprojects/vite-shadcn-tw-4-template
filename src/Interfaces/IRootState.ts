import NotificationState from "./INotificationsState";
import UserState from "./IUserState";
import ChatState from "./IChatState"

export default interface RootState {
    user: UserState;
    notifications: NotificationState;
    chat: ChatState;
}