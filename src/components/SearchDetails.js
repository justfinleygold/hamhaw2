import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Navbar from './navbar';
import Hamhawbanner from './hamhawbanner';
import { EventContext } from '../context/EventContext'; // Import EventContext

const SearchDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const { selectedEvent } = useContext(EventContext); // Use context for selected event

  useEffect(() => {
    const fetchPersonDetails = async () => {
      const { data, error } = await supabase
        .from('search_people')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching person details:', error);
      } else {
        setPerson(data);
      }
    };

    fetchPersonDetails();
  }, [id]);

  if (!person) {
    return <p>Loading...</p>;
  }

  return (
    <div className="search-details-container">
      <Navbar />
      <Hamhawbanner />

      <h1>Details for {person.first_name} {person.last_name}</h1>
      <p><strong>City:</strong> {person.city}</p>
      <p><strong>State:</strong> {person.state}</p>
      <p><strong>Email:</strong> {person.email}</p>
      <p><strong>Phone:</strong> {person.phone}</p>
      <p><strong>Age:</strong> {person.age}</p>
      <p><strong>Gender:</strong> {person.gender}</p>
      <p><strong>Disability:</strong> {person.disability}</p>
      <p><strong>Medications:</strong> {person.medications}</p>
      <p><strong>Mobility:</strong> {person.mobility}</p>
    </div>
  );
};

export default SearchDetails;