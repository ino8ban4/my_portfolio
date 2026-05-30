export {}
// Q1
type User= {
  id: number;
  name:string;
};

// Q2.
async function fetchUser() : Promise<User>{
  const user: User = {id: 1, name: "taro"};
  return user;
};

//Q3. 

async function main(): Promise<void>{
  const user = await fetchUser();
  console.log(user;
};

main()
