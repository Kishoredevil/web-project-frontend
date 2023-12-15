import { Container, Row} from "react-bootstrap";
//import SingleIssuance from "./SingleIssuance";
import BulkIssuance from "./BulkIssuance";

const Issuance = () => {
  return (
    <Container>
      <Row>
          <BulkIssuance />
        {/* <Col md={4}>
          <SingleIssuance />
        </Col> */}
      </Row>
    </Container>
  );
};

export default Issuance;