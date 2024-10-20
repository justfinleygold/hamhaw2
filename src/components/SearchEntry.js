import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Hamhawbanner from './hamhawbanner';
import './SearchEntry.css';
import { EventContext } from '../context/EventContext'; // Import EventContext

const SearchEntry = () => {
  const { selectedEvent } = useContext(EventContext); // Use context to get selected event
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    age: '',
    gender: '',
    disability: '',
    medications: '',
    mobility: ''
  });
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null); // State to store current user

  // Fetch current session and user
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
      } else {
        setCurrentUser(session?.user);
      }
    };

    fetchSession();
  }, []);

  // Fetch events from Supabase (for event dropdown)
  useEffect(() => {
    const fetchEvents = async () => {
        const { data, error } = await supabase.from('event').select('*').order('start_date', { ascending: false });
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save the new entry to the database
  const handleSave = async () => {
    try {
      if (!currentUser) {
        alert('User not authenticated.');
        return;
      }

      // Insert into search_people table
      const { error } = await supabase.from('search_people').insert([
        {
          ...formData,
          event_id: selectedEvent, // Use the selectedEvent from context
        },
      ]);

      if (error) {
        console.error('Error saving new entry:', error);
        return;
      }

      // Update last_activity in the users table
      const { error: userError } = await supabase
        .from('users')
        .update({ last_activity: new Date() })
        .eq('id', currentUser.id); // Correct usage to update based on current user's ID

      if (userError) {
        console.error('Error updating last activity:', userError);
        return;
      }

      alert('New entry saved successfully!');
      navigate('/find'); // Navigate back to the search page after saving
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div className="search-entry-container">
      <Navbar />
      <Hamhawbanner />

      <h2>Create a New Entry</h2>

      {/* Display the selected event at the top */}
      <div className="search-entry-selected-event">
      {console.log(events)}
        <h3>Current Event:  {events.find(event => event.id == selectedEvent)?.name || 'No event selected'}</h3>
      </div>

      <div className="search-entry-form">
        {/* Render input fields for each column in the search_people table */}
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="disability"
          placeholder="Disability"
          value={formData.disability}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="medications"
          placeholder="Medications"
          value={formData.medications}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="mobility"
          placeholder="Mobility"
          value={formData.mobility}
          onChange={handleInputChange}
        />

        {/* Save Button */}
        <button
          type="button"
          className="search-entry-btn-save Anchor button"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SearchEntry;
