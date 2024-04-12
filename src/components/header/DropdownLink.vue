<template>
    <RouterLink v-if="!link.href.startsWith('http')" :to="link.href" :class="['dropdown-item', active ? 'active': '']">
        {{ link.text }}
    </RouterLink>
    <a v-else :href="link.href" :class="['dropdown-item', active ? 'active': '']" target="_blank">
        {{ link.text }}
        <icon-box-arrow-up-right />
    </a>
</template>
<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";
import IconBoxArrowUpRight from "@/components/common/icons/IconBoxArrowUpRight.vue";
import type { NavItem } from "@/types/Components";

export default defineComponent({
    components: {IconBoxArrowUpRight},
    props: {
        link: {
            type: Object as PropType<NavItem>,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        }
    },
    methods: {},
    computed: {},
});
</script>
