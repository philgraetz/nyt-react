import React from "react";
import axios from "axios";
import path from "path";

class Article extends React.Component {

  saveClick = (props) => {
    let url = "/api/articles";
    axios.post(path.join(__dirname, url), props)
    .then(results => {})
    .catch(error => {console.log(error)})
  }

  render = () => {
    let imgStyle = {maxWidth : "100%" };

    let bb = this.props.saved ? <div /> :
          <button className="btn btn-light btn-sm" 
                  data-props={this.props} 
                  onClick={() => this.saveClick(this.props)}>
              Save
          </button>

    return (
      <div className="jumbotron py-2 my-1">
        <div className="row">
          <div className="col-md-3">
            <img src={this.props.image} alt="News Story" style={imgStyle} />
          </div>

          <div className="col-md-9">

            {/* -- title -- */}
            <h5 className="display-5 px-2">{this.props.title}</h5>

            {/* -- byline -- */}
            <p className="px-2">{this.props.byline}</p>

            {/* -- date -- */}
            <p className="px-2">{this.props.date}</p>

            {/* -- URL -- */}
            <div className="px-2 pb-1">
              <a href={this.props.url} target="_blank">{this.props.url}</a>
            </div>

            {/* Save Button */}
            {bb}

          </div>
        </div>
      </div>
    )
  }

}

export default Article;
