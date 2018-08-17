import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Article from "../../components/Article";
import axios from "axios";
import path from "path";

class Search extends React.Component {
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

  okClick = () => {
    let url = "/api/nyt?q=" + this.state.searchTerm + "&startDate=" + this.state.startDate + "&endDate=" + this.state.endDate;
    axios.get(path.join(__dirname, url))
    .then(results => {this.setState({articles:results.data}) })
    .catch(error => {console.log(error)})
  }

  render = () => {
    return (
      <Container>
        <Row>
          <Col size="md-2" />
          <Col size="md-6">
            <h3>Enter Search Criteria</h3>

            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="search-term-label">Search Term:</span>
              </div>
              <input type="text" className="form-control" placeholder="subject, etc" 
                     aria-label="Search Term" aria-describedby="search-term-label"
                     value={this.state.searchTerm}
                     name="searchTerm"
                     onChange={this.handleInputChange}
              />
            </div>       

            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="start-date-label">Start Date:</span>
              </div>
              <input type="text" className="form-control" placeholder="YYYYMMDD"
                     aria-label="Start Date" 
                     aria-describedby="start-date-label"
                     value={this.state.startDate}
                     name="startDate"
                     onChange={this.handleInputChange}
              />
            </div>       

            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="end-date-label">End Date:</span>
              </div>
              <input type="text" className="form-control" placeholder="YYYYMMDD" 
                     aria-label="End Date" 
                     aria-describedby="end-date-label" 
                     value={this.state.endDate}
                     name="endDate"
                     onChange={this.handleInputChange}
              />
            </div>   
            <button className="btn btn-sm" onClick={this.okClick}>Ok</button>  
            <br /> <br />

          </Col>
          <Col size="md-4"></Col>
        </Row>

        <Row>
          <Col size="md-12">
            {
              this.state.articles.map((item) => {
                return (
                  <Article title={item.title} 
                           byline={item.byline} 
                           date={(new Date(item.date)).toLocaleDateString()}
                           image={item.image} 
                           url={item.url} />);
              })
            }

          </Col>
        </Row>

      </Container>
    );
  }
}

export default Search;