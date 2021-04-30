<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Name:" label-for="user-name">
                        <b-form-input id="user-name" type="text" v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="User name..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text" v-model="user.email" required
                            :readonly="mode === 'remove'"
                            placeholder="User e-mail..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox id="user-admin" v-show="mode === 'save'" v-model="user.admin" 
                class="mt-3 mb-3">
                Administrator?
            </b-form-checkbox>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Password:" label-for="user-password">
                        <b-form-input id="user-password" type="password" 
                            v-model="user.password" required
                            placeholder="Password..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirm password:" label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password" 
                            v-model="user.confirmPassword" required
                            placeholder="Confirm password..." />
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
        <b-table hover striped :items="users" :fields="fields" class="mt-5">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'

export default {
    name: 'UserAdmin',
    data: function () {
        return {
            mode: 'save',
            user: {},
            users: [],
            fields: [
                { key: 'id', label: 'ID', sortable: true },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'admin', label: 'Administrator?', sortable: true, 
                    formatter: value => value ? 'Yes' : 'No' },
                { key: 'actions', label: 'Actions' }
            ]
        }
    },
    methods: {
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
            })
        },
        save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove(){
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        reset() {
            this.mode = 'save',
            this.user = {},
            this.loadUsers()
        },
        loadUser(user, mode = 'save') {
            this.user = { ...user }
            this.mode = mode
        }
    },
    mounted() {
        this.loadUsers()
    }
}

</script>

<style>

</style>