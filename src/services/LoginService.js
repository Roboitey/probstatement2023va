import { json } from "react-router-dom";
import { getUser } from "./userService";
import { useState } from "react";

const convertHexToBuffer = (hexString) => {
  console.log(hexString);
  return Uint8Array.from(
    hexString.match(/[0-9a-f]{1,2}/gi).map((byte) => parseInt(byte, 16))
  );
};

const convertBufferToHex = (buffer) => {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const deriveKeyFromPassword = async (passwordString, saltBuffer) => {
  // We'll use a TextEncoder to convert strings into arrays of bytes:
  const textEncoder = new TextEncoder();

  // Convert the password string into an array of bytes:
  const passwordBuffer = textEncoder.encode(passwordString);

  // Use WebCrypto to generate an array of 16 random bytes if one isn't passed
  // in:
  saltBuffer = saltBuffer || window.crypto.getRandomValues(new Uint8Array(16));

  // Convert our passwordBuffer into something WebCrypto understands:
  const plaintextKey = await window.crypto.subtle.importKey(
    "raw", // We're working with a "raw" array of bytes
    passwordBuffer, // Pass in our (converted) password byte array
    "PBKDF2", // Tell WebCrypto our byte array doesn't contain anything fancy
    false, // We don't want anyone to extract the original password!
    ["deriveBits"] // We're gonna use this method to derive a key (below)
  );

  const pbkdf2Buffer = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: 100000,
      hash: "SHA-256",
    },
    plaintextKey,
    64 * 8
  );

  const saltString = convertBufferToHex(saltBuffer);
  const keyString = convertBufferToHex(pbkdf2Buffer);

  // Return the key and salt as hexadecimal strings
  return { keyString, saltString };
};
export function LoginSystem(Username, Password) {
  return getUser(Username).then(
    (user) => {
      if (user.success) {
        const salt = convertHexToBuffer(user["user"]["salt"]);
        const userid = user["user"]["user_id"];
        return deriveKeyFromPassword(Password, salt).then((key) => {
          const requestOptions = {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer 0986ce94-fa35-49b9-a7cc-a631322aa384",
            },
            body: JSON.stringify({
              key: key["keyString"],
            }),
          };
          return fetch(
            "https://inbdpa.api.hscc.bdpa.org/v2/users/" + userid + "/auth",
            requestOptions
          ).then((res) => {
            return res.json().then((data) => {
              console.log(data);
              if (data["success"]) {
                console.log();
                localStorage.setItem("user", JSON.stringify(user["user"]));
              } else {
                console.log(data);
              }
              return data;
            });
          });
        });
      }
    },
    (error) => {
      return error;
    }
  );
}
export function SignUpSystem(username, email, password, fullName) {
  return deriveKeyFromPassword(password).then((data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 0986ce94-fa35-49b9-a7cc-a631322aa384",
      },
      body: JSON.stringify({
        key: data["keyString"],
        salt: data["saltString"],
        username: username,
        email: email,
        fullName: fullName,
        type: "inner",
      }),
    };
    return fetch(
      "https://inbdpa.api.hscc.bdpa.org/v2/users",
      requestOptions
    ).then((response) => {
      return response.json();
    });
  });
}
export function ChangePassword(username, password) {
  return getUser(username).then((user) => {
    if (user.success) {
      return deriveKeyFromPassword(password).then((data) => {
        const requestOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 0986ce94-fa35-49b9-a7cc-a631322aa384",
          },
          body: JSON.stringify({
            key: data["keyString"],
            salt: data["saltString"],
          }),
        };
        return fetch(
          "https://inbdpa.api.hscc.bdpa.org/v2/users/" + user.user.user_id,
          requestOptions
        ).then((response) => {
          return response.json();
        });
      });
    }
  });
}
export function SignInSystem(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
/*then((data) => {
  console.log(data)
  if (data["success"]) {
    console.log()
    localStorage.setItem("user", JSON.stringify(user["user"]));
  }
  else{
    console.log(data)
  }
}); */
