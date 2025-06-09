import { createContext } from "react";
import { UiStore } from "./uiStore";
import { ProductStore } from "./productStore";

interface Store {
    uiStore: UiStore
    productStore: ProductStore
}

export const store: Store = {
    uiStore: new UiStore(),
    productStore: new ProductStore()
}

export const StoreContext = createContext(store);