import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MessageCircle } from "lucide-react";
const FriendCard = ({ friend }) => {
  console.log(friend);

  return (
    <div className="card bg-base-200 border border-base-300 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
      <div className="card-body p-5">
        {/* Header */}
        {/* <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-primary text-primary-content flex items-center justify-center font-bold text-lg">
              {friend.profilePic ? (
                <img
                  src={friend.profilePic}
                  alt={friend.fullName}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>
                  {friend.fullName?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>

            {friend.isOnline && (
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-success border-2 border-base-200"></span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg truncate">
              {friend.fullName}
            </h3>

            <p className="text-sm opacity-70 line-clamp-2 mt-1">
              {friend.bio || "Ready to practice languages together."}
            </p>
          </div>
        </div> */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-primary text-primary-content flex items-center justify-center font-bold text-xl">
              {friend.profilePic ? (
                <img
                  src={friend.profilePic}
                  alt={friend.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                friend.fullName?.charAt(0).toUpperCase()
              )}
            </div>

            {friend.isOnline && (
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-success border-2 border-base-100"></span>
            )}
          </div>

          <div>
            <h3 className="font-bold text-xl">{friend.fullName}</h3>
            <p className="text-sm opacity-70">
              {friend.bio || "Ready to learn languages"}
            </p>
          </div>
        </div>

        {/* Languages */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-3 py-2">
            {getLanguageFlag(friend.nativeLanguage)}
            <div className="text-center">
              <p className="text-xs opacity-70">Native</p>
              <p className="font-medium capitalize">
                {friend.nativeLanguage}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-xl bg-secondary/10 border border-secondary/20 px-3 py-2">
            {getLanguageFlag(friend.learningLanguage)}
            <div className="text-center">
              <p className="text-xs opacity-70">Learning</p>
              <p className="font-medium capitalize">
                {friend.learningLanguage}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5">
          <Link
            to={`/chat/${friend._id}`}
            className="btn btn-primary w-full rounded-xl gap-2"
          >
            <MessageCircle size={18} />
            Message
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
