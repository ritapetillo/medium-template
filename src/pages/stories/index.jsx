import React, { Component, useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import ArticleListItem from "../../components/ArticleListItem/ArticleListItem";
import { fetchAllArticles } from "../../lib/fetches";

export default class Stories extends Component {
  state = {
    articles: [],
  };

  setUpArticles = async () => {
    try {
      const articles = await fetchAllArticles();
      console.log(articles);
      this.setState({ articles: articles });
      console.log(this.state.articles);
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount = async () => {
    this.setUpArticles();
  };

 
  render() {
    return (
      <Container>
        <Col xs={12} md={8} className="mt-4">
          {/* asdad
          {this.state.articles.map((article) => (
            <h1>{article.subHead}</h1>
          ))} */}
          {this.state.articles.map((article) => {
            console.log(article);

            return (
              <ArticleListItem
                setUpArticles={this.setUpArticles}
                article={article}
                articleImg={"top"}
                headingFont={"large"}
                subheading
              />
            );
          })}
        </Col>
      </Container>
    );
  }
}
