import { Coin } from "./Coin";

export interface Wallet {
    user: string;
    coins: Coin[];   
}