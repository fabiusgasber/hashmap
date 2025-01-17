import { LinkedList } from "./linkedlist.js";

class HashMap {

    loadFactor = 0.75;

    constructor(capacity = 16){
        this.buckets = new Array(capacity).fill(null);
        this.capacity = this.buckets.length;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
     
        return hashCode;
    }
