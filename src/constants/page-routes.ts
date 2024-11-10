export enum PageRoutes {

    // Auth
    LOGIN = "/login",
    REGISTER = "/register",
  
    // App
    DASHBOARD = "/dashboard",
    ROOMS = "/rooms",
    BOOKINGS = "/bookings",
    GUEST = "/guests",
    PARKINGS = "/parkings",
    TASKS = "/tasks",
    INVENTORY = "/inventory"

  }
  
  export type PageRoute = typeof PageRoutes[keyof typeof PageRoutes]