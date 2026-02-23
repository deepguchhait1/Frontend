import { useMutation, useQueryClient } from "@tanstack/react-query";

import React from "react";
import { logout } from "../lib/api";
export default function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logoutMutation,isPending,error } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return {logoutMutation,isPending,error}
}
