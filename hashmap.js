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
        if(this.length() >= this.loadFactor * this.capacity) {
            const expandingArr = Array.from({length: this.capacity * 2}, () => LinkedList());
            this.capacity = expandingArr.length;
            const entries = this.entries();
            for(let entry of entries){
                const key = entry[0];
                const value = entry[1];
                const index = this.hash(key);
                const node = expandingArr[index];
                node.append({ key, value });
            }
            this.buckets = expandingArr;
        }
        const index = this.hash(key);
        let node = this.buckets[index];
        if(node && node.getHead()){
            const entry = node.findEntry({ key });
            if(entry) entry.setValue({ key, value });
            else node.append({ key, value });
            return;
        }
        node.append({ key, value });
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
        this.buckets = Array.from({ length: this.capacity }, () => LinkedList());
    }

    keys() {
        const keys = [];
        for(let i = 0; i < this.buckets.length; i++){
            const list = this.buckets[i];
            let curr = list.getHead();
            while(curr) {
                keys.push(curr.getValue().key);
                curr = curr.getNext();
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for(let i = 0; i < this.buckets.length; i++){
            const list = this.buckets[i];
            let curr = list.getHead();
            while(curr) {
                values.push(curr.getValue().value);
                curr = curr.getNext();
            }
        }
        return values;
    }

    entries() {
        const values = [];
        for(let i = 0; i < this.buckets.length; i++){
            const list = this.buckets[i];
            let curr = list.getHead();
            while(curr) {
                values.push([curr.getValue().key, curr.getValue().value]);
                curr = curr.getNext();
            }
        }
        return values;
    }
}
