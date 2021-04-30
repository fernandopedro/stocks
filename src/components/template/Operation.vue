<template>
    <div class="Operations">
        <PageTitle icon="fa fa-cogs" main="Operations" sub="Operations CRUD" />
        <b-form>
            <input type="hidden" id="operation-id" v-model="operation.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Stock code:" label-for="stock-code">
                        <b-form-input id="stock-code" type="text" v-model="operation.code"
                            required :readonly="mode === 'remove'" placeholder="Stock code... " />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="12">
                    <b-form-group label="Quantity:" label-form="quantity">
                        <b-form-input id="quantity" type="number" v-model="operation.quantity"
                        required :readonly="mode === 'remove'" placeholder="Quantity..." />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="12">
                    <b-form-group label="Unitary value:" label-form="unitaryValue">
                        <b-form-input id="unitaryValue" type="number" v-model="operation.unitaryValue"
                        required :readonly="mode === 'remove'" placeholder="Unitary value..." />
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
        <b-table hover striped :items="operations" :fields="fields" class="mt-5">
            
            <template slot="operationData" slot-scope="data">
                {{ formatOperationData(data.item.operationData) }}
            </template>
            <template slot="unitaryValue" slot-scope="data">
                {{ formatCurrency(data.item.unitaryValue) }}
            </template>
            <template slot="totalValue" slot-scope="data">
                {{ formatCurrency(data.item.quantity * data.item.unitaryValue) }}
            </template>
            <template slot="actions" slot-scope="data">

                <b-button variant="warning" @click="loadOperation(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadOperation(data.item, 'remove')">
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
import moment from 'moment'

export default {
    name: 'Operations',
    components: { PageTitle },
    data: function() {
        return {
            mode: 'save',
            operation: {},
            operations: [],
            fields: [
                { key: 'id', label: 'ID operation', sortable: true },
                { key: 'code', label: 'Code', sortable: true },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'quantity', label: 'Quantity', sortable: true },
                { key: 'unitaryValue', label: 'Unitary value', sortable: true },
                { key: 'totalValue', label: 'Total operation value', sortable: true },
                { key: 'operationData', label: 'Operation data', sortable: true },
                { key: 'actions', label: 'Actions' }

            ]
        }
    },
    methods: {
        loadOperations() {
            const url = `${baseApiUrl}/operations`
            axios.get(url).then(res => {
                this.operations = res.data
            })
        },
        loadOperation(operation, mode = 'save') {
            this.operation = { ...operation }
            this.mode = mode
        },
        reset() {
            this.mode = 'save'
            this.operation = {}
            this.loadOperations()
        },
        save() {
            const method = this.operation.id ? 'put' : 'post'
            const id = this.operation.id ? `${this.operation.id}` : ''
            axios[method](`${baseApiUrl}/operations/${id}`, this.operation)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.operation.id
            axios.delete(`${baseApiUrl}/operations/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    },
    mounted() {
        this.loadOperations()
    }
}

</script>

<style>

</style>