// Q1
type ID = string | number;

// Q2
type User = {
  name : string;
  age? : number;
  role : "admin" | "guest";
}

// Q3
function convID(id: ID): string {
  if(typeof id == "string"){
    return id.toUpperCase();
  }else {
    return id.toFixed(2);
  }
}
