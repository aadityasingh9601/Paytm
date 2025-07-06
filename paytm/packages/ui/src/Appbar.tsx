import React from "react";

interface AppbarTypes {
  onSignin: any;
  onSignout: any;
  user: any;
}

export default function Appbar({ onSignin, onSignout, user }: AppbarTypes) {
  return <div>This is a basic app bar.</div>;
}
