import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Hamhawbanner from './hamhawbanner';
import './find.css';
import { EventContext } from '../context/EventContext';

const Find = () => {
  const { selectedEvent, setSelectedEvent } = useContext(EventContext); // Use EventContext
  const [events, setEvents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchFields, setSearchFields] = useState({
    first_name: '',
    last_name: '',
    city: '',
    state: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events from Supabase
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('event').select('*').order('start_date', { ascending: false });
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
        // Set the default selected event to the newest event
        if (data.length > 0 && !selectedEvent) {
          setSelectedEvent(data[0].id);
        }
      }
    };

    fetchEvents();
  }, [selectedEvent, setSelectedEvent]);

  // Fetch search results based on selected event and search fields
  useEffect(() => {
    const fetchSearchResults = async () => {
      const { data, error } = await supabase
        .from('search_people')
        .select('*')
        .eq('event_id', selectedEvent)
        .ilike('first_name', `%${searchFields.first_name}%`)
        .ilike('last_name', `%${searchFields.last_name}%`)
        .ilike('city', `%${searchFields.city}%`)
        .ilike('state', `%${searchFields.state}%`);

      if (error) {
        console.error('Error fetching search results:', error);
      } else {
        setSearchResults(data);
      }
    };

    if (selectedEvent) {
      fetchSearchResults();
    }
  }, [selectedEvent, searchFields]);

  const handleInputChange = (e) => {
    setSearchFields({ ...searchFields, [e.target.name]: e.target.value });
  };

  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value); // Update selected event in context
  };

  const handleRowClick = (searchId) => {
    navigate(`/search-details/${searchId}`); // Navigate to the SearchDetails screen with the selected search person's ID
  };

  const handleNewEntry = () => {
    navigate('/search-entry'); // Navigate to the new entry screen
  };

  return (
    <div className="find-container">
      <Navbar />
      <Hamhawbanner />
      <h2>Find a Person</h2>

      {/* Search Fields (now includes Event dropdown in the same blue area) */}
      <div className="find-container-search-row">
        <select
          id="cboEvent"
          value={selectedEvent || ''}
          onChange={handleEventChange}
          required
          className="find-cbo-event"
        >
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={searchFields.first_name}
          onChange={handleInputChange}
          className="find-txt-first-name input"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={searchFields.last_name}
          onChange={handleInputChange}
          className="find-txt-last-name input"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={searchFields.city}
          onChange={handleInputChange}
          className="find-txt-city input"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={searchFields.state}
          onChange={handleInputChange}
          className="find-txt-state input"
        />

        {/* New Entry Button */}
        <button
          id="btnNewEntry"
          name="btnNewEntry"
          type="button"
          className="find-btn-new-entry Anchor button"
          onClick={handleNewEntry}
        >
          <span>NEW ENTRY</span>
        </button>
      </div>

      {/* Display search results */}
      <div className="find-gridmissing">
        <div className="find-gridmissingrow1">
          <div className="find-container-col1">
            <span>First Name</span>
          </div>
          <div className="find-container-col2">
            <span>Last Name</span>
          </div>
          <div className="find-container-col3">
            <span>City</span>
          </div>
          <div className="find-container-col4">
            <span>State</span>
          </div>
          <div className="find-container-col5">
            <span>Gender</span>
          </div>
          <div className="find-container-col6">
            <span>Age</span>
          </div>
        </div>
        {searchResults.map((result) => (
          <div
            key={result.id}
            className="find-gridmissingrow1"
            onClick={() => handleRowClick(result.id)} // Make the row clickable
            style={{ cursor: 'pointer' }} // Change the cursor to pointer when hovering
          >
            <div className="find-container-col1">
              <span>{result.first_name}</span>
            </div>
            <div className="find-container-col2">
              <span>{result.last_name}</span>
            </div>
            <div className="find-container-col3">
              <span>{result.city}</span>
            </div>
            <div className="find-container-col4">
              <span>{result.state}</span>
            </div>
            <div className="find-container-col5">
              <span>{result.gender || 'Unknown'}</span>
            </div>
            <div className="find-container-col6">
              <span>{result.age || 'N/A'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Find;