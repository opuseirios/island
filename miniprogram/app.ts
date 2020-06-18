// app.ts
import {Token} from "./models/token";

App<IAppOption>({
  globalData: {},
  onLaunch() {
    const token = new Token()
    token.verify() // 展示本地存储能力
  }
})
