export enum PageRoutes {

    // Auth
    LOGIN = "/login",
    FORGOT_PASSWORD = "/forgot-password",

    //Admin
    ACCOUNT = "/accounts",
  
    // Front desk 
    DASHBOARD = "/dashboard",
    ROOMS = "/rooms",
    BOOKINGS = "/bookings",
    GUEST = "/guests",
    LOST_AND_FOUND_MANAGEMENT = "/lost-and-found-management",

    // House keeping
    TASKS = "/tasks",
    INVENTORY = "/inventory",

    // Public
    LOST_AND_FOUND = "/lost-and-found",
    REPORTS = "/reports"

  }
  
  export type PageRoute = typeof PageRoutes[keyof typeof PageRoutes]