import React from "react";
import { MdAddModerator, MdOutlinePriceChange } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
const Features = () => {
  return (
    <section
      id="features"
      className="container mx-auto px-4 space-y-6  py-8 md:py-12 lg:py-20"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          <span className="text-green-700">GrowFarm </span>
          Features
        </h2>

        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          GrowFarm is a social media app for farmers where you can connect with
          fellow farmers, share your experiences, and stay updated with the
          latest agricultural information
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg border bg-white select-none hover:shadow hover:shadow-teal-200 p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <img src="/social.png" alt="Feature Image" className="h-12 w-12 " />
            <div className="space-y-2">
              <h3 className="font-bold">Post Management</h3>
              <p className="text-sm text-muted-foreground">
                Add, delete, like, and comment on posts
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border bg-white select-none hover:shadow hover:shadow-teal-200 p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <RiUserFollowFill
              className="text-green-700"
              style={{ width: "48px", height: "48px" }}
            />
            <div className="space-y-2">
              <h3 className="font-bold">User Interaction</h3>
              <p className="text-sm text-muted-foreground">
                Follow, unfollow other users
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border bg-white select-none hover:shadow hover:shadow-teal-200 p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <MdAddModerator
              className="text-green-700"
              style={{ width: "48px", height: "48px" }}
            />
            <div className="space-y-2">
              <h3 className="font-bold">OTP Verified Users</h3>
              <p className="text-sm text-muted-foreground">
                Discover and connect with verified users in the farming
                community
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border bg-white select-none hover:shadow hover:shadow-teal-200 p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <img src="/smart.png" alt="Feature Image" className="h-12 w-12 " />
            <div className="space-y-2">
              <h3 className="font-bold">Agricultural Information</h3>
              <p className="text-sm text-muted-foreground">
                Stay updated with the latest crop prices
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border bg-white select-none hover:shadow hover:shadow-teal-200 p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <FaUsers
              className="text-green-700"
              style={{ width: "48px", height: "48px" }}
            />
            <div className="space-y-2">
              <h3 className="font-bold">Multiple Roles of Users</h3>
              <p className="text-sm text-muted-foreground">
                Farmer, Doctor, Shopowner, Broker, Other
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
