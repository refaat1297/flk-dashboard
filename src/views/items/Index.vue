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
import {getCollection, deleteFromCollection} from "../../firebase/methods/firestore";
import ListItem from "./parts/ListItem";

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
    },
    methods: {
        deleteItem (id) {
            return deleteFromCollection('items', id).then(() => {
                this.items = this.items.filter(item => id !== item.id)
                window.toastr.success(this.$t('items.listPage.deleteMsg'))
            }).catch(err => window.toastr.error(err))
        }
    }
}
</script>

