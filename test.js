const data = [
  { id: 1, name: "manucho" },
  { id: 2, name: "moses" },
  { id: 3, name: "dan" },
];

const x = data.filter(function (item) {
  return item.id === 1;
});

const z = data.filter((item) => item.id === 1);

console.log(z);
console.log(x);

let items = []
let itemsLength = 50
let pages = itemsLength / 10
let obj = {}

for (let i = 1; i <= 50; i++){
    items.push(i)
    if (i % 10 === 0) {
        obj[i/10] = i
    }
}

console.log(obj)

console.log(items.slice(0, obj["1"]))
console.log(items.slice(10, obj["2"]))
console.log(items.slice(20, obj["3"]))
console.log(items.slice(30, obj["4"]))
console.log(items.slice(40, obj["5"]))