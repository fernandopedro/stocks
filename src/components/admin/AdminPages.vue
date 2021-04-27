<template>
    <div class="AdminPages">
        <PageTitle icon="fa fa-cogs" main='Administration'
            sub="Users and permissions*" />
        <div class="admin-pages-tabes">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Users" active>
                        <UserAdmin />
                    </b-tab>
                    <b-tab title="Permissions">
                        <PermissionAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import UserAdmin from './UserAdmin'
import PermissionAdmin from './PermissionAdmin'
export default {
    name: 'AdminPages',
    components: { PageTitle, UserAdmin, PermissionAdmin }
}

</script>

<style>

</style>