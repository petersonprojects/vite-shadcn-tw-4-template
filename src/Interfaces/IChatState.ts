import ChatWindowState from "./IChatWindowState";

export default interface ChatListState {
    chatList: Object[]
    status: string;
    error: string | null;
    cachedChats: ChatWindowState[]
}