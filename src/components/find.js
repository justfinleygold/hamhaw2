import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { supabase } from '../supabaseClient';
import './find.css';
import Navbar from './navbar';
import Hamhawbanner from './hamhawbanner';
import { EventContext } from '../context/EventContext'; // Import EventContext

const Find = () => {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [events, setEvents] = useState([]);
  const { selectedEvent, setSelectedEvent } = useContext(EventContext); // Use context for event
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch events from Supabase
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('event')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data);
      if (data.length > 0 && !selectedEvent) {
        setSelectedEvent(data[0].id); // Default to first event if not selected
      }
    }
  };

  // Fetch all people from search_people table
  const fetchAllPeople = async () => {
    const { data, error } = await supabase.from('search_people').select('*');
    if (error) {
      console.error('Error fetching people:', error);
    } else {
      setPeople(data);
      setFilteredPeople(data); // Initially show all people
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    fetchAllPeople();
  }, []);

  // Automatically filter people by event and text fields
  useEffect(() => {
    const filtered = people.filter(person =>
      (!firstName || person.first_name.toLowerCase().includes(firstName.toLowerCase())) &&
      (!lastName || person.last_name.toLowerCase().includes(lastName.toLowerCase())) &&
      (!city || person.city.toLowerCase().includes(city.toLowerCase())) &&
      (!state || person.state.toLowerCase().includes(state.toLowerCase())) &&
      (selectedEvent ? person.event_id === Number(selectedEvent) : true)
    );
    setFilteredPeople(filtered);
  }, [selectedEvent, firstName, lastName, city, state, people]);

  // Handle event selection change
  const handleEventChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  // Handle row click to navigate to the SearchDetails page
  const handleRowClick = (params) => {
    navigate(`/search-details/${params.row.id}`);
  };

  // Navigate to the SearchEntry screen for adding a new entry
  const handleNewEntryClick = () => {
    navigate('/search-entry');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="find-container1">
      <Navbar />
      <Hamhawbanner />
      <div className="find-container-search-row">
        <label className="find-lbl-select">Event: </label>
        <select
          id="cboEvent"
          required={true}
          className="find-cbo-event"
          value={selectedEvent || ''}
          onChange={handleEventChange}
        >
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} ({new Date(event.start_date).toLocaleDateString()})
            </option>
          ))}
        </select>

        {/* Filter input fields */}
        <input
          type="text"
          id="txtFirstName"
          placeholder="First Name"
          className="find-txt-first-name input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          id="txtLastName"
          placeholder="Last Name"
          className="find-txt-last-name input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          id="txtCity"
          required={true}
          placeholder="City"
          className="find-txt-city input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          id="txtState"
          required={true}
          placeholder="State"
          className="find-txt-state input"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        {/* NEW ENTRY Button */}
        <button
          id="btnNewEntry"
          name="btnNewEntry"
          type="button"
          className="find-btn-new-entry Anchor button"
          onClick={handleNewEntryClick}
        >
          <span>NEW ENTRY</span>
        </button>
      </div>

      {/* DataGrid for displaying search results */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredPeople} // Filtered people data
          columns={[
            { field: 'first_name', headerName: 'First Name', width: 150 },
            { field: 'last_name', headerName: 'Last Name', width: 150 },
            { field: 'city', headerName: 'City', width: 150 },
            { field: 'state', headerName: 'State', width: 100 },
            { field: 'status', headerName: 'Status', width: 120 },
            { field: 'last_seen_timestamp', headerName: 'Last Seen', width: 180 },
          ]}
          pageSize={5}
          onRowClick={handleRowClick} // Handle row click
        />
      </div>
    </div>
  );
};

export default Find;