"use server";
import axios from "axios";

export const onGetBlogPosts = async () => {
  try {
    const postArray: {
      id: string;
      title: string;
      image: string;
      content: string;
      createdAt: Date;
    }[] = [];
    const postsUrl = process.env.CLOUDWAYS_POSTS_URL;
    if (!postsUrl) return;
    const featuredImages = process.env.CLOUDWAYS_FEATURED_IMAGES_URL;
    const posts = await axios.get(featuredImages || "");
    if (!featuredImages) return;

    let i = 0;
    while (i < posts.data.length) {
      const image = await axios.get(`${featuredImages}/${posts.data[i].id}`);
      if (image) {
        //we push a post object into the array
        const post: {
          id: string;
          title: string;
          image: string;
          content: string;
          createdAt: Date;
        } = {
          id: posts.data[i].id,
          title: posts.data[i].title.rendered,
          image: image.data.guid.rendered,
          content: posts.data[i].description.rendered,
          createdAt: new Date(posts.data[i].date),
        };
        postArray.push(post);
      }
      i++;
    }

    if (posts.data) {
      return postArray;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetBlogPost = async (id: string) => {
  try {
    const postUrl = process.env.CLOUDWAYS_POSTS_URL;
    if (!postUrl) return;
    const post = await axios.get(`${postUrl}/${id}`);
    if (post.data) {
      const authorUrl = process.env.CLOUDWAYS_USERS_URL;
      if (!authorUrl) return;
      const author = await axios.get(`${authorUrl}${post.data.author}`);
      if (author.data) {
        return {
          id: post.data.id,
          title: post.data.title.rendered,
          content: post.data.content.rendered,
          createdAt: new Date(post.data.date),
          author: author.data.name,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
