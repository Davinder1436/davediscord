"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Pusher from "pusher-js";

type PusherContextType = {
    pusher: Pusher | null;
    isConnected: boolean;
};

const PusherContext = createContext<PusherContextType>({
    pusher: null,
    isConnected: false,
});

export const usePusherClient = () => {
    return useContext(PusherContext);
};

export const PusherProvider = ({ children }: { children: React.ReactNode }) => {
    const [pusher, setPusher] = useState<Pusher | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    

    useEffect(() => {
        

        const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });

        const handleStateChange = (state: any) => {
            console.log("[PUSHER_STATE_CHANGE]", state);
            if (state.current === "connected" && !isConnected) {
                setIsConnected(true);
            } else if (state.current !== "connected" && isConnected) {
                setIsConnected(false);
            }
        };

        const handleError = (err: any) => {
            console.error("[PUSHER_CLIENT_CONNECTION]", err);
        };

        pusherInstance.connection.bind("state_change", handleStateChange);
        pusherInstance.connection.bind("error", handleError);

        setPusher(pusherInstance);

        return () => {
            console.log("useEffect cleanup");
            pusherInstance.connection.unbind("state_change", handleStateChange);
            pusherInstance.connection.unbind("error", handleError);
            pusherInstance.disconnect();
        };
    }, [isConnected]);

    return (
        <PusherContext.Provider value={{ pusher, isConnected }}>
            {children}
        </PusherContext.Provider>
    );
};
