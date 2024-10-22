import React, { useEffect, useState, useContext } from 'react';
import { supabase } from '../supabaseClient';
import Navbar from './navbar';
import Hamhawbanner from './hamhawbanner';
import './find.css';
import { EventContext } from '../context/EventContext';

const Find = () => {
  const { selectedEvent, setSelectedEvent } = useContext(EventContext);
  const [events, setEvents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    city: '',
    state: ''
  });

  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('event').select('*').order('start_date', { ascending: false });
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
        if (!selectedEvent && data.length > 0) {
          setSelectedEvent(data[0].id); // Set the first event as default if not selected
        }
      }
    };

    fetchEvents();
  }, [setSelectedEvent, selectedEvent]);

  // Fetch search results based on selected event and form inputs
  useEffect(() => {
    const fetchSearchResults = async () => {
      const { data, error } = await supabase
        .from('search_people')
        .select('*')
        .eq('event_id', selectedEvent)
        .ilike('first_name', `%${formData.first_name}%`)
        .ilike('last_name', `%${formData.last_name}%`)
        .ilike('city', `%${formData.city}%`)
        .ilike('state', `%${formData.state}%`);
        
      if (error) {
        console.error('Error fetching search results:', error);
      } else {
        setSearchResults(data);
      }
    };

    if (selectedEvent) {
      fetchSearchResults();
    }
  }, [selectedEvent, formData]);

  // Handle input changes for search form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="find-container1">
      <Navbar />
      <Hamhawbanner />

      <div className="find-container2">
        <h2>Search for a person or city</h2>

        <div className="find-container-search-row">
          <label className="find-lbl-select">Event: </label>
          <select
            id="cboEvent"
            className="find-cbo-event"
            value={selectedEvent || ''}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            id="txtFirstName"
            name="first_name"
            placeholder="First Name"
            className="find-txt-first-name input"
            value={formData.first_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="txtLastName"
            name="last_name"
            placeholder="Last Name"
            className="find-txt-last-name input"
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="txtCity"
            name="city"
            placeholder="City"
            className="find-txt-city input"
            value={formData.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="txtState"
            name="state"
            placeholder="State"
            className="find-txt-state input"
            value={formData.state}
            onChange={handleInputChange}
          />

          <button
            id="btnNewEntry"
            className="find-btn-new-entry Anchor button"
            onClick={() => window.location.href = '/newentry'}
          >
            <span>NEW ENTRY</span>
          </button>
        </div>
      </div>

      {/* Search Results Grid */}
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
            <span>Condition</span>
          </div>
          <div className="find-container-col6">
            <span>When</span>
          </div>
        </div>

        {/* Map search results */}
        {searchResults.map((person) => (
          <div key={person.id} className="find-gridmissingrow">
            <div className="find-container-col1">
              <span>{person.first_name}</span>
            </div>
            <div className="find-container-col2">
              <span>{person.last_name}</span>
            </div>
            <div className="find-container-col3">
              <span>{person.city}</span>
            </div>
            <div className="find-container-col4">
              <span>{person.state}</span>
            </div>
            <div className="find-container-col5">
              <span>{person.current_status_id === 1 ? 'Missing' : 'Found'}</span>
            </div>
            <div className="find-container-col6">
              <span>{new Date(person.created_at).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Find;
