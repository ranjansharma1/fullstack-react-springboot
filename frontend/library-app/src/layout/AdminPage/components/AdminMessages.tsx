import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react"
import { AdminMassageItem } from "./AdminMassageItem";
import LibraryModel from "../../../models/LibraryModel";

export const AdminMessages = () => {
  const { authState } = useOktaAuth();
  const [responses, setResponses] = useState<LibraryModel[]>([])
  const [isLoadingQuestionResponse, setIsLoadingQuestionResponse] = useState(true);
  const [httpError, sethttpError] = useState(null);

  const baseURL: string = "http://localhost:8080/api";

  useEffect(() => {
    const fetchAdminResponse = async () => {
      if (authState?.isAuthenticated) {
        const url: string = `${baseURL}/libraries/search/findByClosed?closed=false`;
        const requestOptions = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
          }
        };
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const responseData = await response.json();
        setResponses(responseData._embedded.libraries);
        setIsLoadingQuestionResponse(false);
        console.log(responseData._embedded.libraries);

      }
    }
    fetchAdminResponse().catch((error: any) => {
      setIsLoadingQuestionResponse(false);
      sethttpError(error.massage);
    });
  }, [authState])

  if (httpError) {
    return (
      <div className="container m-5 text-center text-danger">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="m-3">
      <h4 className="mt-3">Pending Q/A :</h4>
      {responses.map(response => (
        <AdminMassageItem  key={response.id} response={response}/>
      ))}
    </div>
  )
}