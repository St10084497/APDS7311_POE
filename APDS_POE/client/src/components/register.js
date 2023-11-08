import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormCheck } from "react-bootstrap";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
// This function will handle the submission.
async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };
  
    await fetch("http://localhost:5050/user/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  
    setForm({ name: "", password: ""});
    navigate("/");
}
  // This following section will display the form that takes the input from the user.
 return (
  <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "black" }}>
  <Card>
    <Card.Body>
       <h3>Register</h3>
     <Form onSubmit={onSubmit}>
     <Form.Group>
      
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
    
        </Form.Group>
       
        <Button type="submit" variant="primary">
        Register
        </Button>
      </Form>
    </Card.Body>
  </Card>
</div>
);
}