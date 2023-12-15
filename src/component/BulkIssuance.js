import { useState, useEffect } from "react";
import { Button, Card, CloseButton, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
import "../assets/css/Bulk.css";
import "bootstrap/dist/css/bootstrap.min.css";
let tid;
let did
const BulkIssuance = () => {
  const [shot,setShot]= useState(false)
  const [c, setC] = useState(true);
  const [tem, setTem] = useState(true);
  const [boo, setBoo] = useState(true);
  const [boo1, setBoo1] = useState(true);
  const [error, setError] = useState([]);
  const [template, setTemplate] = useState([]);
  const [uerro, setUerro] = useState("");
  const [table, setTable] = useState([]);
  const [tableShow, setTableShow] = useState(false);
  useEffect(() => {
    fetchTemplates();
  }, []);
  const fetchTemplates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/templates", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTemplate(response.data);
    } catch (error) {
        localStorage.removeItem('token')
        window.location.href=' '
      setError(error.response.data.message);
    }
  };

  const options = [];
  for (let i = 0; i < template.length; i++) {
    let obj = {};
    obj["value"] = template[i].templateid;
    obj["label"] = template[i].templatename;
    options.push(obj);
  }
  const readExcel = async (file) => {
    const fileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (file) {
      if (
        file &&
        file.size > 0 &&
        file.size < 5000000 &&
        fileTypes.includes(file.type)
      ) {
        const formDatas={file,did:did}
        try {
          const response = await axios.post(
            "http://localhost:5000/api/uploadCertificateRequest",
            formDatas,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setTable(response.data[0]);
          setBoo(false);
          setBoo1(false)
        } catch (error) {
          console.error("Error uploading file:", error);
          setTable(error.response.data[0]);
          setBoo1(false);
        }
      } else {
        if (file.size < 0) {
          setUerro("file is empty");
        }
        if (file.size > 5000000) {
          setUerro("file size is greater than 5mb");
        } else {
          setUerro("file should be in excel format");
        }
      }
    }
  };

  const downloadTemplate = async (templateId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/download-template",
        { templateId: templateId },
        {
          responseType: "arraybuffer",
          headers: {
            Authorization:`Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = 'template.xlsx';
      //console.log(link.download);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };

  const handleSub = async (e) => {
    e.preventDefault();
    setShot(true)
    console.log("k");
  };
  const sChange = (e) => {
    tid = e.value;
    if (e) {
      setTem(false);
    }
  };
  const uChange = (e) => {
    setTable([ ])
    //console.log(e)
    //console.log(e.value)
    did=e.value
    if (e) {
      setC(false);
    }
  };
  const reseter =()=>{
    setTable([])
    setBoo(true)
    setBoo1(true)
  }
  if(!localStorage.token | localStorage.token===null){
    window.location.href=' '
  }
  const logOut=()=>{
    localStorage.removeItem('token')
    if(!localStorage.token){
      window.location.href=' '
    }
  }
  const closer=()=>{
    setShot(false)
  }
  return (
    <Card>
      <Card.Header style={{display:'flex',justifyContent:'space-between'}}>
        <h2>Bulk Issuance</h2>
        <Button onClick={logOut}>logout</Button>
       </Card.Header>
      <Card.Body>
        <h1>Upload Excel Sheet</h1>
        <Form onSubmit={(e) => handleSub(e)}>
          <Select
            placeholder="Template"
            required
            onChange={(e) => {
              uChange(e);
            }}
            options={options}
          ></Select>
          <br />
          <Form.Control
            disabled={c}
            type="file"
            className="choose"
            onChange={(e) => {
              setUerro("");
              const file = e.target.files[0];
              readExcel(file);
            }}
          />
          <br />
          <div style={{ color: "red" }}>{uerro}</div>
          <Button className="up" hidden={boo} type='submit'>
            upload
          </Button>{' '}
          <Button style={{backgroundColor:'gray',border:'none'}}  onClick={reseter} type="reset">
            reset
          </Button>{' '}
          <Button className="up" onClick={()=>setTableShow(true)} hidden={boo1} type='button'>
            View Data
          </Button>
        </Form>
        <Modal show={shot} centered>
          <CloseButton onClick={closer}></CloseButton>
          hello
        </Modal>
        {/* {table && <div>{table.map(n=>n.length===10?<div style={{ color: "red" }}>{n}</div>:n)} </div>}
        <br /> */}
        <Modal show={tableShow}  fullscreen={tableShow}  /* size="xl" */>
          <Modal.Header>
          <h3>Student Details</h3>
            <CloseButton onClick={()=>setTableShow(false)}></CloseButton>
          </Modal.Header>
        <Modal.Body style={{height:'80vh',overflowY:'scroll',}}>
        {table ? (
          table.length ? (
            <div>
              <Table className="table" responsive="xl">
                <tbody>
                  {table.map((individualExcelData, index) => (
                    <tr  key={index}>
                      {Object.keys(individualExcelData).map((key) =>
                        individualExcelData.length === 10 ? (
                          <td
                            style={{ backgroundColor: "rgba(255, 0, 0, 0.8)", color: "white" }}
                            key={key}
                          >
                            {individualExcelData[key]}
                          </td>
                        ) : (
                          <td key={key}>{individualExcelData[key]}</td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

          ) : (
            ""
          )
        ) : (
          <div className="mess"></div>
        )}
        </Modal.Body>
        </Modal>
        <h1>Download Template</h1>
        <Select
          placeholder="Template"
          required
          onChange={(e) => sChange(e)}
          options={options}
        ></Select>
        <br />
        {error && <div style={{ color: "red" }}>{error} </div>}
        <Button onClick={() => downloadTemplate(tid)} disabled={tem}>
          {" "}
          Download Template{" "}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BulkIssuance;
