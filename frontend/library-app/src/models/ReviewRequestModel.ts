class ReviewRequestModel{
    rating: number;
    bookId: number;
    reviewDescription?: string; //It means it is optional, that user can give or leave it
    constructor(rating: number, bookId: number, reviewDescription?: string){
        this.rating = rating;
        this.bookId = bookId;
        this.reviewDescription=reviewDescription;
    }

}
export default ReviewRequestModel;