import axios from "axios";
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  // headers: {
  //   Authorization: `token ${GITHUB_TOKEN}`,
  // },
});

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);

  return response.data.items;
};

// Get user
export const getUser = async (login) => {
  const [user, repo] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  if (user.data.status === 404) {
    window.location = "/notfound";
  } else {
    return { user: user.data, repos: repo.data };
  }
};
