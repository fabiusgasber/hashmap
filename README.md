# HashMap

This repository contains a JavaScript implementation of a HashMap data structure.

## Description

This project implements a HashMap using a two-dimensional array, where each element in the outer array represents a bucket, and each bucket holds a linked list of key-value pairs. This approach effectively handles hash collisions by chaining multiple key-value pairs within the same bucket.

**Key Features:**

- **Hashing:** Utilizes a simple hash function to map keys to bucket indices.
- **Collision Handling:** Implements separate chaining using linked lists within each bucket.
- **Dynamic Resizing:** Automatically resizes the underlying array of buckets when the load factor exceeds a specified threshold.
- **Key-Value Pairs:** Stores key-value pairs within the HashMap.
- **Methods:** Includes methods for:
    - `set(key, value)`: Adds or updates a key-value pair.
    - `get(key)`: Retrieves the value associated with a given key.
    - `has(key)`: Checks if a key exists in the HashMap.
    - `remove(key)`: Removes a key-value pair.
    - `length()`: Returns the number of key-value pairs in the HashMap.
    - `clear()`: Removes all key-value pairs from the HashMap.
    - `keys()`: Returns an array of all keys in the HashMap.
    - `values()`: Returns an array of all values in the HashMap.
    - `entries()`: Returns an array of key-value pairs.