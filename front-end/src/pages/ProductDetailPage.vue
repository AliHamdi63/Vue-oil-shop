<template>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageURL" />
        </div>
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">{{ product.price }}</h3>
            <h4 v-if="isSucceed" class="succeed">Added to Cart</h4>
            <h4 v-if="isFailed" class="failed">Added to Cart</h4>
            <button @click="addToCart" class="add-to-cart" v-if="!isIncluded">Add to Cart</button>
            <button class="gray-button" v-else>Item is already Selected</button>

        </div>
    </div>
    <div v-else>
        <NotFoundPage />
    </div>
</template>

<script>
import NotFoundPage from './NotFoundPage.vue';
import axios from "axios";


export default {
    name: "ProductDetailPage",
    components: {
        NotFoundPage,

    },
    data() {

        return {
            product: {},
            isSucceed: false,
            isFailed: false,
            cartProducts: []
        }
    },
    methods: {
        async addToCart() {
            await axios.post(`/api/users/${12345}/cart`, { id: this.$route.params.productId })
                .then(() => {
                    this.isSucceed = true;
                    setTimeout(() => this.isSucceed = false, 3000);
                })
                .catch((err) => {
                    this.isFailed = true;
                    setTimeout(() => this.isFailed = false, 3000);
                    console.log(err);
                });

        }
    },
    computed: {
        isIncluded() {
            return this.cartProducts.some(item => item.id === this.$route.params.productId);
        }
    },
    async created() {
        const response = await axios.get(`/api/products/${this.$route.params.productId}`);
        const product = response.data;
        this.product = product;
        const userResponse = await axios.get(`/api/users/${12345}/cart`);
        const cartProducts = userResponse.data;
        this.cartProducts = cartProducts;
    },
}
</script>

<style>
.succeed {
    text-align: center;
    color: green;
}

.failed {
    text-align: center;
    color: red;
}

.gray-button {
    width: 100%;
    margin-top: 16px;
    background-color: lightgrey;
    color: #000;
}
</style>