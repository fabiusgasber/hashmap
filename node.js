export const createNode = ({ value }, next) => {

    const getValue = () => value;
    const setValue = (newValue) => value = newValue;
    const getNext = () => next;
    const setNext = (nextNode) => next = nextNode;

    return { getValue, setValue, getNext, setNext };
}