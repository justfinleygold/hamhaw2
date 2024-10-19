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
  const [emailForLogin, setEmailForLogin] = useState(''); // Email for login
  const [user, setUser] = useState(null); // User state
  const [isLoginRequired, setIsLoginRequired] = useState(false); // Track if login is required
  const navigate = useNavigate();

  // Fetch events from Supabase (for event dropdown)
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('event').select('*');
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user); // If user exists, store in state
      } else {
        setIsLoginRequired(true); // Show login if no user
      }
    };
    checkUser();
  }, []);

  // Handle input changes for entry form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save the new entry to the database
  const handleSave = async () => {
    const { error } = await supabase.from('search_people').insert([
      {
        ...formData,
        event_id: selectedEvent, // Use selectedEvent from context
      },
    ]);

    if (error) {
      console.error('Error saving new entry:', error);
    } else {
      alert('New entry saved successfully!');
      navigate('/find'); // Navigate back to the search page after saving
    }
  };

  // Handle email login with magic link
  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: emailForLogin,
      options: {
        redirectTo: `https://hamhaw-staging.vercel.app/search-entry`, // Redirect back after login
      },
    });

    if (error) {
      console.error('Error sending login link:', error);
    } else {
      alert('Check your email for the login link.');
    }
  };

  // If login is required, show the email login form
  if (isLoginRequired && !user) {
    return (
      <div className="search-entry-container">
        <Navbar />
        <Hamhawbanner />
        <h2>Login Required</h2>
        <p>Enter your email to log in and create a new entry:</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={emailForLogin}
          onChange={(e) => setEmailForLogin(e.target.value)}
        />
        <button onClick={handleEmailLogin}>Send Login Link</button>
      </div>
    );
  }

  // If user is logged in, show the New Entry form
  return (
    <div className="search-entry-container">
      <Navbar />
      <Hamhawbanner />

      <h2>Create a New Entry</h2>

      {/* Display the selected event at the top */}
      <div className="search-entry-selected-event">
        <h3>Current Event: {events.find(event => event.id === selectedEvent)?.name || 'No event selected'}</h3>
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