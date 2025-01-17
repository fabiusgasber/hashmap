import { LinkedList } from "./linkedlist.js";

class HashMap {

    loadFactor = 0.75;

    constructor(capacity = 16){
        this.buckets = new Array(capacity).fill(null);
        this.capacity = this.buckets.length;
    }


