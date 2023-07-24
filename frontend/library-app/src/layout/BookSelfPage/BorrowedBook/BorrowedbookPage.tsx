import { BorrowedSingleBookItem } from "./component/BorrowedSingleBookItem"

export const BorrowedbookPage = () => {
    return (
        <div className="container mt-3 ">
            <h4>Current Books:</h4>
            <BorrowedSingleBookItem/>
        </div>
    )
}