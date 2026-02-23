import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

const useLogin = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data, variables, context) => {
      // run internal logic
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // also run external callback
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (err, variables, context) => {
      if (onError) onError(err, variables, context);
    },
  });

  return { error, isPending, loginMutation: mutate };
};

export default useLogin;
