<template>
    <div class="list">
        <div class="row align-items-center">
            <div class="col-6 col-sm-6 col-lg-3">
                <div class="item-name">
                    <router-link :to="'/items/' + item.url + '/edit'" class="text-decoration-none">{{ item.name }}</router-link>
                </div>
            </div>
            <div class="col-6 col-sm-6 col-lg-3">
                <div class="item-unit">{{ item.unit.value.name }}</div>
            </div>
            <div class="col-6 col-sm-6 col-lg-2">
                <div class="item-price">${{ item.price }}</div>
            </div>
            <div class="col-6 col-sm-6 col-lg-3">
                <div class="item-added-on">{{ item.addedOn | formatDate }}</div>
            </div>
            <div class="item-options">
                <div class="options-btn">
                    <OptionsIcon @openOptions="showList = !showList" />
                </div>
                <ul class="list-unstyled options-list" :class="{'show-options-list': showList}">
                    <li>
                        <router-link class="text-decoration-none list-item-content" :to="'/items/' + item.url + '/edit'">
                            <EditIcon />
                            <span>edit</span>
                        </router-link>
                    </li>
                    <li>
                        <div class="list-item-content" @click="deleteItem()">
                            <DeleteIcon />
                            <span>delete</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import OptionsIcon from "../../../components/icons/OptionsIcon";
import EditIcon from "../../../components/icons/EditIcon";
import DeleteIcon from "../../../components/icons/DeleteIcon";
import moment from 'moment'

export default {
    name: "ListItem",
    components: {DeleteIcon, EditIcon, OptionsIcon},
    data () {
        return {
            showList: false
        }
    },
    filters: {
        formatDate (date) {
            return moment(date).format('L');
        }
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    methods: {
        deleteItem () {
            this.$emit('deleteItem', this.item.id)
        }
    }
}
</script>

<style scoped>

</style>