import axios from "axios"
import env from "../env"

let Api = axios.create({
  baseURL: env.BaseUrl
})

export default Api