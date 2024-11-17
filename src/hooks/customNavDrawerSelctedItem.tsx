import { useEffect, useState } from "react";

export default function NavDrawerSelectedItem() {
  const [selDrawerItem, setSelDrawerItem] = useState("dashboard");

  function handleDrawerItem(text: string) {
    setSelDrawerItem(text);
  }

  return [selDrawerItem, handleDrawerItem] as const;
}
