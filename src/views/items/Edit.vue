<template>
    <base-layout :page-title="pageTitle" :links="breadcrumbLinks">
        <section class="edit-item">
            <div class="row">
                <div class="col-12 col-lg-6 col-xl-6">
                    <form @submit.prevent="editItem()">
                        <div class="form-group" :class="{ 'form-group--error': $v.newItem.name.$error }">
                            <label for="item_name">
                                <span class="title">{{ $t('items.editPage.form.name') }}</span>
                                <span class="required">*</span>
                            </label>
                            <input
                                id="item_name"
                                v-model.trim="$v.newItem.name.$model"
                                type="text"
                                class="form-control"
                            >
                            <p class="error" v-if="!$v.newItem.name.required">{{ $t('items.editPage.form.nameMessages.required') }}</p>
                            <p class="error" v-if="!$v.newItem.name.minLength"> {{ $t('items.editPage.form.nameMessages.minLength', {minLength: $v.newItem.name.$params.minLength.min}) }} </p>
                        </div>
                        <div class="form-group" :class="{ 'form-group--error': $v.newItem.price.$error }">
                            <label for="item_price">
                                <span class="title">{{ $t('items.editPage.form.price') }}</span>
                                <span class="required">*</span>
                            </label>
                            <input
                                id="item_price"
                                v-model.number.trim="$v.newItem.price.$model"
                                type="text" class="form-control"
                            >
                            <p class="error" v-if="!$v.newItem.price.required">Field is required</p>
                            <p class="error" v-if="!$v.newItem.price.between">Must be between {{$v.newItem.price.$params.between.min}} and {{$v.newItem.price.$params.between.max}}</p>
                        </div>
                        <div class="form-group">
                            <label class="typo__label">
                                <span class="title">{{ $t('items.editPage.form.unit') }}</span>
                            </label>
                            <multiselect
                                v-model="newItem.unit.value"
                                :options="newItem.unit.options"
                                :custom-label="nameWithLang"
                                :allow-empty="false"
                                :placeholder="$t('items.editPage.form.select')"
                                label="name"
                                track-by="name"
                            />
                            <!--                            <input id="item_unit" type="text" class="form-control">-->
                        </div>
                        <div class="form-group">
                            <label for="item_description">
                                <span class="title">{{ $t('items.editPage.form.description') }}</span>
                            </label>
                            <textarea id="item_description" v-model.trim="newItem.description" type="text" class="form-control" rows="3"></textarea>
                        </div>

                        <button class="app-btn">
                            <div class="spinner-border text-light" role="status" v-if="loading">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <SaveIcon v-else />
                            <span>{{ $t('items.editPage.form.save') }}</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </base-layout>
</template>

<script>
import SaveIcon from "../../components/icons/SaveIcon";
import db from '../../firebase/init'
import {updateDocumnet} from '../../firebase/methods/firestore'
import {between, minLength, required} from "vuelidate/lib/validators";
export default {
    name: "EditItem",
    components: {SaveIcon},
    data () {
        return {
            pageTitle: this.$t('items.editPage.title'),
            breadcrumbLinks: [
                {
                    link: '/items',
                    title: this.$t('items.listPage.title')
                },
                {
                    link: '/items/create',
                    title: this.$t('items.editPage.title')
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
                description: null,
            },
            loading: false
        }
    },
    mounted() {
        
        db.collection("items").where("url", "==", this.$route.params.url)
            .get()
            .then((querySnapshot) => {
                this.newItem = querySnapshot.docs[0].data()
                this.newItem.id = querySnapshot.docs[0].id
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });  
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
        editItem () {

            this.$v.$touch()

            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
                window.toastr.error('Please fill the form correctly.')
            } else {

                this.loading = true

                let allItemData = {
                    ...this.newItem,
                    url: this.makeURL,
                    addedOn: Date.now()
                }
                delete allItemData.submitStatus

                return updateDocumnet('items', allItemData.id,allItemData).then(response => {
                    this.$router.push({
                        name: "Items"
                    })
                    this.loading = false
                    window.toastr.success(this.$t('items.editPage.form.successMsg'))
                }).catch(err => {
                    window.toastr.error(this.$t('items.editPage.form.errorMsg'))
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