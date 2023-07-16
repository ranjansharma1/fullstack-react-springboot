import React from "react";
import BookModel from "../../../models/BookModel";
import book1 from "../../../images/BooksImages/book1.png";
import { Link } from "react-router-dom";

// interface bookModel {
//   id: number;
//   title: string;
//   img: string;
//   description: string;
// }
export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className="text-center col" >
      {props.book.img ? 
                    <img
                        src={props.book.img}
                        width='151'
                        height='233'
                        alt="book"
                    />
                    :
                    <img
                        src={require('../../../images/BooksImages/book1.png')}
                        width='151'
                        height='233'
                        alt="book"
                    />
                }
      <h6 className="mt-2">{props.book.title}</h6>
      <p>{props.book.description?.slice(0,200)}...</p>
      <Link className='btn btn-primary text-white' to={`checkout/${props.book.id}`}>Reserve</Link>
    </div>
  );
};
