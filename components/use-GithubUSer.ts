import { useState } from "react";

export interface GithubUser {
  avatar_url: string;
  name: string;
  created_at: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string;
  company: string;
  login: string;
}

export function useGithubUser() {
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = (username: string) => {
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("User not found");
        }
        return res.json();
      })
      .then((data: GithubUser) => {
        console.log("Fetched GitHub user data:", data);
        setUserData(data);
      })
      .catch((err: any) => {
        setError(err.message);
        setUserData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { userData, loading, error, fetchUser };
}
