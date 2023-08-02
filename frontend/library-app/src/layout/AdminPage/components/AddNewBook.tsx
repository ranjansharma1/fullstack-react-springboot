import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react"
import AddNewBookModel from "../../../models/AddNewBookModel";
import AlertMassage from "../../Utils/AlertMassage";

export const AddNewBook = () => {
  const { authState } = useOktaAuth();

  //New Book UseState
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [copies, setCopies] = useState(0);
  const [category, setCategory] = useState('')
  const [img, setImg] = useState<any>(null)

  //Display warning massages
  const [displayWarning, setDisplayWarning] = useState(false);
  const [alertMassage, setAlertMassage] = useState("")

  const baseURL: string = "http://localhost:8080/api";

  async function submitNewBook(event: any) {
    event.preventDefault();
    const url: string = `${baseURL}/admin/secure/newBook`;
    if (authState?.isAuthenticated && title !== '' && author !== '' && description !== '' && copies >= 0 && category !== '') {
      const newBook: AddNewBookModel = new AddNewBookModel(title, author, description, copies, category);
      newBook.img = img;
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
      };
      const response = await fetch(url, requestOptions);
      if (!response.ok)
        throw new Error("Something Went Wrong");
      setTitle('');
      setAuthor('');
      setDescription('');
      setCopies(0);
      setCategory('');
      setImg(null);
      console.log("Book Added successfully")

      //Display Warning message
      setDisplayWarning(true)
      setAlertMassage("Book Submitted successfully")
      // Hide the alert after 3 seconds
      setTimeout(() => {
        setDisplayWarning(false);
        setAlertMassage("");
      }, 3000);
    }
  }

  function base64ConversionForImage(event: any) {
    console.log(event);
    // Get the selected file from the input field
    const file = event.target.files?.[0];

    if (file) {
      // Create a new FileReader object to read the selected file
      let reader = new FileReader();
      // When the file reading is complete, the 'onloadend' event will be triggered
      // This block executes if there is an error during the file reading
      reader.onload = () => {
        // The result of the file reading is a base64-encoded string  which represents the contents of the file as a data URL. This data URL can be used to display the image directly in the browser or to send it to the server as a base64 string.

        // Set the base64 string to the 'img' state using 'setImg' This will update the 'img' state with the base64 string representing the selected image.
        setImg(reader.result);
      };

      // This block executes if there is an error during the file reading
      reader.onerror = (error: any) => {
        console.log("Error: " + error.massage);
      }

      // Start reading the selected file as a data URL (base64-encoded)
      // The 'readAsDataURL' method triggers the 'onloadend' event when it's done reading the file.
      reader.readAsDataURL(file);
    }
  }

  function categoryField(value: string) {
    setCategory(value);
    console.log("Category: " + value);
  }


  return (
    <div>
      <div className="card rounded m-3">
        {displayWarning && <AlertMassage massage={alertMassage} />}
        <div className="card-header">
          Add a New Book
        </div>
        <div className="card-body">
          <form className="row g-3 was-validated" method="POST" >
            <div className="col-md-6">
              <label htmlFor="validationAuthor" className="form-label">Title</label>
              <input onChange={e => setTitle(e.target.value)} value={title} type="text" className="form-control" id="validationAuthor" required />
            </div>
            <div className="col-md-3">
              <label htmlFor="validationAuthor" className="form-label">Author</label>
              <input onChange={e => setAuthor(e.target.value)} value={author} type="text" className="form-control" id="validationAuthor" required />
            </div>
            <div className="col-md-3">
              <label htmlFor="validationCategory" className="form-label">Category</label>
              <select className="form-select" aria-label="Default select example" id="validationCategory" defaultValue="" required
                onChange={(e) => categoryField(e.target.value)} // Use 'onChange' event on the 'select' element
              >
                <option value="">All</option>
                <option value="FE">Frontend</option>
                <option value="BE">Backend</option>
                <option value="Data">Data Science</option>
                <option value="Devops">Devops</option>
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="validationDesc" className="form-label">Description</label>
              <textarea onChange={e => setDescription(e.target.value)} value={description} className="form-control" id="validationDesc" required rows={3} />
            </div>
            <div className="col-md-5">
              <label htmlFor="validationCopies" className="form-label">Copies</label>
              <input onChange={e => setCopies(Number(e.target.value))} value={copies} type="number" className="form-control" id="validationCopies" style={{ width: "200px" }} required />
            </div>
            <div className="col-md-6">
              <label htmlFor="validationImage" className="form-label">Upload Image</label>
              <input type="file" className="form-control" aria-label="file example" id="validationImage" onChange={e => base64ConversionForImage(e)} />
            </div>
            <div className="col-12 mt-5" >
              <button
                disabled={!authState?.isAuthenticated || title === "" || author === "" || description === "" || category === ""}
                onClick={submitNewBook}
                className="btn btn-primary w-100"
                type="submit" >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}