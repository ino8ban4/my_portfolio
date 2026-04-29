export {}
// 基本的な型
const name: string = "fuji"
const age: number = 30
const active: boolean = true

console.log(name, age, active)

// type定義
type User = {
  name: string
  age: number
  nickname?: string | null
}

const user: User = { name: "fuji", age: 30 }
console.log(user)
