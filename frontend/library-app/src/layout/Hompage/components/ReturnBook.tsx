import React from "react";
import BookModel from "../../../models/BookModel";

// interface bookModel {
//   id: number;
//   title: string;
//   img: string;
//   description: string;
// }
export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className="text-center col" >
      <img src={props.book.img} width="151" height="233" alt="book" />
      <h6 className="mt-2">{props.book.title}</h6>
      <p>{props.book.description?.slice(0,200)}...</p>
      <a className='btn btn-primary text-white' href='#'>Reserve</a>
    </div>
  );
};
