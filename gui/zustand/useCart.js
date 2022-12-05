import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const persistOptions = {
    name: 'cart-storage',
    getStorage: () => localStorage,
};

export const useCart = create(
    persist(
        devtools((set, get) => ({
            products: [],
            add: ({ product, quantity }) => {
                const products = get().products;
                const found = products.find((item) => item.product._id === product._id);
                if (found) {
                    found.quantity++;
                } else {
                    products.push({ product, quantity });
                }
                return set({ products: products }, false, { type: 'carts/addToCart' });
            },
            remove: (id) => {
                const products = get().products;
                const newProducts = products.filter((x) => x.product._id !== id);
                return set({ products: newProducts }, false, { type: 'carts/removeFromCart' });
            },
            increase: (id) => {
                const products = get().products;
                const found = products.find((x) => x.product._id === id);
                found.quantity++;
                return set({ products: products }, false, { type: 'carts/increase' });
            },
            decrease: (id) => {
                const products = get().products;
                const found = products.find((x) => x.product._id === id);
                if (found.quantity > 1) {
                    found.quantity--;
                    return set({ products: products }, false, { type: 'carts/decrease' });
                } else {
                    return null;
                }
            },
        })),
        persistOptions,
    ),
);
