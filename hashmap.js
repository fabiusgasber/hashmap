import { LinkedList } from "./linkedlist.js";

class HashMap {

    loadFactor = 0.75;

    constructor(capacity = 16){
        this.buckets = new Array(capacity).fill(LinkedList());
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

    set(key, value) {
        const index = this.hash(key);
        let node = this.buckets[index];
        if(node && node.findEntry({ key })){
            const entry = node.findEntry({ key });
            entry.setValue({ key, value });
        }
        else if(node && !(node.findEntry({ key }))){
            node.append({ key, value });
        }
    }

    get(key) {
        const index = this.hash(key);
        const node = this.buckets[index];
        const entry = node?.findEntry({ key })
        return node && entry ? entry.getValue().value : null;
    }

    has(key) {
        const index = this.hash(key);
        const node = this.buckets[index];
        return !!node?.findEntry({ key });
    }

    remove(key) {
        const index = this.hash(key);
        const list = this.buckets[index];
        const entry = list?.findEntry({ key })
        if(list && entry) {
            list.removeAt(list.find(entry));
            return true;
        }
        return false;
    }

    length() {
        let length = 0;
        for(let i = 0; i < this.buckets.length; i++){
            length += this.buckets[i].size();
        }
        return length;
    }

    clear() {
        this.buckets.fill(LinkedList())
    }
}
