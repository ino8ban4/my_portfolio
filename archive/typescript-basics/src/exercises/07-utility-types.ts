//Q1. 
type Post = {
  id: number,
  title: string,
  content: string,
  published: boolean,
}

//Q2.
type partialPost = Partial<Post>;
function updatePost(id: number, updates: Partial<Post>): Post{
  return {id, title: "foo", content: "bar", published: true }
}

//Q3. 
type readonlyPost = Readonly<Post>;

//Q4.
type PostPreview = Pick<Post, "id" | "title">

//Q5.
type DraftPost = Omit<Post, "published">

