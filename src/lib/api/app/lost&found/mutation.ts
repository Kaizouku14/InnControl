
export const issueLostItem = async ({ ...params } : {
    item_lost: string,
    item_color : string,
    issued_date : Date,
    room_no : string,
    item_img? : string 
}) => {
   
    console.log(params)
}