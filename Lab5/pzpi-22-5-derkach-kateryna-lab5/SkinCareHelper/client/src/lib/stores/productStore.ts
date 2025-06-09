import { makeAutoObservable } from "mobx";

export class ProductStore {
    constructor() {
        makeAutoObservable(this)
    }
}