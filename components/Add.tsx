"use client";
import { db } from "@/db/db.model";
import { useCallback } from "react";
export default function Add() {
  const add = useCallback(async () => {
    await db.user.add({
      name: "Farida",
    });
    console.log("Heya!");
  }, []);
  return <button onClick={add}>Add</button>;
}
