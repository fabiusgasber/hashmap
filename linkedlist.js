import { createNode } from "./node.js"

export const LinkedList = () => {

    let head = null;

    const getHead = () => head;

    const getTail = () => {
        if(size() === 0) return null;
        let temp = getHead();
        while(temp.getNext() !== null) temp = temp.getNext();
        return temp;
    }

    const size = () => {
        if(head === null) return 0;
        else {
            let temp = getHead();
            let length = 1;
            while(temp.getNext() !== null) {
                length++;
                temp = temp.getNext();
            }
            return length;
        }
    }

    const append = (value) => {
        if(getHead() === null) prepend(value);
        else {
            let temp = getHead();
            while(temp.getNext() !== null) temp = temp.getNext();
            temp.setNext(createNode({ value }, null));
        }
    }

    const prepend = (value) => {
        if(getHead() === null) head = createNode({ value }, null);
        else {
            const obj = head.getValue();
            const oldHead = createNode({ obj }, head.getNext());
            head = createNode({ value }, oldHead);
        }
    }

    const at = (index) => {
        if(index >= size() || index < 0) return -1;
        let temp = getHead();
        let i = 0;
        while(i <= index) {
            if(i === index) return temp;
            else {
                i++;
                temp = temp.getNext();
            }
        }
    }

    const pop = () => {
        if(size() === 0) return;
        else if(size() === 1) return head = null;
        else if(size() > 1) {
            let temp = getHead();
            while(temp.getNext() !== null) {
                if(temp.getNext().getNext() === null) return temp.setNext(null);
                else temp = temp.getNext();
            }
        }
    }

    const contains = (value) => {
        if(size() === 0) return false;
        else {
            let temp = getHead();
            while(temp && temp.getValue() !== null) {
                if(temp.getValue() === value) return true;
                else temp = temp.getNext();
            }
        }
        return false;
    }

    const find = (value) => {
        if(size() === 0) return null;
        let index = 0;
        let temp = getHead();
        while(temp && temp.getValue() !== null) {
            if(temp.getValue() === value) return index;
            else {
                temp = temp.getNext();
                index++;
            }
        }
        return null;
    }

    const findEntry = (value) => {
        if(size() === 0) return null;
        let entry = getHead();
        while(entry && entry.getValue()) {
            if(entry.getValue().key === value.key) return entry;
            else {
                entry = entry.getNext();
            }
        }
        return null;
    }

    const toString = () => {
        if(size() === 0) return null;
        let temp = getHead();
        let string = "";
        while(temp && temp.getValue() !== null) {
            string += `( ${temp.getValue()} ) -> `
            temp = temp.getNext();
        }
        string += "null"
        return string;
    }

    const insertAt = (value, index) => {
        if(index <= 0) prepend(value);
        else if(index >= size()) append(value);
        else {
            const node = createNode(value, null);
            const previous = at(index - 1);
            const previousNext = previous.getNext();
            previous.setNext(node);
            node.setNext(previousNext);
        }
    }

    const removeAt = (index) => {
        if(index >= size()) pop();
        else if(index <= 0 && size() > 1) {
            const nextNode = at(1);
            getHead().setvalue(nextNode.getValue());
            getHead().setNext(nextNode.getNext());
        }
        else if(index <= 0 && size() <= 1) {
            head = null;
        }
        else {
            const deletedNode = at(index);
            const previousNode = at(index - 1);
            const deletedNext = deletedNode.getNext();
            previousNode.setNext(deletedNext);
        }
    }

    return { 
        append, 
        prepend, 
        getHead, 
        getTail, 
        size, 
        at, 
        pop, 
        contains, 
        find, 
        toString, 
        insertAt, 
        removeAt, 
        findEntry,
    }
}