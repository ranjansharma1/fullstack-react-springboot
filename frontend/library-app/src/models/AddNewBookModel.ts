class AddNewBookModel {
    title: string;
    author: string;
    description: string;
    copies: number;
    category: string;
    img?: any; // '?' means Its is optional to add
    constructor(title: string, author: string, description: string, copies: number, category: string) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.category = category;
    }
}
export default AddNewBookModel;