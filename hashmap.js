import { LinkedList } from "./linkedlist.js";

export class HashMap {

    loadFactor = 0.75;

    constructor(capacity = 16){
        this.buckets = Array.from({ length: capacity }, () => LinkedList());
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
        let node = this.getNode(this.buckets, key);
        if(node) {
            const entry = node.findEntry({ key });
            if(entry) {
                entry.setValue({ key, value })
                return;
            }
            else node.append({ key, value });
        }
        if(this.length() > this.loadFactor * this.capacity) this.grow();
    }

    get(key) {
        const entry = this.getEntry(this.getNode(this.buckets, key), key);
        return entry ? entry.getValue().value : null;
    }

    has(key) {
        const node = this.getNode(this.buckets, key);
        return !!node?.findEntry({ key });
    }

    getNode(arr, key) {
        return arr[this.hash(key)];
    } 

    getEntry(node, key) {
        return node && key ? node.findEntry({ key }) : null;
    }

    grow() {
        const expandingArr = Array.from({length: this.capacity * 2}, () => LinkedList());
        this.capacity = expandingArr.length;
        const entries = this.entries();
        for(let entry of entries){
            const key = entry[0];
            const value = entry[1];
            const node = this.getNode(expandingArr, key);
            node.append({ key, value });
        }
        this.buckets = expandingArr;
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
        this.buckets = Array.from({ length: this.capacity }, () => LinkedList());
    }

    extract(data) {
        const keys = [];
        for(let i = 0; i < this.buckets.length; i++){
            const list = this.buckets[i];
            let curr = list.getHead();
            while(curr) {
                keys.push(data === "entries" ? [curr.getValue().key, curr.getValue().value] : curr.getValue()[data]);
                curr = curr.getNext();
            }
        }
        return keys;
    }

    keys() {
        return this.extract("key");
    }

    values() {
        return this.extract("value");
    }

    entries() {
        return this.extract("entries");
    }
}
