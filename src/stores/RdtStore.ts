import {defineStore} from "pinia";
import {DataRequestBuilder, RadixDappToolkit} from "@radixdlt/radix-dapp-toolkit";
import {useAccountsStore} from "@/stores/AccountsStore";
import {Config} from "@/common/config";

export const useRdtStore = defineStore({
    id: "RDT",
    state: () => ({
        rdt: null as RadixDappToolkit | null,
    }),
    getters: {},
    actions: {
        initRdt(): void {
            const rdt = RadixDappToolkit({
                dAppDefinitionAddress: Config.dapp_definition,
                networkId: Config.network,
                applicationName: "ICE Randomizer",
                applicationVersion: "0.1.0",
            });
            this.rdt = rdt;
            rdt.walletApi.setRequestData(DataRequestBuilder.accounts().atLeast(1));

            rdt.walletApi.walletData$.subscribe((state) => {
                console.log(state);
                let accounts = (state && state.accounts) || [];
                useAccountsStore().setAccounts(accounts);
            })
            // rdt.walletApi.getWalletData
            rdt.buttonApi.setTheme("white");
        }
    },

});
