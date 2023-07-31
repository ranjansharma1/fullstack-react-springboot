class AdminResponseModel {
    questionId: number;
    response: string;
    constructor(questionId: number, response: string) {
        this.questionId = questionId;
        this.response = response;
    }

}
export default AdminResponseModel;