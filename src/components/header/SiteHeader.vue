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
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-bar"
                        aria-controls="nav-bar" aria-expanded="false" aria-label="Nav">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import type { NavItem } from "@/types/Components";
import DropdownLink from "@/components/header/DropdownLink.vue";
import { useRoute } from "vue-router";

export default defineComponent({
    components: {DropdownLink},
    data() {
        return {
            navItems: [{
                href: "/",
                text: "Home",
            }] as NavItem[],

        };
    },
    methods: {
        isActive(linkHref: string) {
            return linkHref === "/" ? this.current === linkHref : this.current.startsWith(linkHref);
        },
    },
    computed: {
        current(): string {
            const route = useRoute();
            return (route && route.path) || "";
        }
    },
});
</script>
