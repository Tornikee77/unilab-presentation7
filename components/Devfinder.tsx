"use client";
import React, { useState } from "react";
import { useGithubUser } from "@/components/use-GithubUSer";

export const DevFinder = () => {
  const [username, setUsername] = useState("");
  const { userData, loading, error, fetchUser } = useGithubUser();

  const handleSearch = () => {
    if (!username.trim()) {
      alert("Input is empty");
      return;
    }
    fetchUser(username.trim());
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          devfinder
        </h1>
        <button
          onClick={() => {
            document.body.classList.toggle("dark");
            const theme = document.body.classList.contains("dark")
              ? "dark"
              : "light";
            localStorage.setItem("theme", theme);
          }}
        >
          <img
            src={`assets/svg/${
              document.body.classList.contains("dark")
                ? "lightMode"
                : "darkMode (2)"
            }.svg`}
            alt="Theme Toggle"
          />
        </button>
      </div>

      <div className="relative mb-6">
        <input
          className="w-full h-12 pl-12 pr-32 rounded-lg shadow focus:outline-none"
          placeholder="Search GitHub username…"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <img
          className="absolute top-3 left-4 w-6"
          src="assets/svg/Combined Shape (1).svg"
          alt=""
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {userData && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex gap-4">
            <img
              src={userData.avatar_url}
              alt="Avatar"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <p className="text-sm text-gray-500">
                {new Date(userData.created_at).toDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{userData.bio}</p>
            </div>
          </div>

          <div className="flex justify-around bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-4">
            <div>
              <p className="text-sm">Repos</p>
              <p className="font-bold">{userData.public_repos}</p>
            </div>
            <div>
              <p className="text-sm">Followers</p>
              <p className="font-bold">{userData.followers}</p>
            </div>
            <div>
              <p className="text-sm">Following</p>
              <p className="font-bold">{userData.following}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600 dark:text-gray-300">
            <p>
              <strong>Location:</strong> {userData.location || "Not available"}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a href={userData.blog} target="_blank" rel="noreferrer">
                {userData.blog}
              </a>
            </p>
            <p>
              <strong>Twitter:</strong>{" "}
              {userData.twitter_username || "Not available"}
            </p>
            <p>
              <strong>Company:</strong> {userData.company || "Not available"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
