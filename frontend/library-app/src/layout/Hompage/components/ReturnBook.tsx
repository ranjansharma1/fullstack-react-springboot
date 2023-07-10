import React from "react";

interface bookModel {
  id: number;
  title: string;
  image: string;
  description: string;
}
export const ReturnBook: React.FC<{ book: bookModel }> = (props) => {
  return (
    <div className="text-center col">
      <img src={props.book.image} width="151" height="233" alt="book" />
      <h6 className="mt-2">{props.book.title}</h6>
      <p>{props.book.description}</p>
      <a className='btn btn-primary text-white' href='#'>Reserve</a>
    </div>
  );
};
