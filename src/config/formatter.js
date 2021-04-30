import Vue from 'vue'
import moment from 'moment'

Vue.mixin({
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
        },
        formatOperationData(value) {
            return moment(String(value)).format('DD/MM/YYYY hh:mm:ss')
        }
    }
})