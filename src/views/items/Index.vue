<template>
    <base-layout :links="breadcrumbLinks" :pageTitle="pageTitle" :actionLink="actionLink">
        <div
            v-if="loadingItems"
            class="spinner-grow text-primary"
            style="width: 3rem; height: 3rem; display: flex; margin: auto"
            role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <template v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">name</th>
                        <th scope="col">unit</th>
                        <th scope="col">price</th>
                        <th scope="col">added on</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <th scope="row">{{ item.name }}</th>
                        <td>{{ item.unit.value.name }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.description }}</td>
                    </tr>
                </tbody>
            </table>
        </template>
    </base-layout>
</template>

<script>
import {getCollection} from "../../firebase/methods/firestore";

export default {
    name: "Items",
    data() {
        return {
            pageTitle: this.$t('items.listPage.title'),
            breadcrumbLinks: [
                {
                    link: '/items',
                    title: this.$t('items.listPage.title')
                }
            ],
            actionLink: {
                title: this.$t('items.listPage.addBtn'),
                link: "/create"
            },
            items: [],
            loadingItems: false
        }
    },
    created() {
        this.loadingItems = true
        getCollection('items').then(snapshot => {
            let items = snapshot.docs.map(doc => {
                return Object.assign({
                    id: doc.id,
                    ...doc.data()
                })
            })

            this.items = items
            this.loadingItems = false
        }).catch(err => {
            window.toastr.error(err)
        })
    }
}
</script>

