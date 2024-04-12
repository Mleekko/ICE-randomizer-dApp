<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-primary">
            <div class="container">
                <a class="navbar-brand" href="/">ICE Randomizer</a>
                <div class="collapse navbar-collapse" id="nav-bar">
                    <ul class="navbar-nav me-auto">
                        <li v-for="item in navItems" v-bind:key="item.href" class="nav-item">
                            <RouterLink :to="item.href" :class="['nav-link', isActive(item.href) ? 'active': '']">
                                {{ item.text }}
                            </RouterLink>
                        </li>
                        <li></li>
                    </ul>
                </div>

                <div>
                    <radix-connect-button/>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-bar"
                        aria-controls="nav-bar" aria-expanded="false" aria-label="Nav">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    </header>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import type {NavItem} from "@/types/Components";
import DropdownLink from "@/components/header/DropdownLink.vue";
import {useRoute} from "vue-router";
import {DataRequestBuilder, RadixDappToolkit, RadixNetwork} from "@radixdlt/radix-dapp-toolkit";
import {useAccountsStore} from "@/stores/AccountsStore";

export default defineComponent({
    components: {DropdownLink},
    data() {
        return {
            navItems: [{
                href: "/",
                text: "Home",
            }, {
                href: "/app",
                text: "App",
            }] as NavItem[],

        };
    },
    mounted() {
        const rdt = RadixDappToolkit({
            dAppDefinitionAddress: "account_tdx_2_128uvygwu4d80fu32n29wqy84e35xhg3xtgq0m4wkgkdghju7cke5fz",
            networkId: RadixNetwork.Stokenet,
            applicationName: "ICE Randomizer",
            applicationVersion: "0.1.0",
        });
        rdt.walletApi.setRequestData(DataRequestBuilder.accounts().atLeast(1));

        rdt.walletApi.walletData$.subscribe((state) => {
            console.log(state);
            let accounts = (state && state.accounts) || [];
            this.AccountsStore.setAccounts(accounts);
        })
        // rdt.walletApi.getWalletData
        rdt.buttonApi.setTheme("white");
    },
    methods: {
        isActive(linkHref: string) {
            return linkHref === "/" ? this.current === linkHref : this.current.startsWith(linkHref);
        }
    },
    computed: {
        current(): string {
            const route = useRoute();
            return (route && route.path) || "";
        },
        AccountsStore() {
            return useAccountsStore();
        },
    },
});
</script>
