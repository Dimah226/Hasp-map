class Node {
    constructor(key, value, next = null) {
      this.key = key;
      this.value = value;
      this.next = next;
    }
  }
  
  class HashMap {
    constructor(size = 16, loadFactor = 0.75) {
      this.size = size;
      this.loadFactor = loadFactor;
      this.buckets = Array(size).fill(null);
      this.count = 0;
    }
  
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
      }
      return hashCode;
    }
  
    resize() {
      const oldBuckets = this.buckets;
      this.size *= 2;
      this.buckets = Array(this.size).fill(null);
      this.count = 0;
  
      for (const headNode of oldBuckets) {
        let currentNode = headNode;
        while (currentNode) {
          this.set(currentNode.key, currentNode.value);
          currentNode = currentNode.next;
        }
      }
    }
  
    set(key, value) {
      const index = this.hash(key);
      let head = this.buckets[index];
  
      while (head) {
        if (head.key === key) {
          head.value = value;
          return;
        }
        head = head.next;
      }
  
      const newNode = new Node(key, value, this.buckets[index]);
      this.buckets[index] = newNode;
      this.count++;
  
      if (this.count / this.size > this.loadFactor) {
        this.resize();
      }
    }
  
    get(key) {
      const index = this.hash(key);
      let head = this.buckets[index];
  
      while (head) {
        if (head.key === key) return head.value;
        head = head.next;
      }
      return null;
    }
  
    has(key) {
      return this.get(key) !== null;
    }
  
    remove(key) {
      const index = this.hash(key);
      let head = this.buckets[index];
      let prev = null;
  
      while (head) {
        if (head.key === key) {
          if (prev) {
            prev.next = head.next;
          } else {
            this.buckets[index] = head.next;
          }
          this.count--;
          return true;
        }
        prev = head;
        head = head.next;
      }
      return false;
    }
  
    length() {
      return this.count;
    }
  
    clear() {
      this.size=16;
      this.buckets = Array(this.size).fill(null);
      this.count = 0;
    }
  
    keys() {
      const keys = [];
      for (const headNode of this.buckets) {
        let currentNode = headNode;
        while (currentNode) {
          keys.push(currentNode.key);
          currentNode = currentNode.next;
        }
      }
      return keys;
    }
  
    values() {
      const values = [];
      for (const headNode of this.buckets) {
        let currentNode = headNode;
        while (currentNode) {
          values.push(currentNode.value);
          currentNode = currentNode.next;
        }
      }
      return values;
    }
  
    entries() {
      const entries = [];
      for (const headNode of this.buckets) {
        let currentNode = headNode;
        while (currentNode) {
          entries.push([currentNode.key, currentNode.value]);
          currentNode = currentNode.next;
        }
      }
      return entries;
    }
  }
  

  const test = new HashMap();
  test.set('apple', 'red');
  test.set('banana', 'yellow');
  test.set('carrot', 'orange');
  test.set('dog', 'brown');
  test.set('elephant', 'gray');
  test.set('frog', 'green');
  test.set('grape', 'purple');
  test.set('hat', 'black');
  test.set('ice cream', 'white');
  test.set('jacket', 'blue');
  test.set('kite', 'pink');
  test.set('lion', 'golden');
  

  test.set('apple', 'green');
  test.set('banana', 'green');
  

  test.set('moon', 'silver');
  
  console.log(test.get('moon')); 
  console.log(test.has('apple')); 
  console.log(test.remove('dog')); 
  console.log(test.length()); 
  console.log(test.keys());
  console.log(test.values()); 
  console.log(test.entries()); 
  