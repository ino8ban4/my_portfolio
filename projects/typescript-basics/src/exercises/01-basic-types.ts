//constは定数、letは可変値を扱う
const username: string = "taro"
let age: number = 25
let is_login: boolean = true

// 配列型
const array: string[] = ["apple", "banana", "cherry"]

//Object型
let user: {name:string, age:number, isActive:boolean} =
  { name:"taro", age:25, isActive:true}

// basic function
function add(num1: number,num2: number): number {
  let result_number = num1 + num2;
  return result_number;
}

declare function getData(): unknown;

// unknown型は型チェックするためエラーになる。
// そのためtypeofnによるチェックが必要
let value: unknown = getData();
if(typeof value === "string" ){
  console.log(value.toUpperCase());
}

