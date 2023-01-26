import { useState } from "react";
import "./App.css";
import Form from "./components/form/Form";
import TablePage from "./components/TablePage/TablePage";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    from: "",
    to: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const submitHandler = () => {
    setFormSubmitted(true);
    console.log(formData);
  };

  return (
    <div className="App">
      {formSubmitted ? (
        <TablePage formData={formData} setSubmittedForm={setFormSubmitted} />
      ) : (
        <Form
          formData={formData}
          setFormData={setFormData}
          onSubmit={submitHandler}
        />
      )}
    </div>
  );
}

export default App;
