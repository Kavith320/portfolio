"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
    const pathname = usePathname();
    const sessionIdRef = useRef<string | null>(null);
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        // Initialize Session ID
        if (!sessionIdRef.current) {
            sessionIdRef.current = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
        }

        const sessionId = sessionIdRef.current;
        const startTime = Date.now();
        startTimeRef.current = startTime;

        // Track Page View
        const trackPageView = async () => {
            try {
                await fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sessionId,
                        type: 'page_view',
                        path: pathname,
                        screenSize: `${window.innerWidth}x${window.innerHeight}`
                    })
                });
            } catch (err) {
                console.error('Analytics error:', err);
            }
        };

        trackPageView();

        // Heartbeat / Duration tracking
        const heartbeatInterval = setInterval(async () => {
            const duration = Math.floor((Date.now() - startTime) / 1000);
            try {
                await fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sessionId,
                        type: 'session_heartbeat',
                        path: pathname,
                        duration,
                        screenSize: `${window.innerWidth}x${window.innerHeight}`
                    })
                });
            } catch (err) {}
        }, 30000); // 30 seconds

        return () => {
            clearInterval(heartbeatInterval);
        };
    }, [pathname]);

    return null;
}
