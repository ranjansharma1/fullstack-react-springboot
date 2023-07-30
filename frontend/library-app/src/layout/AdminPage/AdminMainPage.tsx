import { useState } from "react";
import { AddNewBook } from "./components/AddNewBook";
import { ChangeQuantities } from "./components/ChangeQuantities";
import { AdminMessages } from "./components/AdminMessages";

export const AdminMainPage = () => {
    const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false);

    function addBookClickFunction() {
        setChangeQuantityOfBooksClick(false);
        setMessagesClick(false);
    }

    function changeQuantityOfBooksClickFunction() {
        setChangeQuantityOfBooksClick(true);
        setMessagesClick(false);
    }

    function messagesClickFunction() {
        setChangeQuantityOfBooksClick(false);
        setMessagesClick(true);
    }
    return (
        <section className="container mt-3">
            <h3>Manage Library</h3>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button onClick={addBookClickFunction} className="nav-link active" id="nav-book-tab" data-bs-toggle="tab" data-bs-target="#nav-book" type="button" role="tab" aria-controls="nav-book" aria-selected="true">Add new book</button>

                    <button onClick={changeQuantityOfBooksClickFunction} className="nav-link" id="nav-admin-tab" data-bs-toggle="tab" data-bs-target="#nav-admin" type="button" role="tab" aria-controls="nav-admin" aria-selected="false">Change Quantity</button>
                    
                    <button onClick={messagesClickFunction} className="nav-link" id="nav-massage-tab" data-bs-toggle="tab" data-bs-target="#nav-massage" type="button" role="tab" aria-controls="nav-massage" aria-selected="false">massage Massages</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-book" role="tabpanel" aria-labelledby="nav-book-tab" >
                    <AddNewBook />
                </div>
                <div className="tab-pane fade" id="nav-admin" role="tabpanel" >
                    {changeQuantityOfBooksClick ? <ChangeQuantities /> : <></>}
                </div>
                <div className="tab-pane fade" id="nav-massage" role="tabpanel" >
                    {messagesClick ? <AdminMessages /> : <></>}
                </div>
            </div>


        </section>
    )
}