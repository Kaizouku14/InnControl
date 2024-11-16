export enum PageRoutes {

    // Auth
    LOGIN = "/login",
    FORGOT_PASSWORD = "/forgot-password",
  
    // front desk
    DASHBOARD = "/dashboard",
    ROOMS = "/rooms",
    BOOKINGS = "/bookings",
    GUEST = "/guests",
    PARKINGS = "/parkings",

    //house keeping 
    TASKS = "/tasks",
    INVENTORY = "/inventory",

    //both
    LOST_AND_FOUND = "/lost-and-found",
    REPORTS = "/reports"

  }
  
  export type PageRoute = typeof PageRoutes[keyof typeof PageRoutes]