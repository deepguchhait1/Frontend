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
    enabled: !!authUser,
    retry: false,
  });

  const loading = authLoading || friendsQuery.isLoading;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
          {/* Lock Icon Placeholder */}
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error/10 text-error">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-base-content">Not signed in</h3>
          <p className="mt-2 text-sm text-base-content/70">
            Please log in to view and manage your friends list.
          </p>
        </div>
      </div>
    );
  }

  const friends = friendsQuery.data?.friends || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-base-200 pb-5 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-base-content">
            Your Friends
          </h2>
          <p className="mt-1 text-sm text-base-content/60">
            Stay connected and see what your circle is up to.
          </p>
        </div>
        <div>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary ring-1 ring-inset ring-primary/20">
            {friends.length} friend{friends.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Friends Grid Content */}
      {friends.length === 0 ? (
        <div className="py-12">
          <NoFriendsFound />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {friends.map((f) => (
            <div
              key={f._id}
              className="transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md rounded-xl"
            >
              <FriendCard friend={f} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}