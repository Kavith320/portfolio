"use client";

import { useState, useEffect } from 'react';
import fallbackData from '@/data/portfolioData.json';

export function usePortfolioData() {
    const [data, setData] = useState<any>(fallbackData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(val => {
                setData(val);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return { data, loading };
}

// Helper to map icons since they can't be stored in JSON/DB as components
import { getIcon } from "@/lib/iconMap";

export function useMappedData() {
    const { data, loading } = usePortfolioData();

    const mappedData = {
        ...data,
        achievements: data.achievements?.map((item: any) => ({
            ...item,
            icon: getIcon(item.icon)
        })),
        social: data.social?.map((item: any) => ({
            ...item,
            icon: getIcon(item.icon)
        })),
        skills: data.skills?.map((item: any) => ({
            ...item,
            icon: getIcon(item.icon, 24)
        }))
    };

    return { data: mappedData, loading };
}
