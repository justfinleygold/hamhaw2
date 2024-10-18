import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const PersonDetails = () => {
  const { id } = useParams(); // Get the person's ID from the URL
  const [person, setPerson] = useState(null);
  const [searchActivity, setSearchActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Move fetchPersonDetails inside useEffect
    const fetchPersonDetails = async () => {
      const { data: personData, error: personError } = await supabase
        .from('search_people')
        .select('*')
        .eq('id', id)
        .single();

      const { data: activityData, error: activityError } = await supabase
        .from('search_activity')
        .select('*, status(name), activity_source(name)')
        .eq('search_id', id); // Link the activity to the person

      if (personError || activityError) {
        console.error('Error fetching details:', personError || activityError);
      } else {
        setPerson(personData);
        setSearchActivity(activityData);
      }
      setLoading(false);
    };

    fetchPersonDetails(); // Call the function when the component loads
  }, [id]); // Only re-run when the 'id' changes

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{person.first_name} {person.last_name}</h1>
      <p>Last seen in: {person.city}, {person.state}</p>
      <h2>Search Activity</h2>
      <ul>
        {searchActivity.map(activity => (
          <li key={activity.id}>
            Activity Source: {activity.activity_source.name}, Status: {activity.status.name}
            <p>Note: {activity.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonDetails;