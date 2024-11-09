export enum PageRoutes {

    // Auth
    LOGIN = "/",
    REGISTER = "/register",
    FORGOT_PASSWORD = "/forgot-password",
  
    // App
    DASHBOARD = "/dashboard",
    ROOMS = "/rooms",
    BOOKINGS = "/bookings",
    GUEST = "/guests",
    PARKINGS = "/parkings",
    TASKS = "/tasks",
    ACCESSORIES = "/accesories"

  }
  
  export type PageRoute = typeof PageRoutes[keyof typeof PageRoutes]