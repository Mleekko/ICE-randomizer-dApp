import {defineStore} from "pinia";
import type {WalletDataStateAccount} from "@radixdlt/radix-dapp-toolkit";
import {useLocalStorage} from "@vueuse/core";
import type {UnwrapRef} from "vue";

export const useAccountsStore = defineStore({
    id: "Accounts",
    state: () => ({
        accounts: [] as WalletDataStateAccount[],
        selectedAccount: useLocalStorage("Accounts.selected", ""),
    }),
    getters: {},
    actions: {
        setAccounts(accounts: WalletDataStateAccount[]): void {
            this.accounts = accounts || [];
        },
        setSelectedAccount(account: string): void {
            this.selectedAccount = account || "";
        },
        subscribeSelectedAccount(callback: (state: UnwrapRef<{ selectedAccount: string }>) => void): void {
            this.$subscribe((mutation, state) => {
                callback(state);
            });
        },
    },
});
