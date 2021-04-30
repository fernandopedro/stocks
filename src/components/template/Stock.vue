<template>
    <div class="Stocks">
        <PageTitle icon="fa fa-cogs" main='Stocks'
            sub="Stocks CRUD" />
        <b-form>
            <input id="stock-id" type="hidden" v-model="stock.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Stock code:" label-for="stock-code">
                        <b-form-input id="stock-code" type="text" v-model="stock.code"
                            required
                            :readonly="mode === 'remove'"
                            placeholder="Stock code..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Stock name:" label-for="stock-name">
                        <b-form-input id="stock-name" type="text" v-model="stock.name"
                            required
                            :readonly="mode === 'remove'"
                            placeholder="Stock name..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'" @click="save">Save</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Delete</b-button>
                    <b-button class="ml-2" @click="reset">Cancel</b-button>
                </b-col>
            </b-row>
        </b-form>
        <b-table hover striped :items="stocks" :fields="fields" class="mt-5">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadStock(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadStock(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import PageTitle from './PageTitle'
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'

export default {
    name: 'Stocks',
    components: { PageTitle },
    data: function() {
        return {
            mode: 'save',
            stock: {},
            stocks: [],
            fields: [
                { key: 'id', label: 'ID', sortable: true },
                { key: 'code', label: 'Code', sortable: true },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'actions', label: 'Actions' }

            ]
        }
    },
    methods: {
        loadStocks() {
            const url = `${baseApiUrl}/stocks`
            axios.get(url).then(res => {
                this.stocks = res.data
            })
        },
        loadStock(stock, mode = 'save') {
            this.stock = { ...stock }
            this.mode = mode
        },
        reset() {
            this.mode = 'save'
            this.stock = {}
            this.loadStocks()
        },
        save() {
            const method = this.stock.id ? 'put' : 'post'
            const id = this.stock.id ? `${this.stock.id}` : ''
            axios[method](`${baseApiUrl}/stocks/${id}`, this.stock)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.stock.id
            axios.delete(`${baseApiUrl}/stocks/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    },
    mounted() {
        this.loadStocks()
    }
}

</script>

<style>

</style>