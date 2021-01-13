import React from "react";
import "./styles.scss";
import { deleteArticle } from "../../lib/fetches";
import { Link } from "react-router-dom";

class ArticleItemDetails extends React.Component {
  render() {
    const { article, setUpArticles } = this.props;

    const handleDelete = async () => {
      try {
        await deleteArticle(article._id);
        setUpArticles();
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <div className={"pr-3"}>
        <div className={"d-flex align-center mb-2"}>
          <img
            alt="cover"
            style={{ width: "20px", height: "20px" }}
            src={article.author.img}
          />

          <span className={"author"}>
            <a href="/">
              <b>{article.author.name} </b> in <b>Better Advice</b>
            </a>
          </span>
        </div>
        <Link to={`/read/${article._id}`}>
          <span
            className={"heading"}
            style={{
              fontSize: this.props.headingFont === "small" ? "16px" : "22px",
              lineHeight: this.props.headingFont === "small" ? "20px" : "28px",
            }}
          >
            {this.props.article.headLine}
          </span>
        </Link>

        {article.subHead && (
          <div className={"subheading"}>
            <p>
              <a href="/">{this.props.article.subHead}</a>
            </p>
          </div>
        )}
        <div className={"d-flex align-baseline justify-between mt-2"}>
          <h4 className={"date"}>
            <div className={"d-flex"}>
              <span>Oct 16, 2020</span>
              <div>
                <span>
                  <span>·</span>
                </span>
              </div>

              <span>
                <span>4 min read</span>
              </span>
              <span>
                <span
                  className="ml-4 delete-btn"
                  onClick={() => handleDelete()}
                >
                  Delete
                </span>
              </span>
            </div>
          </h4>
        </div>
      </div>
    );
  }
}

export default ArticleItemDetails;
