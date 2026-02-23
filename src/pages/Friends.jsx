import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuthUser from "../hooks/useAuthUser";
import { getUserFriends } from "../lib/api";
import ChatLoader from "../components/ChatLoader";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

export default function Friends() {
  const { isLoading: authLoading, authUser } = useAuthUser();

  const friendsQuery = useQuery({
    queryKey: ["userFriends"],
    queryFn: getUserFriends,
    // only fetch friends after we know the user is available
    enabled: !!authUser,
    retry: false,
  });

  const loading = authLoading || friendsQuery.isLoading;

  if (loading) return <ChatLoader />;

  if (!authUser) {
    return (
      <div className="p-6">
        <div className="card bg-base-200 p-6 text-center">
          <h3 className="font-semibold text-lg mb-2">Not signed in</h3>
          <p className="text-base-content opacity-70">
            Please log in to see your friends.
          </p>
        </div>
      </div>
    );
  }

  const friends = friendsQuery.data?.friends || [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Friends</h2>
        <span className="text-sm opacity-70">{friends.length} friend{friends.length !== 1 ? "s" : ""}</span>
      </div>

      {friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((f) => (
            <FriendCard key={f._id} friend={f} />
          ))}
        </div>
      )}
    </div>
  );
}
