<template>
    <div v-if="anyIce || rarities[5]" class="text-end mint-panel">
        {{ title }}
        <span v-if="anyIce" class="badge text-bg-success">{{ rarities[0] }}{{ suffix }}</span>&nbsp;
        <span v-if="anyIce" class="badge text-bg-primary">{{ rarities[1] }}{{ suffix }}</span>&nbsp;
        <span v-if="anyIce" class="badge text-bg-danger">{{ rarities[2] }}{{ suffix }}</span>&nbsp;
        <span v-if="anyIce" class="badge text-bg-warning">{{ rarities[3] }}{{ suffix }}</span>&nbsp;
        <span v-if="anyIce" class="badge text-bg-indigo">{{ rarities[4] }}{{ suffix }}</span>&nbsp;
        <span v-if="rarities[5]" class="badge text-bg-secondary">H<sub>2</sub>O: {{ rarities[5] }}{{ suffix }}</span>
    </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    components: {},
    props: {
        rarities: {
            type: Array<Number|String>,
            required: true
        },
        title: {
            type: String,
            required: true,
            default: ""
        },
        suffix: {
            type: String,
            required: false,
            default: ""
        }
    },
    methods: {},
    computed: {
        anyIce(): boolean {
            return !!(this.rarities[0] || this.rarities[1] || this.rarities[2] || this.rarities[3] || this.rarities[4]);
        }
    },
});
</script>
