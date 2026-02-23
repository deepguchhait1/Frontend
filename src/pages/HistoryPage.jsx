import { useQuery } from "@tanstack/react-query";
import { HistoryIcon, Video, Phone, PhoneMissed, PhoneIncoming, PhoneOutgoing } from "lucide-react";
import { Link } from "react-router";
import { getCallHistory } from "../lib/api";

const HistoryPage = () => {
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["callHistory"],
    queryFn: getCallHistory,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const getCallIcon = (type, status) => {
    if (status === "missed") {
      return <PhoneMissed className="size-4 text-error" />;
    }
    if (status === "incoming") {
      return <PhoneIncoming className="size-4 text-success" />;
    }
    if (status === "outgoing") {
      return <PhoneOutgoing className="size-4 text-info" />;
    }
    return type === "video" ? <Video className="size-4" /> : <Phone className="size-4" />;
  };

  const getCallStatus = (status) => {
    const statusMap = {
      missed: { label: "Missed", color: "text-error" },
      incoming: { label: "Incoming", color: "text-success" },
      outgoing: { label: "Outgoing", color: "text-info" },
    };
    return statusMap[status] || { label: "Call", color: "text-base-content" };
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-base-300 bg-base-100">
        <div className="flex items-center gap-3">
          <HistoryIcon className="size-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">History</h1>
            <p className="text-sm text-base-content/60">
              Your recent conversations and calls
            </p>
          </div>
        </div>
      </div>

      {/* History Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <HistoryIcon className="size-16 text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No History Yet</h3>
            <p className="text-base-content/60 max-w-sm">
              Your chat and call history will appear here once you start connecting with language partners.
            </p>
            <Link to="/dashboard" className="btn btn-primary mt-6">
              Find Language Partners
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((item) => {
              const callStatus = getCallStatus(item.status);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-base-100 hover:bg-base-200 transition-colors cursor-pointer rounded-lg"
                >
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img
                        src={item.user?.profilePic || "/default-avatar.svg"}
                        alt={item.user?.fullName}
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base truncate">
                      {item.user?.fullName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      {getCallIcon(item.type, item.status)}
                      <span className={callStatus.color}>
                        {callStatus.label}
                      </span>
                      {item.duration && (
                        <span className="text-base-content/60">
                          • {item.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-base-content/60 whitespace-nowrap">
                    {item.timestamp}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
