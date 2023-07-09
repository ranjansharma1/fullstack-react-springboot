import libSevice from "../../../images/libService1.jpg"
export const LibraryServices = () => {
    return (
        <div className='container my-5'>
            <div className='row p-4 align-items-center border shadow-lg'>
                <div className='col-lg-7 p-3'>
                    <h1 className='display-4 fw-bold'>
                        Can't find what you are looking for?
                    </h1>
                    <p className='lead'>
                        If you cannot find what you are looking for,
                        send our library admin's a personal message!
                    </p>
                    <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
                        <a className='btn btn-primary btn-lg text-white' href='#'>
                            Sign up
                        </a>
                    </div>
                </div>
                <div className='col-lg-4 offset-lg-1 shadow-lg image-container' style={{ height: "300px"}}>
                    <img src={libSevice} alt="" className="image-fluid h-100 w-100 " style={{objectFit:"contain"}}/>
                </div>
            </div>
        </div>
    );
}