export interface ITransaction {
    room_no : string,
    room_type : string,
    check_in : Date,
    check_out : Date,
    no_of_nights : number,
    additional_services : 'Breakfast' | null,
    booking_type : 'Online' | 'Walk-in',
    payment_method : 'Cash' | 'Credit-card' | 'E-Cash',
    payment_amount : number,
    last_name : string,
    first_name : string,
    email : string,
    contact_no : string,
    address: string,
    discount: 'pwd' | 'senior' | null,
}
