<template>
    <main>
        <div class="container main-page d-flex">
            <div>
                <div class="row pb-4">
                    <h4 class="page-name">
                        ICE Randomizer
                    </h4>
                </div>
                <div class="row">
                    <div v-if="accounts.length > 0">
                        <select v-model="selectedAccount" class="form-select mb-3">
                            <option v-for="account in accounts" v-bind:key="account.address" :value="account.address">
                                <span v-for="accBalance in [getBalance(account.address)]">
                                    <span>{{ Strings.displayAddress(account.address) }}</span>
                                    <span> ({{ account.label }}) &nbsp;&nbsp;&nbsp;
                                        <span v-if="accBalance">[W: {{floor(accBalance.water)}} / I: {{accBalance.ice}} / T: {{accBalance.tickets}} ]</span>
                                    </span>
                                </span>
                            </option>
                        </select>

                        <div class="text-center">
                            <div class="row pb-2">
                                <span>Your Balances</span>


                                <div class="col">
                                    &nbsp;
                                </div>
                                <div class="col col-6">
                                    <div class="p-3 border bg-light">
                                        {{ balance ? balance.ice : '?' }} ICE <span class="float-end"></span>
                                    </div>
                                </div>
                                <div class="col">
                                    &nbsp;
                                </div>
                            </div>
                            <div class="row gx-5">
                                <div class="col">
                                    <div class="p-3 border bg-light">
                                        {{ balance ? balance.water : '?' }} Water
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="p-3 border bg-light">
                                        {{ balance ? balance.tickets : '?' }} Randomizer Tickets <span class="float-end"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row gx-5">
                                <div class="col">
                                    <div v-if="balance && balance.water >= 1" class="p-3 border bg-light">
                                        <div class="text-start small pb-2">
                                            <div class="input-group mb-3">
                                                <span class="input-group-text p-1">Deposit:</span>
                                                <input type="number" v-model="waterRange" class="form-control px-2" min="0"
                                                       :max="floor(balance.water)">
                                                <span class="input-group-text">H2O</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="input-group mb-3">
                                                <input type="range" v-model="waterRange" class="form-range form-control mt-1 me-1" min="0"
                                                       :max="floor(balance.water)" step="1"
                                                       style="box-shadow: none; border: 0;">
                                                <span>
                                                        <button role="button" @click="depositWater()"
                                                                class="btn btn-outline-primary fs-7 px-2 py-1">
                                                            GO
                                                        </button>
                                                    </span>
                                            </div>
                                        </div>
                                        <tx-status-line v-if="txType === 'deposit'" :data="txStatus" />
                                    </div>
                                </div>
                                <div class="col">
                                    <div v-if="balance && balance.tickets >= 1" class="p-3 border bg-light">
                                        <div class="text-start small pb-2">
                                            <div class="input-group mb-3">
                                                <span class="input-group-text p-1">Withdraw:</span>
                                                <input type="number" v-model="ticketsRange" class="form-control px-2" min="0"
                                                       :max="balance.tickets">
                                                <span class="input-group-text">IRAND</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="input-group mb-3">
                                                <input type="range" v-model="ticketsRange" class="form-range form-control mt-1 me-1" min="0"
                                                       :max="balance.tickets" step="1"
                                                       style="box-shadow: none; border: 0;">
                                                <span>
                                                        <button role="button" @click="withdrawTickets()"
                                                                class="btn btn-outline-primary fs-7 px-2 py-1">
                                                            GO
                                                        </button>
                                                    </span>
                                            </div>
                                        </div>
                                        <tx-status-line v-if="txType === 'withdraw'" :data="txStatus" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                    </div>
                    <div v-else>Please connect with your Radix Wallet</div>
                </div>
            </div>
        </div>
    </main>
</template>
<script lang="ts">
import {defineComponent, type UnwrapRef} from "vue";
import {useAccountsStore} from "@/stores/AccountsStore";
import type {Balance, TxStatus} from "@/types/Components";
import {useRdtStore} from "@/stores/RdtStore";
import {Config} from "@/common/config";
import type {
    FungibleResourcesCollectionItemVaultAggregatedVault,
    NonFungibleResourcesCollectionItemVaultAggregatedVault
} from "@radixdlt/radix-dapp-toolkit";
import {Manifests} from "@/common/manifests";
import TxStatusLine from "@/components/common/TxStatusLine.vue";
import Strings from "@/utils/Strings";

const sumVaults = (v: FungibleResourcesCollectionItemVaultAggregatedVault): number => {
    let sum = 0;
    v.items.forEach(vault => {
        // won't work for real decimals
        sum += Number(vault.amount);
    });
    return sum;
}
const sumVaultsNF = (v: NonFungibleResourcesCollectionItemVaultAggregatedVault): number => {
    let sum = 0;
    v.items.forEach(vault => {
        sum += Number(vault.total_count);
    });
    return sum;
}

declare type TxType = "" | "withdraw" | "deposit";

export default defineComponent({
    components: {TxStatusLine},
    data() {
        return {
            balances: {} as Record<string, Balance>,
            selectedAccount: "",
            waterRange: 0,
            ticketsRange: 0,

            txType: "" as TxType,
            txStatus: {} as TxStatus,
        };
    },
    beforeMount(): void {
        this.selectedAccount = this.AccountsStore.selectedAccount;
        this.onAccountsUpdate({} as any);
        this.AccountsStore.subscribeSelectedAccount(this.onAccountsUpdate);
    },
    methods: {
        onAccountsUpdate(state: UnwrapRef<{ selectedAccount: string }>) {
            for (const account of this.accounts) {
                this.updateBalance(account.address);
            }
            if (!this.selectedAccount && this.accounts && this.accounts.length > 0) {
                this.selectedAccount = this.accounts[0].address;
            }
        },
        getBalance(account: string): Balance {
            return this.balances[account];
        },
        async updateBalance(account: string) {
            let response = await this.RdtStore.rdt!.gatewayApi.state.getEntityDetailsVaultAggregated(account);

            let balance = {water: 0, ice: 0, tickets: 0};
            response.fungible_resources.items.forEach(resource => {
                if (resource.resource_address == Config.water_resource) {
                    balance.water = sumVaults(resource.vaults);
                }
            });
            response.non_fungible_resources.items.forEach(resource => {
                if (resource.resource_address == Config.ice_resource) {
                    balance.ice = sumVaultsNF(resource.vaults);
                } else if (resource.resource_address == Config.ticket) {
                    balance.tickets = sumVaultsNF(resource.vaults);
                }
            });
            this.balances[account] = balance;
        },
        floor(num: number): string {
            return Math.floor(num).toString();
        },
        async depositWater() {
            await this.sendTransaction("deposit",
                Manifests.deposit(this.selectedAccount, this.waterRange)
            );
        },
        async withdrawTickets() {
            await this.sendTransaction("withdraw",
                Manifests.withdraw(this.selectedAccount, this.ticketsRange)
            );
        },
        async sendTransaction(txType: TxType, manifest: string) {
            this.clearTx();
            this.txType = txType;
            let resultAsync = this.RdtStore.rdt!.walletApi.sendTransaction({
                transactionManifest: manifest,
                version: 1,
            });
            this.txStatus.message = "Please confirm in your wallet...";
            const result = await resultAsync;
            console.log("TX Result: ", JSON.stringify(result));
            if (result.isErr()) {
                this.txStatus.error = result.error.error;
                setTimeout(() => {
                    if (this.txStatus.error && !this.txStatus.success) {
                        this.clearTx();
                    }
                }, 5000);

                throw result.error;
            }
            this.txStatus.success = "Transaction sent!";
            setTimeout(() => {
                this.updateBalance(this.selectedAccount);
                setTimeout(() => {
                    if (this.txStatus.success && !this.txStatus.error) {
                        this.clearTx();
                    }
                }, 3000);
            }, 2000);
        },
        clearTx() {
            this.txType = "";
            this.txStatus = {} as TxStatus;
        }

    },
    computed: {
        Strings() {
            return Strings
        },
        AccountsStore() {
            return useAccountsStore();
        },
        RdtStore() {
            return useRdtStore();
        },
        accounts() {
            return this.AccountsStore.accounts;
        },
        balance(): Balance | null {
            return this.selectedAccount ? this.balances[this.selectedAccount] : null;
        }
    },
    watch: {
        selectedAccount() {
            this.AccountsStore.setSelectedAccount(this.selectedAccount);
        }
    }
});
</script>
<style lang="scss">
</style>
