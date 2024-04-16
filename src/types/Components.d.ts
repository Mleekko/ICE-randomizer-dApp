/* Common */
export declare type NavItem = {
    href: string;
    text: string;
};

export declare type Balance = {
    water: number;
    ice: number;
    tickets: number;
    ticketIds: string[];
    rarities: number[]; // 0-4 - ICE, green to purple; 5 - Water
}

declare type TxStatus = {
    error: string;
    success: string;
    message: string;
};
