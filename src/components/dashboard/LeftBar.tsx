"use client";

import Image from "next/image";
import React, { useEffect } from "react";

import { GrAppsRounded } from "react-icons/gr";
import { GrBook } from "react-icons/gr";
import { HiOutlineServer } from "react-icons/hi";
import { TbPresentationAnalytics } from "react-icons/tb";
import { LuPackageSearch } from "react-icons/lu";

import logo from "../../../public/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { fetchUser } from "@/lib/features/userSlice";

function LeftBar() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser("chefberke"));
  }, []);

  const state = useSelector((item: any) => item.user);
  console.log(state);
  return (
    <div className="flex flex-col items-start ml-8 pt-8 h-screen">
      <div className="flex flex-col flex-grow">
        <div>
          <Image src={logo} width={100} height={100} alt="logo" />
        </div>
        <div className="flex-col items-start mt-8">
          <div className="text-gray-400 font-medium text-[14px]">MY DASHBOARD</div>
          <div className="flex items-center gap-2 pt-2 text-[16px] text-gray-600 hover:cursor-pointer">
            <GrAppsRounded /> <p>Overview</p>
          </div>
          <div className="flex items-center gap-2 pt-3 text-[16px] text-gray-600 hover:cursor-pointer">
            <GrBook /> <p>Repository</p>
          </div>
          <div className="flex items-center gap-2 pt-3 text-[16px] text-gray-600 hover:cursor-pointer">
            <HiOutlineServer /> <p>Projects</p>
          </div>
        </div>
        <div className="flex-col items-start mt-8">
          <div className="text-gray-400 font-medium text-[14px]">CODESPACE</div>
          <div className="flex items-center gap-2 pt-2 text-[16px] text-gray-600 hover:cursor-pointer">
            <TbPresentationAnalytics /> <p>Analyicts</p>
          </div>
          <div className="flex items-center gap-2 pt-3 text-[16px] text-gray-600 hover:cursor-pointer">
            <LuPackageSearch /> <p>Packages</p>
          </div>
        </div>
      </div>

      <div className="text-gray-600 text-lg flex items-end h-full pb-8 w-full">
        <div className="flex items-center justify-start bg-black rounded-xl py-2 px-4 w-full text-white mr-8 gap-4">
          <img src={state.userProfile.avatar_url} width={50} height={50} alt="userimage" className="border border-gray-500 rounded-full" />
          <div className="flex-col items-center">
            <p>@{state.userProfile.login}</p>
            <p className="text-gray-400">{state.userProfile.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;