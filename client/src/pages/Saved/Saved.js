import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Article from "../../components/Article";
import axios from "axios";
import path from "path";

class Saved extends React.Component {
  state = {
    searchTerm: "",
    startDate : "",
    endDate   : "",
    articles  : []
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount = () => {
    console.log("componentDidMount");
    let url = "/api/articles";
    axios.get(path.join(__dirname, url))
    .then(results => {this.setState({articles:results.data}) })
    .catch(error => {console.log(error)})
  }  

  render = () => {
    return (
      <Container>

        <Row>
          <Col size="md-12">
            {
              this.state.articles.map((item) => {
                return (
                  <Article title={item.title} 
                           byline={item.byline} 
                           date={(new Date(item.date)).toLocaleDateString()}
                           image={item.image} 
                           url={item.url}
                           saved={item.saved} />);
              })
            }

          </Col>
        </Row>

      </Container>
    );
  }
}

export default Saved;