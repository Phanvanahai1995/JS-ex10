// Bài 1, 2 giống bài lần trước nên không làm nhé

// Bài 3
Array.prototype.push2 = function (...args) {
  for (let i = 0; i < args.length; i++) {
    this[this.length] = args[i];
  }
};

var arr1 = [1, 2];

arr1.push2(3, 4);
console.log(arr1);

// Bài 4
var arr2 = [1, 2, 3, 4, 5, 6];

Array.prototype.filter2 = function (fn) {
  if (typeof fn !== "function") return;
  let result = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

const result = arr2.filter2(function (num) {
  return num > 3;
});

console.log(result);

// Bài 5
var categories = [
  {
    id: 1,
    name: "Chuyên mục 1",
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    children: [
      {
        id: 4,
        name: "Chuyên mục 2.1",
      },
      {
        id: 5,
        name: "Chuyên mục 2.2",
        children: [
          {
            id: 10,
            name: "Chuyên mục 2.2.1",
          },
          {
            id: 11,
            name: "Chuyên mục 2.2.2",
          },
          {
            id: 12,
            name: "Chuyên mục 2.2.3",
          },
        ],
      },
      {
        id: 6,
        name: "Chuyên mục 2.3",
      },
    ],
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    children: [
      {
        id: 7,
        name: "Chuyên mục 3.1",
      },
      {
        id: 8,
        name: "Chuyên mục 3.2",
      },
      {
        id: 9,
        name: "Chuyên mục 3.3",
      },
    ],
  },
];

const dataTre = function (data, parent = 0) {
  let result1 = [];
  let result2 = [];
  let category = {};
  data.forEach((item) => {
    category = {
      id: item.id,
      name: item.name,
      parent: parent,
    };

    result1.push(category);
    let child = [];
    if (item.children) {
      let child = dataTre(item.children, item.id);
      result2.push(...child);
    }
  });

  return result1.concat(result2);
};

const data = dataTre(categories);

const menu = document.querySelector("#menu");
let html = "";

const dataTre2 = function (data, parent = 0, level = 0) {
  let result = [];
  data.forEach((item) => {
    if (item.parent === parent) {
      result.push(item);
      item.level = level;
      let child = dataTre2(data, item.id, level + 1);
      result = result.concat(child);
    }
  });

  return result;
};

const listMenu = dataTre2(data);

listMenu.forEach((item) => {
  let decorate = "-|-";
  html = `
  <option value="">${decorate.repeat(item.level)}${item.name}</option>
  `;
  menu.insertAdjacentHTML("beforeend", html);
});
