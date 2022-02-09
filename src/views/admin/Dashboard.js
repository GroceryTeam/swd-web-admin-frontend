import React from "react"

// @notus-pro/react
import Sidebar from "@notus-pro/react/Sidebar"
// import NavbarSearchUser from "@notus-pro/react/NavbarSearchUser"
import { CardFullTable } from "@notus-pro/react"
// props
const sidebar = {
  brand: {
    text: "Grocery",
    image:
      "data:image/png;base64,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",
    link: { href: "#pablo" },
  },
  activeColor: "lightBlue",
  items: [
    { divider: true },
    {
      icon: "fas fa-tv",
      text: "Dashboard",
      active: true,
      link: { href: "#pablo" },
    },
    {
      icon: "fas fa-tools",
      text: "Users",
      link: { href: "#pablo" },
    },
    {
      icon: "fas fa-tools",
      text: "Brands",
      link: { href: "#pablo" },
    },
    {
      icon: "fas fa-tools",
      text: "Stores",
      link: { href: "#pablo" },
    }
  ],
}
// const navbarsearchusersettings2 = {
//   brand: { href: "#pablo", children: "Settings Page" },
//   input: { placeholder: "Search here", border: "borderless", type: "text" },
//   dropdown: {
//     image: "team-3-800x800.jpg",
//     items: [
//       { href: "#pablo", children: "Action" },
//       { href: "#pablo", children: "Another action" },
//       { href: "#pablo", children: "Something else here" },
//       { divider: true },
//       { href: "#pablo", children: "Seprated link" },
//     ],
//   },
// }
// const headerstatcards = {
//   color: "lightBlue",
//   cards: [
//     {
//       statSubtitle: "NEW USERS",
//       statTitle: "2",
//       statArrow: "down",
//       statPercent: "30",
//       statPercentColor: "text-red-500",
//       statDescripiron: "Since last week",
//       statIconName: "fas fa-chart-pie",
//       statIconColor: "bg-orange-500",
//     },
//   ],
// }

const cardfulltable = {
  title: "Users",
  color: "white",
  head: ["Username", "Email", "Status", "Name", "Phone", ""],
  body: [
    [
      "tranminhkuan",
      "minkuan@gmail.com",
      { color: "emerald", text: "active" },
      "Tran Minh Quan",
      "0911234557",
      {
        dropdown: {
          icon: "fas fa-cog",
          button: { color: "white", size: "sm" },
          items: [
            { href: "#pablo", children: "Edit Profile" },
            { href: "#pablo", children: "Settings" },
            { href: "#pablo", children: "Log out" },
          ],
        },
      },
    ],
    [
      "huuquoc",
      "huuquoc@gmail.com",
      { color: "emerald", text: "active" },
      "Huu Quoc",
      "0911234556",
      {
        dropdown: {
          icon: "fas fa-cog",
          button: { color: "white", size: "sm" },
          items: [
            { href: "#pablo", children: "Edit Profile" },
            { href: "#pablo", children: "Settings" },
            { href: "#pablo", children: "Log out" },
          ],
        },
      },
    ],
  ],
}


export default function Dashboard() {
  return (
    <>
      <Sidebar {...sidebar} />
      <div className="relative md:ml-64 bg-blueGray-200">
        {/* <NavbarSearchUser {...navbarsearchusersettings2} /> */}
        {/* <HeaderStatCards {...headerstatcards} /> */}
        <div className="px-4 md:px-10 py-10 font-bold text-xl">
          Dashboard
        </div>
        <div className="px-4 md:px-10 mx-auto w-full -m-24 mt-10">
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12">
              <CardFullTable {...cardfulltable} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
