"use client";
import React, { useState } from "react";
import { useGithubUser } from "@/components/use-GithubUSer";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";

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
    <div className="min-h-screen bg-[var(--body-color)] transition-colors duration-200">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[var(--h2-color)]">
            devfinder
          </h1>
          <ThemeSwitcher text="click me" />
        </div>

        <div className="relative mb-6">
          <input
            className="w-full h-12 pl-12 pr-32 rounded-lg shadow focus:outline-none bg-[var(--basic-color)] text-[var(--profileInfo-color)] placeholder:text-[var(--username-and-join)]"
            placeholder="Search GitHub username…"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <svg
            className="absolute top-3 left-4 w-6 h-6 fill-[var(--username-and-join)]"
            viewBox="0 0 24 24"
          >
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </svg>
          <button
            onClick={handleSearch}
            className="absolute right-2 top-2 px-4 py-2 bg-[var(--btn-color)] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Search
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--btn-color)] mx-auto"></div>
            <p className="mt-2 text-[var(--username-and-join)]">Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {userData && (
          <div className="bg-[var(--basic-color)] p-6 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row gap-6">
              <img
                src={userData.avatar_url}
                alt="Avatar"
                className="w-24 h-24 rounded-full mx-auto sm:mx-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-bold text-[var(--h2-color)] mb-1">
                  {userData.name || userData.login}
                </h2>
                <p className="text-[var(--btn-color)] mb-2">
                  @{userData.login}
                </p>
                <p className="text-sm text-[var(--username-and-join)] mb-3">
                  Joined{userData.created_at}
                </p>
                <p className="text-[var(--profileInfo-color)]">
                  {userData.bio || "This profile has no bio"}
                </p>
              </div>
            </div>

            <div className="flex justify-around bg-[var(--background-color)] p-4 rounded-lg mt-6">
              <div className="text-center">
                <p className="text-sm text-[var(--username-and-join)] mb-1">
                  Repos
                </p>
                <p className="font-bold text-[var(--folllower-cont-color)]">
                  {userData.public_repos}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[var(--username-and-join)] mb-1">
                  Followers
                </p>
                <p className="font-bold text-[var(--folllower-cont-color)]">
                  {userData.followers}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[var(--username-and-join)] mb-1">
                  Following
                </p>
                <p className="font-bold text-[var(--folllower-cont-color)]">
                  {userData.following}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 fill-[var(--username-and-join)]"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span
                  className={`text-sm ${
                    userData.location
                      ? "text-[var(--profileInfo-color)]"
                      : "text-[var(--username-and-join)] opacity-60"
                  }`}
                >
                  {userData.location || "Not Available"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 fill-[var(--username-and-join)]"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2 0-.68.06-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08C6.03 6.34 7.57 5.06 9.4 4.44 8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56-1.83-.63-3.37-1.91-4.32-3.56M4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8c-.96-1.65-2.49-2.93-4.33-3.56C15.19 5.55 15.65 6.75 16 8h2.92M12 2C6.47 2 2 6.5 2 12A10 10 0 0 0 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                </svg>
                <span
                  className={`text-sm ${
                    userData.blog
                      ? "text-[var(--profileInfo-color)]"
                      : "text-[var(--username-and-join)] opacity-60"
                  }`}
                >
                  {userData.blog ? (
                    <a
                      href={
                        userData.blog.startsWith("http")
                          ? userData.blog
                          : `https://${userData.blog}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {userData.blog}
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 fill-[var(--username-and-join)]"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
                <span
                  className={`text-sm ${
                    userData.twitter_username
                      ? "text-[var(--profileInfo-color)]"
                      : "text-[var(--username-and-join)] opacity-60"
                  }`}
                >
                  {userData.twitter_username || "Not Available"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 fill-[var(--username-and-join)]"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2v4c0 1.11-.89 2-2 2s-2-.89-2-2V4M4 18v-4c0-1.11.89-2 2-2s2 .89 2 2v4c0 1.11-.89 2-2 2s-2-.89-2-2M8 12V6c0-1.11.89-2 2-2s2 .89 2 2v6c0 1.11-.89 2-2 2s-2-.89-2-2" />
                </svg>
                <span
                  className={`text-sm ${
                    userData.company
                      ? "text-[var(--profileInfo-color)]"
                      : "text-[var(--username-and-join)] opacity-60"
                  }`}
                >
                  {userData.company || "Not Available"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
