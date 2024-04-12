<template>
    <div v-if="message" class="error-alert d-flex">
        <div class="page-name alert" :class="alertClass">
            {{ message }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    components: {},
    props: {
        message: {
            type: String,
            required: false
        },
        code: {
            type: Number,
            required: false
        }
    },
    methods: {},
    computed: {
        alertClass(): string {
            const code = this.code || 0;
            return code >= 500 ? "alert-danger" : (code >= 400 ? "alert-warning" : "alert-primary");
        }
    },
});
</script>
