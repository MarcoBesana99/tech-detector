import Api from "./Api"
import env from "../env"

export default {
  hostDetection(url) {
    return Api.get('Host?key=' + env.ApiKey + '&url=' + url, { crossdomain: true })
  }
}