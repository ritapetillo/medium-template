import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./index.scss";
import article from "./data.json";
import { IoLogoTwitter, IoLogoLinkedin, IoLogoFacebook } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import Reactions from "../../components/Reactions/Reactions";
import {
  fetchAnArticleById,
  getAllReviewsByArticleId,
  deleteReviewById,
} from "../../lib/fetches";
class Read extends Component {
  state = {
    article: false,
  };
  attempt = () => {
    console.log("attempt");
  };
  handleDelete = async (reviewId) => {
    try {
      await deleteReviewById(this.props.match.params.slug, reviewId);
      this.setUpReviews();
    } catch (err) {
      console.log(err);
    }
  };
  setUpReviews = async () => {
    try {
      const reviews = await getAllReviewsByArticleId(
        this.props.match.params.slug
      );
      console.log("dassad");
      this.setState({ reviews });
    } catch (err) {
      console.log(err);
    }
  };
  setUpStory = async () => {
    try {
      const article = await fetchAnArticleById(this.props.match.params.slug);
      this.setState({ article });
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount = async () => {
    this.setUpStory();
    this.setUpReviews();
    console.log(this.state.article);
  };

  render() {
    const { article, reviews } = this.state;
    return (
      <Container className="article-container">
        <h1>{article.headLine} </h1>

        <h4>{article.subHead}</h4>
        <Row style={{ marginTop: 20, marginBottom: 20 }}>
          <Col xs={1}>
            <Image
              style={{ width: 50, height: 50 }}
              src={article.author?.img}
              roundedCircle
            />
          </Col>
          <Col>
            {article.author?.name}
            <p>Sep 23, 2018 · 3 min read</p>
          </Col>
          <Col>
            <div
              style={{
                fontSize: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IoLogoTwitter />
              <IoLogoLinkedin />
              <IoLogoFacebook />
              <IoBookmarkOutline />
            </div>
          </Col>
        </Row>
        <Row>
          <Col dangerouslySetInnerHTML={{ __html: article.content }} />
        </Row>
        <Row>
          <Col>
            <Image style={{ height: 300 }} src={article.cover} />
          </Col>
        </Row>
        <Reactions
          slug={this.props.match.params.slug}
          setUpReviews={this.setUpReviews}
          attempt={this.attempt}
        />
      
          <Row className="flex-column">
            {reviews &&
              reviews.reviews.map((review) => (
                <div className="my-4 d-flex justify-content-between comment">
                  <div>
                    <h5>{review.text}</h5>
                    <h6>{review.user}</h6>
                  </div>
                  <span
                    className="delete-btn-comment"
                    onClick={() => this.handleDelete(review._id)}
                  >
                    Delete
                  </span>
                </div>
              ))}
          </Row>
        
      </Container>
    );
  }
}

export default withRouter(Read);
