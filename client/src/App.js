import React, { Component } from "react";
import axios from 'axios';
import Jumbotron from "./components/Jumbotron";
import DeleteBtn from "./components/DeleteBtn";
import { Col, Row, Container } from "./components/Grid";
import { List, ListItem } from "./components/List";
import { Input, TextArea, FormBtn } from "./components/Form";

class App extends Component {
  state = {
    search: '',
    books: [],
    gBooks: []
  }

  componentDidMount() {
    axios.get("/api/books")
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }
  googleSearch = () => {
    axios.get('/google/' + this.state.search)
      .then(res => {
        console.log(res.data)
        this.setState({ gBooks: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
  removeGoogleBook = id => {
    console.log(id)
    this.setState({ gBooks: this.state.gBooks.filter(b => b.id !== id) })
  }
  saveGoogleBook = id => {
    const book = this.state.gBooks.find(b => b.id === id);
    console.log(book)
  }
  render() {
    return (<>
      <Container fluid>
        <Row>
          <Col size="sm-12">
            <Jumbotron>
              <h1>Google Books Search</h1>
            </Jumbotron>
            <Input
              type="text"
              value={this.state.search}
              onChange={this.handleInputChange}
              name="search"
              placeholder="Enter search here!"
            />
            <FormBtn
              disabled={!(this.state.search)}
              onClick={this.googleSearch}
            >
              Search
              </FormBtn>

        
          </Col>
          </Row>

          <Row>
          <Col size="sm-8">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>

            {
              this.state.gBooks.map((book, i) => <div key={i + '-gBooks'}>
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.description}</p>
                <h3>{book.volumeInfo.imageLinks.thumbnail}</h3>

                <button onClick={() => this.saveGoogleBook(book.id)}>Save</button>
                <DeleteBtn onClick={() => this.removeGoogleBook(book.id)}>Remove</DeleteBtn>
              </div>)
            }


            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    {/* <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.authors}
                      </strong>
                    </Link> */}
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
          <Col size="sm-4">
          <Jumbotron>
              <h1>Your Collection</h1>
              <List saveGoogleBook={this.state.saveGoogleBook}></List>
            </Jumbotron>
            </Col> 
        </Row>
      </Container>


    </>);
  }
}

export default App;
