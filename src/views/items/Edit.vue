<template>
    <base-layout :page-title="pageTitle" :links="breadcrumbLinks">
        <section class="edit-item">
            <div class="row">
                <div class="col-12 col-lg-6 col-xl-6">
                    <form @submit.prevent="editItem()">
                        <div class="form-group" :class="{ 'form-group--error': $v.selectedItem.name.$error }">
                            <label for="item_name">
                                <span class="title">{{ $t('items.editPage.form.name') }}</span>
                                <span class="required">*</span>
                            </label>
                            <input
                                id="item_name"
                                v-model.trim="$v.selectedItem.name.$model"
                                type="text"
                                class="form-control"
                            >
                            <p class="error" v-if="!$v.selectedItem.name.required">{{ $t('items.editPage.form.nameMessages.required') }}</p>
                            <p class="error" v-if="!$v.selectedItem.name.minLength"> {{ $t('items.editPage.form.nameMessages.minLength', {minLength: $v.selectedItem.name.$params.minLength.min}) }} </p>
                        </div>
                        <div class="form-group" :class="{ 'form-group--error': $v.selectedItem.price.$error }">
                            <label for="item_price">
                                <span class="title">{{ $t('items.editPage.form.price') }}</span>
                                <span class="required">*</span>
                            </label>
<!--                            <input-->
<!--                                id="item_price"-->
<!--                                v-model.number.trim="$v.selectedItem.price.$model"-->
<!--                                type="text" class="form-control"-->
<!--                            >-->
                            <money id="item_price" v-model="$v.selectedItem.price.$model"
                                   v-bind="money"
                                   class="form-control"></money>
                            
                            <p class="error" v-if="!$v.selectedItem.price.required">{{ $t('items.createPage.form.priceMessages.required') }}</p>
                            <p class="error" v-if="!$v.selectedItem.price.between">{{ $t('items.createPage.form.priceMessages.between', {min: $v.selectedItem.price.$params.between.min, max: $v.selectedItem.price.$params.between.max}) }}</p>
                        </div>
                        <div class="form-group">
                            <label class="typo__label">
                                <span class="title">{{ $t('items.editPage.form.unit') }}</span>
                            </label>
<!--                            :custom-label="nameWithLang"-->
<!--                            :allow-empty="false"-->
<!--                            label="name"-->
<!--                            track-by="name"-->
                            
                            <multiselect
                                v-model="selectedItem.unit"
                                :options="unitsNames"
                                :searchable="false" 
                                :close-on-select="true" 
                                :show-labels="true"
                                :placeholder="$t('items.editPage.form.select')"
                            />
                            <!--                            <input id="item_unit" type="text" class="form-control">-->
                        </div>
                        <div class="form-group">
                            <label for="item_description">
                                <span class="title">{{ $t('items.editPage.form.description') }}</span>
                            </label>
                            <textarea id="item_description" v-model.trim="selectedItem.description" type="text" class="form-control" rows="3"></textarea>
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
import {between, minLength, required} from "vuelidate/lib/validators";
import axios from "axios";
import {Money} from 'v-money'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "EditItem",
    components: {SaveIcon, Money},
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
            selectedItem: {},
            loading: false,
            money: {
                decimal: ',',
                thousands: '.',
                prefix: '$ ',
                // suffix: ' #',
                precision: 2,
                masked: false
            }
        }
    },
    async mounted() {
        await axios.get(`/items.json?orderBy="slug"&equalTo="${this.$route.params.slug}"`)
            .then(res => {
                let selectedItem = Object.entries(res.data).map(item => {
                    return Object.assign({}, item[1], {
                        id: item[0]
                    })
                })[0]
                
                this.selectedItem = selectedItem
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
    },
    async created() {
        await this.getUnits()
    },
    computed: {
        ...mapGetters('units', ['unitsNames']),
        makeURL () {
            return this.selectedItem.name.split(' ').join('-').toLowerCase()
        }
    },
    methods: {
        ...mapActions('units', ['getUnits']),
        nameWithLang ({ name }) {
            return name
        },
        async editItem () {

            this.$v.$touch()

            if (this.$v.$invalid) {
                this.submitStatus = 'ERROR'
                window.toastr.error(this.$t('items.editPage.form.fillInputs'))
            } else {

                this.loading = true

                let id = this.selectedItem.id
                
                let allItemData = {
                    ...this.selectedItem,
                    slug: this.makeURL,
                    addedOn: Date.now()
                }
                delete allItemData.submitStatus
                delete allItemData.id

                
                await axios.patch(`/items/${id}.json`, allItemData)
                    .then(res => {
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
        selectedItem: {
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