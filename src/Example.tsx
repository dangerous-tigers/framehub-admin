"use client";
import { GET_USER } from "@/queries/user";
import { GetUserQuery } from "@/queries/user.generated";
import { useQuery } from "@apollo/client/react";

export const Example = () => {
  const { data } = useQuery<GetUserQuery>(GET_USER, {
    variables: { userId: 284 },
  });
  console.log(data);

  return <div>{data?.getUser.id}</div>;
};
