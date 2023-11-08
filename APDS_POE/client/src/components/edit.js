import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate from react-router-dom
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormCheck } from "react-bootstrap";

export default function Edit() {

  
  const token = localStorage.getItem('token')
  console.log('Token in create', token)

  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();
 
 useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);
  
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
  
      setForm(record);
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      position: form.position,
      level: form.level,
    };
  
    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5050/record/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    navigate("/");

}
  // This following section will display the form that takes input from the user to update the data.
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