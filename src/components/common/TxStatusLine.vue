<template>
    <div>
        <div v-if="data.error" class="alert alert-danger mb-0">
            {{ data.error }}
        </div>
        <div v-else-if="data.success" class="alert alert-success mb-0">
            {{ data.success }}
        </div>
        <div v-else-if="data.message" class="alert alert-secondary mb-0">
            {{ data.message }}
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent, type PropType} from "vue";
import type {TxStatus} from "@/types/Components";

export default defineComponent({
    components: {},
    props: {
        data: {
            type: Object as PropType<TxStatus>,
            required: true
        },
    },
    methods: {},
    computed: {},
});
</script>
