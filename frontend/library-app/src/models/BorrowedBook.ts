import BookModel from "./BookModel";

class BorrowedBook{
    daysLeft:number;
    book:BookModel;
    checkoutDate:string;
    constructor(daysleft:number, book:BookModel, checkoutDate:string){
        this.daysLeft = daysleft;
        this.book = book;
        this.checkoutDate = checkoutDate;
    }
}
export default BorrowedBook;