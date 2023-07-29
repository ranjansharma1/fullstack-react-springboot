import { PostQuestion } from "./component/PostQuestion"
import { ResponsePage } from "./component/ResponsePage"

export const ServicesPage = () => {
    return (
        <section className="container mt-3">
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-queries-tab" data-bs-toggle="tab" data-bs-target="#nav-queries" type="button" role="tab" aria-controls="nav-queries" aria-selected="true">Submit Your Queries</button>
                    <button className="nav-link" id="nav-response-tab" data-bs-toggle="tab" data-bs-target="#nav-response" type="button" role="tab" aria-controls="nav-response" aria-selected="false">QA Responds/Pending</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-queries" role="tabpanel" aria-labelledby="nav-queries-tab" >
                    <PostQuestion />
                </div>
                <div className="tab-pane fade" id="nav-response" role="tabpanel" aria-labelledby="nav-response-tab" >
                    <ResponsePage />
                </div>
            </div>
        </section>
    )
}