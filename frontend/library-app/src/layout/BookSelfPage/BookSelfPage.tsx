
/**
 * This is Bootstrap tab css, that is being use for styling
 *
 */

import { BorrowedbookPage } from "./BorrowedBook/BorrowedbookPage";

export const BookSelfPage = () => {

    return (
        <section className="container mt-3">
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-borrowed-tab" data-bs-toggle="tab" data-bs-target="#nav-borrowed" type="button" role="tab" aria-controls="nav-borrowed" aria-selected="true">Borrowed Books</button>
                    <button className="nav-link" id="nav-history-tab" data-bs-toggle="tab" data-bs-target="#nav-history" type="button" role="tab" aria-controls="nav-history" aria-selected="false">Your Book History</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-borrowed" role="tabpanel" aria-labelledby="nav-borrowed-tab" >
                    <BorrowedbookPage/>
                </div>
                <div className="tab-pane fade" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas illo itaque quod magnam quasi. Autem unde corporis provident libero, perspiciatis atque reprehenderit qui enim recusandae commodi reiciendis modi impedit rem? Molestiae laboriosam excepturi odio atque, eveniet saepe autem dolore dicta ab dolor quae magni exercitationem facilis deserunt cupiditate perspiciatis veritatis obcaecati eligendi esse iste ducimus! Perferendis nihil enim repellendus necessitatibus. ...</div>
            </div>


        </section>
    );
};