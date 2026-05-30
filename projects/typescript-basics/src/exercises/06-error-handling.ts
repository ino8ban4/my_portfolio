//Q1
export {}
// Q1
type User = {
  id: number;
  name: string;
 }



//Q2
async function fetchUser(): Promise<User>{

  try{
 /return { id: 1, name: "taro"}
  }catch(e){
    if(e instanceof Error){
    console.error(e.message);
    }
    throw e;
  }
}


//Q3
type Result<T> = { success: true; data: T } | { success: false; error: string };


//Q4
async function fetchUserSafe(): Promise<Result<User>>




