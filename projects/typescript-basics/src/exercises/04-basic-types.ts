// Q1. 
function first<T>(arr: T[]) : T {
  return arr[0]
}

// Q2.
type Wrapper<T> = {
  value? : T;
  label: string;
}

const strWrapper: Wrapper<string> = { value : "123", label : "foo"};
const numberWrapper: Wrapper<number> = { value : 456, label : "bar"};

// Q3.
function getID<T extends {id: number}>(item: T): number{
  return item.id;
}


