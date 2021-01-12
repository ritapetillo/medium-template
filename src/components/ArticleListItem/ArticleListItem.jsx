import React from "react";
import ArticleItemDetails from "../ArticleItemDetails/ArticleItemDetails";
import "./styles.scss";
class ArticleListItem extends React.Component {
  render() {
    const { article, setUpArticles } = this.props;
    console.log(article);
    return (
      <div
        className={`w-100 d-flex mb-auto justify-content-between align-start  pb-4 ${
          this.props.articleImg === "top" && "flex-column-reverse"
        }`}
      >
        <ArticleItemDetails article={article} setUpArticles={setUpArticles} />
        {this.props.articleImg && (
          <a href="/">
            <img
              alt="cover"
              className={
                this.props.articleImg === "top" ? "img-large" : "img-small"
              }
              src={this.props.article.cover}
            />
          </a>
        )}
      </div>
    );
  }
}

export default ArticleListItem;
