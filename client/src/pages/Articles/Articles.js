import React, { Component } from "react";
import API from "../../utils/API";
import { Input } from "../../components/Form";

class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: "",
      yr_start: "",
      yr_end: "",
      newArticles: [],
      savedArticles: [],
      urls: []
    };
  }

  handleInputChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });

  componentDidMount = () => this.loadSaved();
  // componentDidMount() {
  //   this.loadBooks();
  // }


  loadSaved = () =>
    API.getArticle()
      .then(({ data: articles }) =>
        this.setState({
          savedArticles: articles,
          urls: articles.map(article => article.url)
        })
      )
      .catch(err => console.log(err));

      // loadBooks = () => {
      //   API.getBooks()
      //     .then(res => this.setState({ books: res.data }))
      //     .catch(err => console.log(err));
      // };

  handleFormSearch = event => {
    event.preventDefault();

    const queryURLBase =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json";

//       7/23/18 Thanks for registering for a New York Times API Key.
// http://developer.nytimes.com/#h2-responses
// Here's your API Key: c81a31cc54e548f6bd42f53a80d687bf

    const authKey = "c81a31cc54e548f6bd42f53a80d687bf";

    let queryURL = queryURLBase;

    queryURL += `?api-key=${authKey}`;

    let val = this.state.topic.trim();
    queryURL += `&q=${val}`;

    val = this.state.yr_start.trim();
    if (parseInt(val, 10)) {
      // the inputed year con cat jan 1st
      queryURL += `&begin_date=${val}0101`;
    }

    val = this.state.yr_end.trim();
    if (parseInt(val, 10)) {
      // the inputed year con cat dec 31st
      queryURL += `&end_date=${val}1231`;
    }

    // https://data-gov.tw.rpi.edu/wiki/How_to_use_New_York_Times_Article_Search_API
    //http://www.storybench.org/working-with-the-new-york-times-api-in-r/
    
    API.callURL(queryURL)
      .then(res =>
        this.setState({
          newArticles: res.data.response.docs
            .map(article => ({
              headline: article.headline.main,
              byline:
                article.byline && article.byline.original
                  ? article.byline.original
                  : "",
              published: article.pub_date,
              url: article.web_url
            }))
            .sort((a, b) => {
              a = new Date(a.published);
              b = new Date(b.published);

              return a > b ? -1 : a < b ? 1 : 0;
            })
        })
      )
      .catch(err => console.log(err));
  };

  onSaveClick = ({ headline, byline, published, url }) =>
    API.saveArticle({ headline, byline, published, url })
      .then(res => this.loadSaved())
      .catch(err => console.log(err));

  onDeleteClick = ({ _id }) =>
    API.deleteArticle({ _id })
      .then(res => this.loadSaved())
      .catch(err => console.log(err));

  render() {
    return (
      <div className="container">
        {/* <div className="jumbotron" style={{ backgroundColor: "#2fa4e7" }}> */}
         {/* <div className="jumbotron" style={{'backgroundImage': 'url(./assets/images/newspaper1.png)', backgroundColor: "",'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'top', /*'backgroundSize': '100% 100%', 'backgroundAttachment': 'fixed'}}>  */}
        <div className="jumbotron" style={{'backgroundImage': 'url(./assets/images/ny2.jpg)', 'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center', 'backgroundSize': '100% 100%',  /*'backgroundAttachment': 'fixed'*/ }}>



          <h1 className="text-center" style={{ color: 'black', backgroundColor: "white" /*"#2fa4e7"*/,  fontFamily: 'Old English Text MT', 'backgroundSize': '100% 100%'}}>
            <strong>The newYorkTimes React App</strong>
            {/* <strong>New York Times Search</strong> */}

          </h1>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title text-center"><h1>Search</h1></div>
              </div>
              <div className="panel-body text-center">
                <form>
                  <Input
                    value={this.state.topic}
                    onChange={this.handleInputChange}
                    name="topic"
                    placeholder="Topic (required)"
                  />
                  <Input
                    value={this.state.yr_start}
                    onChange={this.handleInputChange}
                    name="yr_start"
                    placeholder="YYYY  [Start Year]  (Optional) --> *If Year is entered all results can be saved"
                  />
                  <Input
                    value={this.state.yr_end}
                    onChange={this.handleInputChange}
                    name="yr_end"
                    placeholder="YYYY  [ End Year ]  (Optional) --> *If Year is entered all results can be saved"
                  />
                  <button
                    className="btn btn-primary"
                    disabled={!this.state.topic}
                    onClick={this.handleFormSearch}
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="panel-title text-left"><h2>Results:</h2></div>
              </div>
              <div className="card card" />
              {this.state.newArticles.map(article => (
                // <div className="well" key={article.url}>
                <div className="card" key={article.url}>
                  <h3>
                    <strong>{article.headline}</strong>
                  </h3>
                  <h5>{article.byline}</h5>
                  <h5>{article.published}</h5>
                  <a href={article.url} target="_blank">
                    {article.url}
                  </a>
                  <br />
                  {this.state.urls.includes(article.url) ? (
                    // effect on save button - shows been clicked with bstrap style/color and the word saved from save
                    <button className="btn-success" style={{ marginTop: 5 }}>
                      SAVED
                    </button>
                  ) : (
                    <button
                      className="btn-outline-success"
                      style={{ marginTop: 10 }}
                      onClick={() => this.onSaveClick(article)}
                    >
                      SAVE
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <div className="card-title text-center"><h1>Saved Articles</h1></div>
              </div>
              <div className="card card" />
              {/* <div className="card-body or card card or panel body" /> */}
              {this.state.savedArticles.map(article => (
                <div className="card card-body" key={article.url}>
                  <h3>
                    <strong>{article.headline}</strong>
                  </h3>
                  <h5>{article.byline}</h5>
                  <h5>{article.published}</h5>
                  <a href={article.url} target="_blank">
                    {article.url}
                  </a>
                  <br />
                  <button
                    className="btn-outline-danger"
                    // style={{ marginTop: 10 }}
                    onClick={() => this.onDeleteClick(article)}
                  >
                    DELETE
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Articles;
