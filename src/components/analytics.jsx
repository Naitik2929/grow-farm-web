import React, { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import ReactLoading from "react-loading";

const Analytics = () => {
  const [userData, setUserData] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [userPostsLoading, setUserPostsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userDataResponse, userPostsResponse] = await Promise.all([
        fetch("https://api-grow-farm.vercel.app/api/users/getnousers"),
        fetch("https://api-grow-farm.vercel.app/api/post/getnoposts"),
      ]);

      if (!userDataResponse.ok || !userPostsResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const [userData, userPosts] = await Promise.all([
        userDataResponse.json(),
        userPostsResponse.json(),
      ]);

      setUserData(userData.users);
      setUserPosts(userPosts.posts);
      setUserDataLoading(false);
      setUserPostsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const countRoles = (data) => {
    const roleCounts = {};
    const roles = [];

    data.forEach((item) => {
      if (!(item.roles in roleCounts)) {
        roleCounts[item.roles] = 0;
        roles.push(item.roles);
      }
      roleCounts[item.roles]++;
    });

    roles.sort();
    const sortedRoleCounts = {};
    roles.forEach((role) => {
      sortedRoleCounts[role] = roleCounts[role];
    });

    return sortedRoleCounts;
  };
  const calculatePercentages = (counts) => {
    const totalUsers = Object.values(counts).reduce(
      (acc, count) => acc + count,
      0
    );
    const percentages = {};

    for (const role in counts) {
      percentages[role] = (counts[role] / totalUsers) * 100;
    }

    return percentages;
  };

  const userRoleCounts = countRoles(userData);
  const userPercentages = calculatePercentages(userRoleCounts);

  const postRoleCounts = countRoles(userPosts);
  const postPercentages = calculatePercentages(postRoleCounts);

  const userDataAnalysis = {
    labels: Object.keys(userPercentages),
    datasets: [
      {
        label: "User Roles",
        data: Object.values(userPercentages),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
      },
    ],
  };

  const postDataAnalysis = {
    labels: Object.keys(postPercentages),
    datasets: [
      {
        label: "Post Roles",
        data: Object.values(postPercentages),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += Math.round(context.parsed * 100) / 100 + "%";
            return label;
          },
        },
      },
    },
    legend: {
      display: true,
      labels: {
        font: {
          color: "green",
        },
      },
    },
  };
  const countCreatedAt = (data) => {
    const createdAtCounts = {};

    data.forEach((item) => {
      const createdAtYear = item.createdAt.substring(0, 4);
      const createdAtMonth = item.createdAt.substring(5, 7);
      const createdAtKey = `${createdAtYear}-${createdAtMonth}`;

      if (!(createdAtKey in createdAtCounts)) {
        createdAtCounts[createdAtKey] = 0;
      }
      createdAtCounts[createdAtKey]++;
    });

    return createdAtCounts;
  };

  const userCreatedAtCounts = countCreatedAt(userData);
  const postCreatedAtCounts = countCreatedAt(userPosts);

  const userCreatedAtLabels = Object.keys(userCreatedAtCounts);
  const userCreatedAtData = Object.values(userCreatedAtCounts);

  const postCreatedAtLabels = Object.keys(postCreatedAtCounts);
  const postCreatedAtData = Object.values(postCreatedAtCounts);

  const userCreatedAtAnalysis = {
    labels: userCreatedAtLabels,
    datasets: [
      {
        label: "User Created At",
        data: userCreatedAtData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const postCreatedAtAnalysis = {
    labels: postCreatedAtLabels,
    datasets: [
      {
        label: "Post Created At",
        data: postCreatedAtData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const createdAtOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += context.parsed;
            return label;
          },
        },
      },
    },
    legend: {
      display: true,
      labels: {
        font: {
          color: "green",
        },
      },
    },
  };
  return (
    <div id="analytics">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-extrabold text-green-700 mb-8 text-center">
          Analytics
        </h1>
        <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            <div className="border border-gray-300 p-4 rounded-lg">
              <p className="text-2xl font-semibold text-green-700 mb-2">
                Total Users: {userData.length}
              </p>
              <h2 className="text-lg font-semibold mb-4">User Created At</h2>
              <div
                className="chart-container"
                style={{ maxWidth: "300px", margin: "0 auto" }}
              >
                {userDataLoading ? (
                  <div className="text-center">
                    <ReactLoading
                      type="spin"
                      color="gray"
                      height={30}
                      width={30}
                    />
                  </div>
                ) : (
                  <Line
                    data={userCreatedAtAnalysis}
                    options={createdAtOptions}
                    className="chart"
                  />
                )}
              </div>
              <p className="mt-4 text-sm text-center text-gray-400">
                The chart shows the distribution of user creation dates.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="border border-gray-300 p-4 rounded-lg">
              <p className="text-2xl font-semibold text-green-700 mb-2">
                Total Posts: {userPosts.length}
              </p>
              <h2 className="text-lg font-semibold mb-4">Post Created At</h2>
              <div
                className="chart-container"
                style={{ maxWidth: "300px", margin: "0 auto" }}
              >
                {userPostsLoading ? (
                  <div className="text-center">
                    <ReactLoading
                      type="spin"
                      color="gray"
                      height={30}
                      width={30}
                    />
                  </div>
                ) : (
                  <Line
                    data={postCreatedAtAnalysis}
                    options={createdAtOptions}
                    className="chart"
                  />
                )}
              </div>
              <p className="mt-4 text-sm text-center text-gray-400">
                The chart shows the distribution of post creation dates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            <div className="border border-gray-300 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">User</h2>
              <div
                className="chart-container"
                style={{ maxWidth: "300px", margin: "0 auto" }}
              >
                {userDataLoading ? (
                  <div className="text-center">
                    <ReactLoading
                      type="spin"
                      color="gray"
                      height={30}
                      width={30}
                    />
                  </div>
                ) : (
                  <Pie
                    data={userDataAnalysis}
                    options={options}
                    className="chart"
                  />
                )}
              </div>
              <p className="mt-4 text-sm text-center text-gray-400">
                The chart shows the distribution of user roles.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="border border-gray-300 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Post</h2>
              <div
                className="chart-container"
                style={{ maxWidth: "300px", margin: "0 auto" }}
              >
                {userPostsLoading ? (
                  <div className="text-center">
                    <ReactLoading
                      type="spin"
                      color="gray"
                      height={30}
                      width={30}
                    />
                  </div>
                ) : (
                  <Pie
                    data={postDataAnalysis}
                    options={options}
                    className="chart"
                  />
                )}
              </div>
              <p className="mt-4 text-sm text-center text-gray-400">
                The chart shows the distribution of post roles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
