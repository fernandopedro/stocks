<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Stocks management" />
        <div class="stats">
            <Stat title="Total value operations" :value="formatCurrency(stat.totalValueOperations)"
                icon="fa fa-money" color="#3bc480" />
            <Stat title="Operations" :value="stat.operations"
                icon="fa fa-credit-card-alt" color="#3282cd" />
            <Stat title="Stocks" :value="stat.stocks"
                icon="fa fa-handshake-o" color="#d54d50" />
            <Stat title="Users" :value="stat.users"
                icon="fa fa-users" color="#3bc480" />                
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    data: function () {
        return {
            stat: {}
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
        }
    },
    mounted() {
        this.getStats()
    }
}
</script>

<style>
    .stats {
        display: flex;;
        justify-content: space-between;
        flex-wrap: wrap; 
    }
</style>