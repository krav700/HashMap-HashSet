import { LinkedList } from "../Linked-Lists/Linked_List.js";

function HashMap(loadFactor = 0.75, capacity = 16) {
  let buckets = new Array(capacity).fill(null).map(() => LinkedList());
  let load = Math.round(loadFactor * capacity);
  let entriesCount = 0;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= capacity;
    }

    if (hashCode < 0 || hashCode >= buckets.length) {
        throw new Error("Trying to access index out of bounds");
    }

    return hashCode;
  }

  function set(key, value) {
    const hashCode = hash(key);

    if (entriesCount > load) {
      capacity *= 2;
      load = Math.round(loadFactor * capacity);
      let newBuckets = new Array(capacity).fill(null).map(() => LinkedList());

      const keysArray = keys();
      const valuesArray = values();

      for (let i = 0; i < keysArray.length; i++) {
        newBuckets[hash(keysArray[i])].append({
          [keysArray[i]]: valuesArray[i],
        });
      }

      buckets = newBuckets;
    }
    if (has(key)) {
      if (buckets[hashCode].head.value != null) {
        let currentNode = buckets[hashCode].head;
        if (Object.keys(currentNode.value)[0] == key) {
          currentNode.value[key] = value;
        }
      }
    } else {
      buckets[hashCode].append({ [key]: value });
      entriesCount++;
    }
  }

  function get(key) {
    const getValue = buckets[hash(key)];
    if (getValue) {
      let currentNode = getValue.head;
      while (currentNode.nextNode != null) {
        if (Object.keys(currentNode.value)[0] == key) {
          return Object.values(currentNode.value)[0];
        }
        currentNode = currentNode.nextNode;
      }
      if (Object.keys(currentNode.value)[0] == key) {
        return Object.values(currentNode.value)[0];
      }
    }

    return null;
  }

  function has(key) {
    const bucket = buckets[hash(key)];
    if (bucket) {
      if (bucket.head.value != null) {
        let currentNode = bucket.head;
        while (currentNode.nextNode != null) {
          if (Object.keys(currentNode.value)[0] == key) {
            return true;
          }
          currentNode = currentNode.nextNode;
        }
        if (Object.keys(currentNode.value)[0] == key) {
          return true;
        }
      }
    }

    return false;
  }

  function remove(key) {
    const bucket = buckets[hash(key)];
    if (bucket) {
      let currentNode = bucket.head;
      if (Object.keys(currentNode.value)[0] == key) {
        bucket.removeAt(0);
        return true;
      }
      while (currentNode.nextNode.nextNode != null) {
        if (Object.keys(currentNode.nextNode.value)[0] == key) {
          currentNode.nextNode = currentNode.nextNode.nextNode;
          return true;
        }
        currentNode = currentNode.nextNode;
      }
      if (Object.keys(currentNode.nextNode.value)[0] == key) {
        currentNode.nextNode = currentNode.nextNode.nextNode;
        return true;
      }
    }
    return false;
  }

  function length() {
    let len = 0;
    buckets.forEach((bucket) => {
      len += bucket.size();
    });
    return len;
  }

  function clear() {
    for (let i = 0; i < buckets.length; i++) {
      buckets[i] = LinkedList();
    }
  }

  function keys() {
    let keysArray = [];
    buckets.forEach((bucket) => {
      if (bucket.head.value != null) {
        console.log(bucket.head);
        let currentNode = bucket.head;
        while (currentNode.nextNode != null) {
          keysArray.push(Object.keys(currentNode.value)[0]);
          currentNode = currentNode.nextNode;
        }
        keysArray.push(Object.keys(currentNode.value)[0]);
      }
    });

    return keysArray;
  }

  function values() {
    let valuesArray = [];
    buckets.forEach((bucket) => {
      if (bucket.head.value != null) {
        console.log(bucket.head);
        let currentNode = bucket.head;
        while (currentNode.nextNode != null) {
          valuesArray.push(Object.values(currentNode.value)[0]);
          currentNode = currentNode.nextNode;
        }
        valuesArray.push(Object.values(currentNode.value)[0]);
      }
    });

    return valuesArray;
  }

  function entries() {
    let output = "[";

    buckets.forEach((bucket) => {
      if (bucket.head.value != null) {
        let currentNode = bucket.head;
        while (currentNode.nextNode != null) {
          output += `[${Object.keys(currentNode.value)[0]}, ${
            Object.values(currentNode.value)[0]
          }], `;
          currentNode = currentNode.nextNode;
        }
        output += `[${Object.keys(currentNode.value)[0]}, ${
          Object.values(currentNode.value)[0]
        }], `;
      }
    });

    output = output.slice(0, -2);
    output += "]";
    if (output == "]") {
      return "[]";
    }
    return output;
  }

  return {
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}
