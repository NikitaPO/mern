import React from "react";
import { Link } from "react-router-dom";

export const LinksList = ({ links }) => {
  if (!links.length) {
    return (
      <p className="center">
        No links yet, do you want{" "}
        <Link to="/create" style={{ cursor: "pointer" }}>
          create
        </Link>{" "}
        one?
      </p>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Original link</th>
          <th>Short link</th>
          <th>Detailed information</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Open</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
