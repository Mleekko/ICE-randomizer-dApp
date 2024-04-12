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
                    <div v-for="account in accounts" v-bind:key="account.address">
                        <span>{{ account.address }}</span> -> <span>{{account.label}}</span>
                    </div>
                </div>
                <div v-else>Please connect with your Radix Wallet</div>
            </div>
          </div>
        </div>
    </main>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {useRoute} from "vue-router";
import {useAccountsStore} from "@/stores/AccountsStore";

export default defineComponent({
    components: {
    },
    computed: {
        AccountsStore() {
            return useAccountsStore();
        },
        accounts() {
            return this.AccountsStore.accounts;
        }
    },
});
</script>
<style lang="scss">
</style>
