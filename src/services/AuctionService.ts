import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getAuctions(perPage: number, page: number) {
    return apiClient.get('/auctionItems?_limit=' + perPage + '&_page=' + page)
  },
  getAuctionByKeyword(keyword: string, perPage: number, page: number) {
    return apiClient.get('/auctionItems?description=' + keyword + '&_limit=' + perPage + '&_page=' + page)
  }
}
