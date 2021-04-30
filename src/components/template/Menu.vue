<template>
    <aside class="menu" v-show="isMenuVisible">
        <router-link to="/stocks">Stocks</router-link>
        <router-link to="/operations">Operations</router-link>
    </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Menu',
    computed: mapState(['isMenuVisible']),
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);
        
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a {
        text-decoration: none;
        color: #fff;
        margin: 5px 0px 0px 5px;
    }
    .menu a:hover {
        text-decoration: none;
        color: #fff;
        background-color: rgba(255, 255, 255, 0.2);
    }
</style>