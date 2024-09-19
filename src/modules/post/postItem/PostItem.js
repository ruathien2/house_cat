import React, { useEffect, useState } from "react";
import HeadingCategory from "../heading-category/HeadingCategory";
import CardItem from "../../../components/card-item/CardItem";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase-app/firebaseConfig";
import styled from "styled-components";

const PostItemStyle = styled.div`
  @media only screen and (max-width: 800px) {
    .list {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default function PostItem({ categoryId = "" }) {
  const [posts, setPosts] = useState([]);
  console.log("asd", categoryId);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("category.id", "==", categoryId),
      limit(3)
    );
    onSnapshot(docRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log("results: ", results);
      setPosts(results);
    });
  }, [categoryId]);
  console.log(posts);
  if (!categoryId || posts.length <= 0) return null;
  return (
    <>
      <HeadingCategory>Bài viết liên quan </HeadingCategory>
      <PostItemStyle>
        <div className="list">
          {posts &&
            posts.map((item) => {
              console.log("item", item.name);
              return <CardItem key={item.id} item={item}></CardItem>;
            })}
        </div>
      </PostItemStyle>
    </>
  );
}
