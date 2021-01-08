<template>
    <base-layout :page-title="pageTitle" :links="breadcrumbLinks">
        <section class="create-item">
            <div class="row">
                <div class="col-12 col-lg-6 col-xl-6">
                    <form @submit.prevent="addNewItem()">
                        <div class="form-group">
                            <label for="item_name">
                                <span class="title">name</span>
                                <span class="required">*</span>
                            </label>
                            <input id="item_name" v-model="newItem.name" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="item_price">
                                <span class="title">price</span>
                                <span class="required">*</span>
                            </label>
                            <input id="item_price" v-model.number="newItem.price" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label class="typo__label">
                                <span class="title">unit</span>
                            </label>
                            <multiselect 
                                v-model="newItem.unit.value" 
                                :options="newItem.unit.options"
                                :custom-label="nameWithLang"
                                :allow-empty="false"
                                placeholder="Select unit" 
                                label="name" 
                                track-by="name"
                            />
<!--                            <input id="item_unit" type="text" class="form-control">-->
                        </div>
                        <div class="form-group">
                            <label for="item_description">
                                <span class="title">description</span>
                            </label>
                            <textarea id="item_description" v-model="newItem.description" type="text" class="form-control" rows="3"></textarea>
                        </div>
                        
                        <button class="app-btn">
                            <div class="spinner-border text-light" role="status" v-if="loading">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <SaveIcon v-else />
                            <span>save item</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </base-layout>
</template>

<script>
import SaveIcon from "../../components/icons/SaveIcon";
import {addToCollection} from "../../firebase/methods/firestore";

export default {
    name: "CreateNewItem",
    components: {SaveIcon},
    data () {
        return {
            pageTitle: this.$t('items.createPage.title'),
            breadcrumbLinks: [
                {
                    link: '/items',
                    title: this.$t('items.listPage.title')
                },
                {
                    link: '/items/create',
                    title: this.$t('items.createPage.title')
                }
            ],
            newItem: {
                name: null,
                price: 0,
                unit: {
                    value: {name: ''},
                    options: [
                        {name: 'box'},
                        {name: 'cm'}
                    ]
                },
                description: null
            },
            loading: false
        }
    },
    methods: {
        nameWithLang ({ name }) {
            return name
        },
        addNewItem () {
            console.log(this.newItem)
            this.loading = true
            
            
            
            return addToCollection('items', this.newItem).then(response => {
                
                this.$router.push({
                    name: "Items"
                })
                this.loading = false
                window.toastr.success('item added successfully')
            }).catch(err => {
                window.toastr.error(err)
            })
        }
    }
}
</script>

<style scoped>

</style>