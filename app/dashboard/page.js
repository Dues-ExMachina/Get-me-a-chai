import Dashboard from "@/components/Dashboard";
import React, { useCallback, useEffect, useState } from 'react';


const dashboardPage = () => {
    return (
        <>
            <Dashboard />
        </>
    );
}

export default dashboardPage;

export const metadata = {
    title: 'Dashboard - Get Me a Chai',
    description: 'Dashboard page for Get Me a Chai application',
}