import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Hamhawbanner from './hamhawbanner';
import './SearchEntry.css';
import { EventContext } from '../context/EventContext';

const SearchEntry = () => {
  const { selectedEvent } = useContext(EventContext);
  const [events, setEvents] = useState([]);
  const [activitySources, setActivitySources] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    city: '',
    state: '',
    age: '',
    gender: '',
    disability: '',
    medications: '',
    mobility: '',
    activity_source: '',
    last_seen_city: '',
    last_seen_state: '',
    last_seen_time: '',
    status: '',
    note: '',
    radio_frequency: '',
    referral_source: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDropdownData = async () => {
      const [{ data: eventsData }, { data: activitySourcesData }, { data: statusesData }] = await Promise.all([
        supabase.from('event').select('*'),
        supabase.from('activity_source').select('*'),
        supabase.from('status').select('*'),
      ]);

      setEvents(eventsData || []);
      setActivitySources(activitySourcesData || []);
      setStatuses(statusesData || []);
    };

    fetchDropdownData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      const { data: newSearchPerson, error: insertError } = await supabase.from('search_people').insert([
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
          age: formData.age,
          gender: formData.gender,
          disability: formData.disability,
          medications: formData.medications,
          mobility: formData.mobility,
          event_id: selectedEvent,
          current_status_id: formData.status,
          user_id: userId
        },
      ]).select();

      if (insertError) {
        console.error('Error saving new entry:', insertError);
        return;
      }

      const newPersonId = newSearchPerson[0].id;

      const { error: activityError } = await supabase.from('search_activity').insert([
        {
          search_id: newPersonId,
          user_id: userId,
          activity_source: formData.activity_source,
          last_seen_city: formData.last_seen_city,
          last_seen_state: formData.last_seen_state,
          last_seen_timestamp: formData.last_seen_time,
          status_id: formData.status,
          note: formData.note,
          radio_frequency: formData.radio_frequency,
          referral_source: formData.referral_source,
        },
      ]);

      if (activityError) {
        console.error('Error saving search activity:', activityError);
        return;
      }

      const { error: userError } = await supabase
        .from('users')
        .update({ last_activity: new Date() })
        .eq('id', userId);

      if (userError) {
        console.error('Error updating last activity:', userError);
        return;
      }

      alert('New entry and activity saved successfully!');
      navigate('/find');
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div className="search-entry-container">
      <Navbar />
      <Hamhawbanner />

      <h2>Create a New Entry</h2>

      <div className="search-entry-selected-event">
        <h3>Current Event: {events.find((event) => event.id == selectedEvent)?.name || 'No event selected'}</h3>
      </div>

      <div className="search-entry-form">
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleInputChange} required />
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleInputChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} required />
        <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleInputChange} />
        <input type="text" name="disability" placeholder="Disability" value={formData.disability} onChange={handleInputChange} />
        <input type="text" name="medications" placeholder="Medications" value={formData.medications} onChange={handleInputChange} />
        <input type="text" name="mobility" placeholder="Mobility" value={formData.mobility} onChange={handleInputChange} />

        <select name="activity_source" value={formData.activity_source} onChange={handleInputChange} required>
          <option value="">Select Activity Source</option>
          {activitySources.map((source) => (
            <option key={source.id} value={source.id}>{source.name}</option>
          ))}
        </select>
        <input type="text" name="last_seen_city" placeholder="Last Seen City" value={formData.last_seen_city} onChange={handleInputChange} />
        <input type="text" name="last_seen_state" placeholder="Last Seen State" value={formData.last_seen_state} onChange={handleInputChange} />
        <input type="datetime-local" name="last_seen_time" value={formData.last_seen_time} onChange={handleInputChange} />
        <select name="status" value={formData.status} onChange={handleInputChange} required>
          <option value="">Select Status</option>
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>{status.name}</option>
          ))}
        </select>
        <input type="text" name="note" placeholder="Note" value={formData.note} onChange={handleInputChange} />
        <input type="text" name="radio_frequency" placeholder="Radio Frequency" value={formData.radio_frequency} onChange={handleInputChange} />
        <input type="text" name="referral_source" placeholder="Referral Source" value={formData.referral_source} onChange={handleInputChange} />

        <button type="button" className="search-entry-btn-save Anchor button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default SearchEntry;