'use server'

import { update } from "@/lib/auth";

export default async function refreshToken() {
  const refreshResponse = await fetch(`${process.env.API_ROUTE}/refresh`)

  const response = refreshResponse.json()

  response
    .then(response => {
      update(response)
    })
    .catch(err => {
      console.log(err);
    })
}