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
            add: ({ productId, name, price, image, size, quantity }) => {
                const products = get().products;
                const found = products.find((item) => item.productId === productId);
                if (found) {
                    found.quantity++;
                } else {
                    products.push({ productId, name, price, image, size, quantity });
                }
                return set({ products: products }, false, { type: 'carts/addToCart' });
            },
            remove: (id) => {
                const products = get().products;
                const newProducts = products.filter((x) => x.productId !== id);
                return set({ products: newProducts }, false, { type: 'carts/removeFromCart' });
            },
            increase: (id) => {
                const products = get().products;
                const found = products.find((x) => x.productId === id);
                found.quantity++;
                return set({ products: products }, false, { type: 'carts/increase' });
            },
            decrease: (id) => {
                const products = get().products;
                const found = products.find((x) => x.productId === id);
                if (found.quantity > 1) {
                    found.quantity--;
                    return set({ products: products }, false, { type: 'carts/decrease' });
                } else {
                    return null;
                }
            },
            sum: () => {
                const products = get().products;

                let cartTotal = products.reduce((total, { quantity, price }) => {
                    const productTotal = price * quantity;
                    total += productTotal;
                    return total;
                }, 0);

                return set({ subTotal: cartTotal }, false, { type: 'carts/total' });
            },
            clear: () => {
                set({ products: [] }, false, { type: 'carts/clear' });
            },
        })),
        persistOptions,
    ),
);
