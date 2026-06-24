import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon,ArrowLeftRightIcon } from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  // backend returns { friends: [...] } so normalize the query data
  const { data: friendsData = { friends: [] }, isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,

  });

  // ensure `friends` is always an array before using .map
  const friends = Array.isArray(friendsData) ? friendsData : friendsData.friends || [];

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.outgoingRequests && outgoingFriendReqs.outgoingRequests.length > 0) {
      outgoingFriendReqs.outgoingRequests.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-base-100">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Meet New Learners</h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your profile
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="bg-base-300 border border-base-300 rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="p-5">
                      {/* Profile */}
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full overflow-hidden bg-primary/10 text-primary flex items-center justify-center font-semibold text-lg">
                            {user.profilePic ? (
                              <img
                                src={user.profilePic}
                                alt={user.fullName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              user.fullName?.charAt(0).toUpperCase()
                            )}
                          </div>

                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-base-100"></span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-base truncate">
                            {user.fullName}
                          </h3>

                          {user.location && (
                            <div className="flex items-center gap-1 text-xs opacity-60 mt-1">
                              <MapPinIcon className="size-3" />
                              <span className="truncate">{user.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm opacity-70 mt-4 line-clamp-2 min-h-[40px]">
                        {user.bio || "Looking for language exchange partners."}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-base-300"></div>

                    {/* Languages */}
                    <div className="px-5 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center">
                            {getLanguageFlag(user.nativeLanguage)}
                          </div>

                          <div>
                            <p className="font-medium text-sm capitalize">
                              {capitialize(user.nativeLanguage)}
                            </p>
                            <p className="text-xs opacity-50">
                              Native
                            </p>
                          </div>
                        </div>

                        <ArrowLeftRightIcon className="size-4 opacity-30" />

                        <div className="flex items-center gap-2">
                          <div>
                            <p className="font-medium text-sm capitalize text-right">
                              {capitialize(user.learningLanguage)}
                            </p>
                            <p className="text-xs opacity-50 text-right">
                              Learning
                            </p>
                          </div>

                          <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center">
                            {getLanguageFlag(user.learningLanguage)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-base-300"></div>

                    {/* Action */}
                    <div className="p-4">
                      <button
                        className={`btn w-full rounded-xl ${hasRequestBeenSent
                            ? "btn-success btn-disabled"
                            : "btn-outline"
                          }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4" />
                            Connect
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
