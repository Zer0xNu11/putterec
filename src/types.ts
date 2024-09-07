export interface UserType{
  id: number 
  name: string
  email: string 
  password: string
  posts: PostType[];
}

export interface PostType{
    id: string;
    content: string;
    createdAt: string; 
    authorId: string;  
    author: UserType;
    imageUrl? : string;
    totalLikes : number;
    noteId: string;
  }

export interface PostLeafletType{
    id: string;
    content: string;
    imageUrl? : string;
    totalLikes : number
    noteId:     string
    coordinates: [number, number] 
  }

  export interface PlanLeafletType{
    id: string;
    content: string;
    imageUrl? : string;
    totalLikes : number
    planId:     string
    coordinates: [number, number] 
  }

export interface NoteType{
  id: string;
  title: string;
  content?: string;
  createdAt: string; 
  authorId: string;  
  author: UserType;
  imageUrl? : string;
  totalLikes : number
}

export interface PlanType{
  id: string;
  title: string;
  content?: string;
  createdAt: string; 
  userId: string;  
  user: UserType;
  imageUrl? : string;
  totalLikes : number
}

export interface PlanPointType{
  id: string;
  title: string;
  content?: string;
  createdAt: string; 
  userId: string;  
  user: UserType;
  imageUrl? : string;
  postId? : string;
  planId: string;
}

export interface BookType{
  id: string;
  title: string;
  content?: string;
  createdAt: string; 
  authorId: string;  
  author: UserType;
  imageUrl? : string;
  totalLikes : number
}


