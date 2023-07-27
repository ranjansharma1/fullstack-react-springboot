import BookModel from "./BookModel";

class BorrowedBook{
    daysLeft:number;
    book:BookModel;
    constructor(daysleft:number, book:BookModel){
        this.daysLeft = daysleft;
        this.book = book;
    }
}
export default BorrowedBook;