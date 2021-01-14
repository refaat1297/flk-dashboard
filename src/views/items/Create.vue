<template>
    <base-layout :page-title="pageTitle" :links="breadcrumbLinks">
        <section class="create-item">
            <div class="row">
                <div class="col-12 col-lg-6 col-xl-6">
                    <form @submit.prevent="addNewItem()">
                        <div class="form-group" :class="{ 'form-group--error': $v.newItem.name.$error }">
                            <label for="item_name">
                                <span class="title">{{ $t('items.createPage.form.name') }}</span>
                                <span class="required">*</span>
                            </label>
                            <input 
                                id="item_name" 
                                v-model.trim="$v.newItem.name.$model" 
                                type="text" 
                                class="form-control" 
                            >
                            <p class="error" v-if="!$v.newItem.name.required">{{ $t('items.createPage.form.nameMessages.required') }}</p>
                            <p class="error" v-if="!$v.newItem.name.minLength"> {{ $t('items.createPage.form.nameMessages.minLength', {minLength: $v.newItem.name.$params.minLength.min}) }} </p>
                        </div>
                        <div class="form-group" :class="{ 'form-group--error': $v.newItem.price.$error }">
                            <label for="item_price">
                                <span class="title">{{ $t('items.createPage.form.price') }}</span>
                                <span class="required">*</span>
                            </label>
                            <input 
                                id="item_price" 
                                v-model.number.trim="$v.newItem.price.$model" 
                                type="text" class="form-control"
                            >
                            <p class="error" v-if="!$v.newItem.price.required">{{ $t('items.createPage.form.priceMessages.required') }}</p>
                            <p class="error" v-if="!$v.newItem.price.between">{{ $t('items.createPage.form.priceMessages.between', {min: $v.newItem.price.$params.between.min, max: $v.newItem.price.$params.between.max}) }}</p>
                        </div>
                        <div class="form-group">
                            <label class="typo__label">
                                <span class="title">{{ $t('items.createPage.form.unit') }}</span>
                            </label>
                            <multiselect 
                                v-model="newItem.unit.value" 
                                :options="newItem.unit.options"
                                :custom-label="nameWithLang"
                                :allow-empty="false"
                                :placeholder="$t('items.createPage.form.select')" 
                                label="name" 
                                track-by="name"
                            />
<!--                            <input id="item_unit" type="text" class="form-control">-->
                        </div>
                        <div class="form-group">
                            <label for="item_description">
                                <span class="title">{{ $t('items.createPage.form.description') }}</span>
                            </label>
                            <textarea id="item_description" v-model.trim="newItem.description" type="text" class="form-control" rows="3"></textarea>
                        </div>
                        
                        <button class="app-btn">
                            <div class="spinner-border text-light" role="status" v-if="loading">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <SaveIcon v-else />
                            <span>{{ $t('items.createPage.form.save') }}</span>
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
import {required, minLength, maxLength, between} from 'vuelidate/lib/validators'

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
            submitStatus: null,
            newItem: {
                name: '',
                price: 0,
                unit: {
                    value: {name: ''},
                    options: [
                        {name: 'box'},
                        {name: 'cm'}
                    ]
                },
                description: null,
                submitStatus: null
            },
            loading: false,
        }
    },
    computed: {
        makeURL () {
            return this.newItem.name.split(' ').join('-')
        }
    },
    methods: {
        nameWithLang ({ name }) {
            return name
        },
        addNewItem () {

            this.$v.$touch()

            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
                window.toastr.error('Please fill the form correctly.')
            } else {
                this.submitStatus = 'OK'

                this.loading = true

                let allItemData = {
                    ...this.newItem,
                    url: this.makeURL,
                    addedOn: Date.now()
                }
                delete allItemData.submitStatus

                return addToCollection('items', allItemData).then(response => {
                    this.$router.push({
                        name: "Items"
                    })
                    this.loading = false
                    window.toastr.success(this.$t('items.createPage.form.successMsg'))
                }).catch(err => {
                    window.toastr.error(this.$t('items.createPage.form.errorMsg'))
                })
            }
            
        }
    },
    validations: {
        newItem: {
            name: {
                required,
                minLength: minLength(2)
            },
            price: {
                required,
                between: between(1, 5000)
            }
        }
    }
}
</script>

<style scoped>

</style>