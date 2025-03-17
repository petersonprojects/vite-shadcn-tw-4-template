interface Message {
    id: string;
    message: string;
    userId: string;
    recipientId: string;
}

type MessageThread = Message[];

export default interface ChatWindowState {
    scrollPosition: Number;
    name: string;
    id: string;
    roomName: string;
    messages: MessageThread;
    shouldLoadMore: boolean | null;
    isLoadingInitial: boolean | null;
    isLoadingPrevious: boolean | null;
}