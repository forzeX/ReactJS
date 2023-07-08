import React, { useEffect, useState } from "react";
import { API_URL, REQUEST_STATUS } from "../../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../Store/articles/actions";

const Articles = () => {
  // const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const articles = useSelector((state) => state.articles.articlesList);
  const articlesStatus = useSelector((state) => state.articles.request.status);
  const articlesError = useSelector((state) => state.articles.request.error);
  console.log(articles);
  const dispatch = useDispatch();

  useEffect(() => {
    getArticles(dispatch);
  }, []);

  // Пример иной реализации с более современным синтаксисом. Потребуется подключение дополнительного модуля в babel

  // const getArticles = async () => { // Асинхронные функции неявно возвращают Promise, поэтому callback useEffect асинхронным объявлять нельзя. Поэтому выносим запрос в отдельную функцию
  // try {
  //   const respone = await fetch(API_URL); // Асинхронные действия предваряем await'ом
  //   const data = await response.json();

  //   setArticles(data);
  // } catch (error) {
  // ...
  // } finally {
  //  ...
  // }

  // useEffect(() => {
  //   getArticles();
  // }, []);

  if (articlesStatus === REQUEST_STATUS.PENDING) {
    return <h3>Loading...</h3>;
    console.log("Loading...");
  }

  if (articlesError) {
    console.log(articlesError);
    return <h3>ERROR: {articlesError}</h3>;
  }

  return (
    <>
      <h1>This is articles page</h1>
      {articles.map((article) => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <div>{article.summary}</div>
          <br />
        </div>
      ))}
    </>
  );
};

export default Articles;
