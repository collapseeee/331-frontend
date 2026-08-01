import type { UserState, User, Post } from "@/types";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state: () : UserState => ({
    user: null,
    posts: null
  }),
  actions: {
    setUser(user: User): void {
      this.user = user
    },
    setPosts(posts: Post[]): void {
      this.posts = posts
    }
  }
})
