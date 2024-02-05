export const useCart = (id: string, key: boolean, command: boolean = true) => {
    let cart: { id: string; count: number }[] = JSON.parse(localStorage.getItem("cart") || "[]");

    if (key) {
        const itemExists = cart.some((item) => item.id === id);

        if (!itemExists) {
            cart.push({ id: id, count: 1 });
        } else {
            if (command) {
                cart = cart.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item));
            } else {
                cart = cart.map((item) => (item.id === id ? { ...item, count: item.count - 1 } : item));
            }
        }
    } else {
        cart = cart.filter((item) => item.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
};
