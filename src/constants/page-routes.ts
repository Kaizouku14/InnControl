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
    ISSUE_LOST_AND_FOUND = "/issue-lost-and-found",
    REPORTS = "/reports",
    SETTINGS = "/settings",

  }
  
  export type PageRoute = typeof PageRoutes[keyof typeof PageRoutes]