import { createRouter, createWebHistory } from 'vue-router'
import { ShoppingCartPage, ProductPage, ProductDetailPage, NotFoundPage } from '../pages';



const routes = [
    {
        path: '/products',
        name: 'products',
        component: ProductPage
    },
    {
        path: '/products/:productId',
        name: 'productDetail',
        component: ProductDetailPage
    },
    {
        path: '/cart',
        name: 'cart',
        component: ShoppingCartPage
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFoundPage',
        component: NotFoundPage
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


export default router;