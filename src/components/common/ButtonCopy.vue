<template>
    <button ref="btn" role="button" @click="copyValue" class="btn btn-secondary"
            :class="{'focus': copyId !== 0, 'btn-0': !border}">
        <b-icon-clipboard-plus v-show="copyId === 0" />
        <b-icon-clipboard-check-fill v-show="copyId !== 0" />
    </button>
</template>

<script lang="ts">
import { BIconClipboardCheckFill, BIconClipboardPlus } from "bootstrap-icons-vue";
import Tooltip from "bootstrap/js/dist/tooltip";
import { defineComponent } from "vue";

export default defineComponent({
    components: {BIconClipboardPlus, BIconClipboardCheckFill},
    data() {
        return {
            copyId: 0,
            tooltips: [] as Tooltip[],
        }
    },
    props: {
        value: {
            type: String,
            required: true
        },
        border: {
          type: Boolean,
          required: false
        },
        tip: {
            type: String,
            required: false
        }
    },
    beforeUnmount() {
        for (const tip of this.tooltips) {
            tip.hide();
        }
    },
    methods: {
        copyValue() {
            window.navigator.clipboard.writeText(this.value);

            const tooltip = new Tooltip(this.$refs.btn as Element, {
                trigger: 'manual',
                title: 'Copied!',
                placement: this.tip as Tooltip.PopoverPlacement || 'right',
                customClass: 'fs-8'
            });
            for (const tip of this.tooltips) {
                tip.hide();
            }
            this.tooltips.length = 0;
            this.tooltips.push(tooltip);
            tooltip.show();
            const id = Date.now();
            this.copyId = id;

            setTimeout(() => {
                tooltip.hide();
                if (this.copyId === id) {
                    this.copyId = 0;
                }
            }, 2500);

        }
    },
});
</script>
