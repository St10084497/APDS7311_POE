import React, { useState } from "react";
import { useNavigate } from "react-router";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormCheck } from "react-bootstrap";

export default function Create() {

  const token = localStorage.getItem('token')
  console.log('Token in create', token)

 const [form, setForm] = useState({
   username: "",
   position: "",
   level: "",
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
    await fetch("http://localhost:5050/record/create", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Authorization": token,
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
    setForm({ name: "", position: "", level: "" });
   navigate("/recordList");
 }
  // This following section will display the form that takes the input from the user.
 return (
  <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "black" }}>
  <Card>
    <Card.Body>
      <h3>Create New Record</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <div>
            <Form.Check
              type="radio"
              label="Intern"
              name="positionOptions"
              id="positionIntern"
              value="Intern"
              checked={form.level === "Intern"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <Form.Check
              type="radio"
              label="Junior"
              name="positionOptions"
              id="positionJunior"
              value="Junior"
              checked={form.level === "Junior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <Form.Check
              type="radio"
              label="Senior"
              name="positionOptions"
              id="positionSenior"
              value="Senior"
              checked={form.level === "Senior"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
          </div>
        </Form.Group>
        <Button type="submit" variant="primary">
          Create Person
        </Button>
      </Form>
    </Card.Body>
  </Card>
</div>
);
}