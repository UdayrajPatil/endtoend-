import { Cookies } from "@/services/cookies"
export const init = {
    isLoggedIn: Cookies.hasActiveSession(),
    isShowLoader: false,
    user: {}
}