export interface BasePlayer {
    accountId:  string;
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;
    gameCoin: number;
    isOnline: boolean;
}