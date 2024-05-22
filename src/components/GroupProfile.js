import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './GroupProfile.css';

const GroupProfile = () => {
    const { name } = useParams(); // Retrieve the group name from the route parameter
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the group data when the component mounts
    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await axios.get(`/api/groups/${name}`);
                const allGroups = response.data.allGroups;

                if (allGroups.length === 0) {
                    setError('Group not found'); // No group found with this name
                } else {
                    setGroup(allGroups[0]); // Assume we're displaying the first group in the results
                }

                setLoading(false);
            } catch (err) {
                setError(`Error fetching group profile: ${err.message}`);
                setLoading(false);
            }
        };

        fetchGroup(); // Trigger fetch on component mount
    }, [name]); // Dependency array with `name` to fetch on route change

    if (loading) {
        return <div id='loadingIndicator'>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>; // Display error message if fetching fails
    }

    if (!group) {
        return <div>Group profile not available</div>; // Fallback in case of unexpected issues
    }

    return (
        <div>
            <h2>Group Profile: {group.group_name}</h2>
            <p>Short: {group.short || 'N/A'}</p> {/* Short name */}
            <p>Korean Name: {group.korean_name || 'N/A'}</p> {/* Korean name */}
            <p>Debut: {group.debut || 'N/A'}</p> {/* Debut date */}
            <p>Company: {group.company || 'N/A'}</p> {/* Managing company */}
            <p>Members: {group.members || 'N/A'}</p> {/* Current members */}
            <p>Original Members: {group.original_memb || 'N/A'}</p> {/* Original members */}
            <p>Fanclub Name: {group.fanclub_name || 'N/A'}</p> {/* Fanclub name */}
            <p>Active: {group.active ? 'Yes' : 'No'}</p> {/* Activity status */}
        </div>
    );
};

export default GroupProfile;
