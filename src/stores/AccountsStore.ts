import {defineStore} from "pinia";
import type {WalletDataStateAccount} from "@radixdlt/radix-dapp-toolkit";

export const useAccountsStore = defineStore({
    id: "Accounts",
    state: () => ({
        accounts: [] as WalletDataStateAccount[],
    }),
    getters: {},
    actions: {
        setAccounts(accounts: WalletDataStateAccount[]): void {
            this.accounts = accounts || [];
        },
    },
});
