import { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import Select from "react-select";
import '../assets/css/Single.css'
const SingleIssuance = () => {
  const year = new Date();
  const month = String(year.getMonth() + 1).padStart(2, "0");
  const date = String(year.getDate()).padStart(2, "0");
  const years = year.getFullYear();
  const dates = years + "-" + month + "-" + date;
  const [studentObject, setStudentObject] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    College: "",
    RegisterNo: "",
    DateOfBirth: "",
    Degree: "",
    Specialization: "",
    PassedOut: "",
  });
  console.log(studentObject);

  const handleSubmit = (e) => {
    console.log("submitted");
  };

  const onChange = (e) => {
    setStudentObject({ ...studentObject, [e.target.id]: e.target.value });
    console.log(studentObject);
  };
  const sonChange = (e, id) => {
    setStudentObject({ ...studentObject, [id.name]: e.value });
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <>
      <Card>
        <Card.Header>
          <h2>Single Upload</h2>
        </Card.Header>
        <Card.Body>
          <Form className="forms" onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="FirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
				  autoComplete="off"
                  required
                  type="text"
                  placeholder="First name"
                  onChange={onChange}
                  pattern="^[A-Z a-z]+$"
                />
                <span>
                  Please provide First Name.
                </span>
              </Form.Group>
              <Form.Group as={Col} controlId="MiddleName">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
				  autoComplete="off"
                  type="text"
                  placeholder="Middle Name"
                  onChange={onChange}
                  pattern="^[A-Z a-z]+$"
                />
				<span>
                  Please provide Middle Name.
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="LastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
				  autoComplete="off"
                  required
                  type="text"
                  placeholder="Last Name"
                  onChange={onChange}
                  pattern="^[A-Z a-z]+$"
                />
                <span>
                  Please provide Last Name.
                </span>
              </Form.Group>
              <Form.Group as={Col} controlId="DateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
				  autoComplete="off"
                  required
                  type="date"
                  placeholder="DOB"
                  onChange={onChange}
                  max={dates}
                />
                <span>
                  Please choose Date of Birth.
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="College">
                <Form.Label>College Name</Form.Label>
                <Select
                  required
                  onChange={(e, name) => sonChange(e, name)}
                  name="College"
                  options={options}
                ></Select>
                <span>
                  Please choose College.
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="Degree">
                <Form.Label>Degree</Form.Label>
                <Select
				  autoComplete="off"
                  required
                  name="Degree"
                  onChange={(e, name) => sonChange(e, name)}
                  options={options}
                ></Select>
                <span>
                  Please choose Degree.
                </span>
              </Form.Group>
              <Form.Group as={Col} controlId="Specialization">
                <Form.Label>Specialization</Form.Label>
                <Select
				  autoComplete="off"
                  required
                  name="Specialization"
                  onChange={(e, name) => sonChange(e, name)}
                  options={options}
                ></Select>
                <span>
                  Please choose Specialization.
                </span>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="RegisterNo">
                <Form.Label>Register No</Form.Label>
                <Form.Control
				  autoComplete="off"
                  required
                  type="text"
                  placeholder="Reg.No"
                  onChange={onChange}
                  pattern="^[A-Z a-z 0-9]*$"
                />
                <span>
                  Please provide Reg.No
                </span>
              </Form.Group>
              <Form.Group as={Col} controlId="PassedOut">
                <Form.Label>Passed Out</Form.Label>
                <Form.Control
				  autoComplete="off"
                  required
                  type="number"
                  placeholder="Passedout"
                  onChange={onChange}
                  min="1990"
                  max={years}
                />
                <span>
                  Please provide Passed out year
                </span>
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>{" "}
                <Button variant="secondary" type="reset">
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleIssuance;
