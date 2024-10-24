"use client";

import { fetchRepository } from "@/lib/features/repositorySlice";
import { AppDispatch } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuGitFork } from "react-icons/lu";
import { GrBook } from "react-icons/gr";
import { FaCodeBranch } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { useRouter } from "next/navigation";

function RepositoryContent() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const state = useSelector((item: any) => item.repo);

  useEffect(() => {
    dispatch(fetchRepository());
  }, []);

  function handleRepoRouter(repoId: any) {
    router.push(`/dashboard?repo=${repoId}`);
  }

  const [selectedOption, setSelectedOption] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    setFilteredData(state.repository);
  }, [state.repository]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    handleFilteredData(value);
  };

  function handleFilteredData(option: string) {
    if (option === "") {
      return;
    }

    if (option === "star") {
      const sortedDataForStars = [...state.repository].sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
      setFilteredData(sortedDataForStars);
    }

    if (option === "fork") {
      const sortedDataForForks = [...state.repository].sort(
        (a, b) => b.forks - a.forks
      );
      setFilteredData(sortedDataForForks);
    }
  }

  return (
    <div className="ml-8 mt-8 h-screen">
      <div className="flex-col h-full pb-24 ">
        <div className="w-full flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 flex-1">
            Repository{" "}
            <span className="text-gray-500 text-sm">
              ({state.repository.length || 0})
            </span>
          </h2>

          <div className="flex items-center gap-3 mr-8">
            <label className="text-md font-medium">Filter</label>
            <select
              id="filter"
              value={selectedOption}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring focus:ring-pink-400 text-sm"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="star">Most stars</option>
              <option value="fork">Most forks</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 mr-8 pb-8 max-md:grid-cols-1 gap-6">
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((item: any, index: any) => {
              const updatedAt = new Date(item.updated_at);
              const formattedDate = `${updatedAt.getDate()}.${
                updatedAt.getMonth() + 1
              }.${updatedAt.getFullYear()}`;

              return (
                <div
                  onClick={() => handleRepoRouter(item.id)}
                  key={`repo-${index}`}
                  className="w-full h-52 bg-gray-200/20 mt-4 rounded-xl pl-6 pr-6 pt-6 border border-gray-200 hover:scale-105 transition-all hover:cursor-pointer"
                >
                  <div className="flex items-center w-full justify-between">
                    <div className="flex items-center gap-2 underline">
                      <GrBook className="text-gray-700" />{" "}
                      {item.name.slice(0, 25)}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <h2 className="text-gray-700">Last update:</h2>{" "}
                      <span className="text-gray-600">{formattedDate}</span>
                    </div>
                  </div>
                  <div className="text-gray-400 pt-2 text-sm h-12">
                    {item.description && item.description.length > 99 ? (
                      <p>
                        {item.description.slice(0, 99)}
                        ...
                      </p>
                    ) : (
                      <p>{item.description || "No have description"}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between w-full pt-16">
                    <div className="flex items-center gap-4 text-md">
                      <div className="flex items-center gap-2">
                        <FaCodeBranch className="text-blue-500" />
                        {item.default_branch}
                      </div>
                      <div className="flex items-center gap-1">
                        <LuGitFork className="text-pink-500" />
                        {item.forks_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaRegStar className="text-yellow-500" />
                        {item.stargazers_count}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCode className="text-gray-500" />{" "}
                      {item.language || "No language."}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No repository found.</div>
          )}
        </div>

        {state.repository.length > 0 ? (
          <div className="pb-8">
            You have{" "}
            <span className="underline">{state.repository.length}</span>{" "}
            repository for public.
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default RepositoryContent;
