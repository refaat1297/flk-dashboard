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
            <div class="items-list">
                <div class="head d-none d-lg-block">
                    <div class="row no-gutters">
                        <div class="col-12 col-sm-6 col-md-3">
                            <div class="item-name">{{ $t('items.listPage.name') }}</div>
                        </div>
                        <div class="col-6 col-sm-6 col-lg-3">
                            <div class="item-unit">{{ $t('items.listPage.unit') }}</div>
                        </div>
                        <div class="col-6 col-sm-6 col-lg-2">
                            <div class="item-price">{{ $t('items.listPage.price') }}</div>
                        </div>
                        <div class="col-6 col-sm-6 col-lg-3">
                            <div class="item-added-on">{{ $t('items.listPage.addedOn') }}</div>
                        </div>
                        
                    </div>
                </div>
                <ListItem v-for="item in items" :key="item.id" :item="item" @deleteItem="deleteItem" />
            </div>
        </template>
    </base-layout>
</template>

<script>
import ListItem from "./parts/ListItem";
import axios from "axios";

export default {
    name: "Items",
    components: {ListItem},
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
    async created() {
        this.loadingItems = true

        await axios.get('/items.json')
            .then(res => {
                let items = Object.entries(res.data).map(item => {
                    return Object.assign({}, item[1], {
                        id: item[0]
                    })
                })
                
                this.items = items
                
                this.loadingItems = false
            })
            .catch(error => {
                window.toastr.error(error)
            })
    },
    methods: {
        async deleteItem (id) {
            await axios.delete(`/items/${id}.json`)
                .then(res => {
                    this.items = this.items.filter(item => id !== item.id)
                    window.toastr.success(this.$t('items.listPage.deleteMsg'))
                })
                .catch(err => window.toastr.error(err))
        }
    }
}
</script>

