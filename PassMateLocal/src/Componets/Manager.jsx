import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4, v4 } from "uuid";

//<div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

const Manager = () => {
  const passwordRef = useRef();
  const ref = useRef();
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [passwordArray, setpasswordArray] = useState([]);
  console.log(!form.site);

  //? Hook to fetch data from localstorage
  useEffect(() => {
    const saved = localStorage.getItem("passwords");
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setpasswordArray(parsed);
      } else {
        setpasswordArray([]); // fallback to empty array
      }
    } catch (err) {
      console.error("Failed to parse saved passwords:", err);
      setpasswordArray([]); // fallback if JSON is malformed
    }
  }, []);

  const EditPassword = (id, item) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((i) => i.id !== id));
  };

  const copyText = (text) => {
    // alert("Copied to Clipboard" + text);
    navigator.clipboard.writeText(text);
    toast.success(`Copied "${text}"`, {
      closeOnClick: true,
      hideProgressBar: false,
      pauseOnHover: false,
    });
  };

  const ShowPassword = () => {
    if (ref.current.src.includes("icons/eye.png")) {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    } else if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    }
  };

  const SavePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
      setpasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      console.log([...passwordArray, form]);
      toast.success(`Password saved successfully!`, { hideProgressBar: true });
      setform({ site: "", username: "", password: "" });
    } else {
      toast.error(`Error: Password not saved`);
    }
  };

  const DeletePassword = (id) => {
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((i) => i.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((i) => i.id !== id))
      );

      toast.success(`Password with id  "${id}"  is deleted!`);
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const keycheck = (e) => {};

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_300px,#C9FBFF,transparent)]"></div>
      </div>

      <div
        onKeyDownCapture={(e) => {
          if (e.key === "Enter") {
            SavePassword();
          }
        }}
        className="mycontainer"
      >
        <div className="heading flex flex-col justify-center items-center mb-3">
          <span className="logo font-bold  text-2xl">
            <span className="font-bold text-green-500">&lt;</span>
            <span className="text-black">Pass</span>
            <span className="text-green-500">MATE/&gt;</span>
          </span>
          <p className="font-bold text-slate-500 text-lg">
            Your own Password manager
          </p>
        </div>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            className="rounded-full border-[2px] border-green-500 w-full p-4 outline-slate-400 py-1 "
            type="text"
            name="site"
            id="site"
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website name/URL(Example: google.com)"
          />
          <div className="flex w-full md:flex-row flex-col justify-between gap-8">
            <input
              className="rounded-full border-[2px] border-green-500 w-full p-4 outline-slate-400 py-1"
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
            />
            <div className="relative">
              <input
                className="rounded-full border-[2px] border-green-500 w-full p-4 outline-slate-400 py-1"
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                ref={passwordRef}
              />
              <span
                className="absolute right-[2px] top-[4px] cursor-pointer"
                onClick={() => ShowPassword()}
              >
                <img
                  ref={ref}
                  width={28}
                  className="p-1"
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={SavePassword}
            className="flex justify-center items-center bg-green-400  rounded-full px-4 py-2 w-fit gap-1 hover:bg-green-300 cursor-pointer border-green-700 border-[2px]"
            trigger="hover"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-center font-bold p-5">
              No passwords to show
            </div>
          )}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-4">
              <thead className="bg-green-700 text-white ">
                <tr>
                  <th className="font-[400] py-1">Site</th>
                  <th className="font-[400] py-1">Username</th>
                  <th className="font-[400] py-1">Password</th>
                  <th className="font-[400] py-1">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border  border-white text-center">
                        <div className="flex items-center justify-center">
                          <a href={`https://${item.site}`} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <abbr title="Copy!">
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </abbr>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border[2px] border-white ">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <abbr title="Copy!">
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </abbr>
                          </div>
                        </div>
                      </td>
                      <td className="py-2  border[2px] border-white   text-center  ">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <abbr title="Copy!">
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </abbr>
                          </div>
                        </div>
                      </td>
                      <td className="py-2  border[2px] border-white   text-center">
                        <div className="actions flex justify-evenly items-center">
                          <span
                            className="cursor-pointer"
                            onClick={() => DeletePassword(item.id)}
                          >
                            <abbr title="Delete">
                              <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </abbr>
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() => EditPassword(item.id, item)}
                          >
                            <abbr title="Edit">
                              <lord-icon
                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                trigger="hover"
                                style={{ width: "25px", height: "25px" }}
                              ></lord-icon>
                            </abbr>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ToastContainer autoClose={1500} position="top-left" theme="dark" />
    </>
  );
};

export default Manager;
