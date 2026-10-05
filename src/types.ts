export interface Event {
  id: number | null
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: Organizer
  images: string[]
}

export interface Student {
  id: number
  studentId: string
  name: string
  surname: string
  gpa: number
  image: string // comes as firebase https url.
  penAmount: number
  description: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
  organizer: string
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface MessageState {
  message: string;
}

export interface EventState {
  event: Event | null
}

export interface UserState {
  user: User | null
  posts: Post[] | null
}

export interface Organizer {
  id: number | null
  name?: string
  roles: string[]
  organizationName?: string
  address?: string
  images: string[]
}

export interface Auction {
  id: number
  description: string
  type: string
  bids: Bid[]
  successfulBid: Bid | null
}

export interface Bid {
  id: number
  amount: number
  datetime: string
}
