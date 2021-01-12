const { REACT_APP_API_URI } = process.env;

export const fetchAllArticles = async () => {
  try {
    const res = await fetch(`${REACT_APP_API_URI}/articles`);
    const data = await res.json();
    if (res.ok) {
      console.log(data);
      return data;
    } else {
      console.log("there was an error fetching articles");
    }
  } catch (err) {
    console.log(err);
    console.log("there was an error fetching articles");
  }
};
export const postNewArticle = async (body) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  try {
    const res = fetch(`${REACT_APP_API_URI}/articles`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
    });
    const data = res.json();
    if (res.ok) {
      return data;
    } else {
      console.log("there was an error posting new article");
    }
  } catch (err) {
    console.log(err);
    console.log("there was an error fetching articles");
  }
};

export const editNewArticle = async (id, body) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  try {
    const res = fetch(`${REACT_APP_API_URI}/articles/${id}`, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(body),
    });
    const data = res.json();
    if (res.ok) {
      return data;
    } else {
      console.log("there was an error editing the article");
    }
  } catch (err) {
    console.log(err);
    console.log("there was an error editing the article");
  }
};

export const deleteArticle = async (id) => {
  console.log(id);
  try {
    const res = fetch(`${REACT_APP_API_URI}/articles/${id}`, {
      method: "DELETE",
    });
    const data = res.json();
    if (res.ok) {
      return data;
    } else {
      console.log("there was an error deleting the article");
    }
  } catch (err) {
    console.log(err);
    console.log("there was an error deleting the article");
  }
};
