function hashIt(key, bucketsLength) {
  const primeNum = 17;
  let hashCode = 0;

  for (let i = 0; i < key.length; i++) {
    hashCode = hashCode * primeNum + key.charCodeAt(i);
  }

  return hashCode % bucketsLength;
}

class hashMap {
  constructor() {
    this.buckets = new Array(20);
    this.size = 0;
  }

  checkLoad() {
    let loadFac = this.size / this.buckets.length;
    if (loadFac > 0.8) {
      let newBuckets = new Array(this.buckets.length * 2);
      this.buckets.forEach((bucket) => {
        if (bucket) {
          bucket.forEach(([key, value]) => {
            let idx = hashIt(key, newBuckets.length);
            if (!newBuckets[idx]) {
              newBuckets[idx] = [[key, value]];
            } else {
              newBuckets[idx].push([key, value]);
            }
          });
        }
      });
      this.buckets = newBuckets;
    }
  }

  set(key, value) {
    let idx = hashIt(key, this.buckets.length);
    if (!this.buckets[idx]) {
      this.buckets[idx] = [[key, value]];
      this.size++;
    } else if (this.buckets[idx].find((item) => item[0] === key)) {
      this.buckets[idx].find((item) => item[0] === key)[1] = value;
    } else {
      this.buckets[idx].push([key, value]);
      this.size++;
    }
    this.checkLoad();
  }

  get(keyToFind) {
    let idx = hashIt(keyToFind, this.buckets.length);
    if (this.buckets[idx]) {
      return this.buckets[idx].find((item) => item[0] == keyToFind)[1];
    } else {
      return "not found";
    }
  }
}
