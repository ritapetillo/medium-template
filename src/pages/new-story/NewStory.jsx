import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Container } from "react-bootstrap";
import "react-quill/dist/quill.bubble.css";
import { Button } from "react-bootstrap";
import "./styles.scss";
import CategoryPicker from "../../components/CategoryPicker";
import { postNewArticle } from "../../lib/fetches";

export default class NewStory extends Component {
  state = {
    content: "",
    headline: "",
    subHead: "",
    author: {
      name: "Rita",
      img:
        "https://img2.pngio.com/avatar-female-person-user-woman-young-icon-female-avatar-png-512_512.png",
    },
  };
  editor = React.createRef();

  onChange = (e) => {
    // this.setState({
    //   article: { [e.target.name]: e.target.value },
    // });
    console.log(e.target.value);
  };
  onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.editor && this.editor.current.focus();
    }
    console.log(e.target.value);
  };
  handleSubmit = async (e) => {
    try {
      const post = await postNewArticle(this.state);
      this.props.history.push("/stories");
    } catch (err) {
      console.log(err);
    }
  };
  componentDidUpdate = () => {
    console.log(this.state);
  };
  render() {
    const { article } = this.state;
    return (
      <Container className="new-story-container" expand="md">
        <div className="category-container">
          <CategoryPicker
            onChange={(topic) => {
              this.setState({ category: topic });
            }}
          />
        </div>
        <input
          placeholder="Title"
          className="article-title-input"
          onChange={(e) => this.setState({ headLine: e.target.value })}
          name="headLine"
          value={this.state.headLine}
        />
        <input
          onKeyDown={this.onKeyDown}
          placeholder="Sub Head"
          className="article-title-input"
          onChange={(e) => this.setState({ subHead: e.target.value })}
          name="subHead"
          value={this.state.subHead}
        />

        <ReactQuill
          modules={NewStory.modules}
          formats={NewStory.formats}
          ref={this.editor}
          theme="bubble"
          value={this.state.content}
          onChange={(html) => this.setState({ content: html })}
          placeholder="Tell your story..."
          name="content"
        />
        <input
          onKeyDown={this.onKeyDown}
          placeholder="Cover link e.g : https://picsum.photos/800"
          className="article-cover-input"
          name="cover"
          onChange={(e) => this.setState({ cover: e.target.value })}
          value={this.state.cover}
        />

        <Button
          variant="success"
          className="post-btn"
          onClick={this.handleSubmit}
        >
          Post
        </Button>
      </Container>
    );
  }
}

NewStory.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],

    ["bold", "italic", "blockquote"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],

    ["link", "image"],

    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
NewStory.formats = [
  "header",
  "bold",
  "italic",
  "blockquote",
  "align",

  "link",
  "image",
];
