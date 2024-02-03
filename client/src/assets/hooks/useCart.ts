export const useCart = (id: string, key: boolean) => {
    let cart: { id: string; count: number }[] = JSON.parse(localStorage.getItem("cart") || "[]");

    if (key) {
        const itemExists = cart.some((item) => item.id === id);

        if (!itemExists) {
            cart.push({ id: id, count: 1 });
        } else {
            // Увеличение счетчика, если элемент уже существует
            cart = cart.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item));
        }
    } else {
        cart = cart.filter((item) => item.id !== id);
    }

    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
};
