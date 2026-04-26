import React, { useEffect, useState, useRef } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  increment,
  limit
} from 'firebase/firestore';
import { db } from '../firebase';
import './guestbook.css';

interface Visitor {
  id: string;
  name: string;
  message: string;
  date: string;
  time: string;
  location: string;
  timestamp: number;
}

interface Visit {
  id: string;
  date: string;
  time: string;
  location: string;
  countryCode: string;
  flagEmoji: string;
  timestamp: number;
}

interface LocationData {
  location: string;
  countryCode: string;
  flagEmoji: string;
}

const Guestbook: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('Loading location...');
  
  const [totalClicks, setTotalClicks] = useState(0);
  const [lastVisit, setLastVisit] = useState<Visitor | null>(null);
  const [loading, setLoading] = useState(true);
  const visitRecordedRef = useRef(false);

  // Convert country code to flag emoji
  const getCountryFlag = (code: string): string => {
    if (!code || code.length !== 2) return '🌍';
    
    try {
      const codePoints = code
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    } catch (error) {
      console.error('Error converting flag:', error);
      return '🌍';
    }
  };

  // Load data on mount
  useEffect(() => {
    const initializeData = async () => {
      const locationData = await getLocation();
      await loadGuestbookEntries();
      await loadStats();
      await loadVisitHistory();
      
      if (!visitRecordedRef.current) {
        visitRecordedRef.current = true;
        await recordVisit(locationData);
      }
    };

    initializeData();
  }, []);

  // Get user's location
  const getLocation = async (): Promise<LocationData> => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      const state = data.region || data.region_code || '';
      const country = data.country_name || 'Unknown';
      const code = (data.country_code || data.country || '').toUpperCase();
      
      const flag = getCountryFlag(code);
      
      const locationString = state 
        ? `${state}, ${country}` 
        : country;
      
      const displayLocation = `${flag} ${locationString}`;
      
      setLocation(displayLocation);
      

      return { 
        location: locationString, 
        countryCode: code,
        flagEmoji: flag
      };
    } catch (error) {
      console.error('Error getting location:', error);
      setLocation('Location unknown');
      return { 
        location: 'Location unknown', 
        countryCode: '',
        flagEmoji: ''
      };
    }
  };

  // Load guestbook entries
  const loadGuestbookEntries = async () => {
    try {
      const q = query(
        collection(db, 'guestbook'),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const entries: Visitor[] = [];

      querySnapshot.forEach((doc) => {
        entries.push({
          id: doc.id,
          ...doc.data()
        } as Visitor);
      });

      setVisitors(entries);
      if (entries.length > 0) {
        setLastVisit(entries[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading entries:', error);
      setLoading(false);
    }
  };

  // Load statistics
  const loadStats = async () => {
    try {
      const statsDoc = await getDocs(collection(db, 'stats'));

      if (!statsDoc.empty) {
        const statsData = statsDoc.docs[0].data();
        setTotalClicks(statsData.totalVisits || 0);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  
  const loadVisitHistory = async () => {
  try {
    const q = query(
      collection(db, 'visitHistory'),
      orderBy('timestamp', 'desc'), 
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    const visitsList: Visit[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const flag = getCountryFlag(data.countryCode || '');
      visitsList.push({
        id: doc.id,
        date: data.date,
        time: data.time,
        location: data.location,
        countryCode: data.countryCode || '',
        flagEmoji: flag,
        timestamp: data.timestamp
      } as Visit);
    });

    setVisits(visitsList);
  } catch (error) {
    console.error('Error loading visit history:', error);
  }
};

  // Record a visit
  const recordVisit = async (locationData: LocationData) => {
    try {
      const timestamp = Date.now();
      const visitData = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        location: locationData.location,
        countryCode: locationData.countryCode,
        flagEmoji: locationData.flagEmoji,
        timestamp: timestamp
      };

      await addDoc(collection(db, 'visitHistory'), visitData);

      const statsQuery = await getDocs(collection(db, 'stats'));

      if (statsQuery.empty) {
        await addDoc(collection(db, 'stats'), {
          totalVisits: 1,
          lastVisitDate: visitData.date,
          lastVisitTime: visitData.time,
          lastVisitLocation: locationData.location,
          lastVisitCountryCode: locationData.countryCode
        });
      } else {
        const statsDocId = statsQuery.docs[0].id;
        await updateDoc(doc(db, 'stats', statsDocId), {
          totalVisits: increment(1),
          lastVisitDate: visitData.date,
          lastVisitTime: visitData.time,
          lastVisitLocation: locationData.location,
          lastVisitCountryCode: locationData.countryCode
        });
      }

      setTimeout(() => {
        loadStats();
        loadVisitHistory();
      }, 500);
    } catch (error) {
      console.error('Error recording visit:', error);
    }
  };

  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Format time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      alert('Please fill in both name and message!');
      return;
    }

    try {
      const timestamp = Date.now();
      const cleanLocation = location.replace(/^[🌍✈️🗺️🏳️‍🌈🌐]\s*/, '');
      
      const newEntry = {
        name: name.trim(),
        message: message.trim(),
        date: formatDate(timestamp),
        time: formatTime(timestamp),
        location: cleanLocation,
        timestamp: timestamp
      };

      await addDoc(collection(db, 'guestbook'), newEntry);
      await loadGuestbookEntries();

      setName('');
      setMessage('');
      alert('Thank you for signing the guestbook! ^^');
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('Error signing guestbook. Please try again.');
    }
  };

  // Delete visitor (signature only)
  const deleteVisitor = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteDoc(doc(db, 'guestbook', id));
        await loadGuestbookEntries();
      } catch (error) {
        console.error('Error deleting entry:', error);
        alert('Error deleting entry.');
      }
    }
  };

  return (
    <div className="guestbook-content">
      {/* Header */}
      <fieldset>
        <legend>Welcome to my Guestbook! ^^</legend>
        <p>
          Sign my guestbook and leave a message! I'd love to see who visits my website.
          <br />
          Your location and timestamp will be recorded automatically.
        </p>
      </fieldset>

      {/* Website Statistics */}
      <fieldset>
        <legend>Website Statistics</legend>
        <div className="statistics">
          <div className="stat-item">
            <strong>Total Website Visits:</strong> {totalClicks}
          </div>
          {lastVisit && (
            <>
              <div className="stat-item">
                <strong>Last Visitor:</strong> {lastVisit.name}
              </div>
              <div className="stat-item">
                <strong>Last Visit:</strong> {lastVisit.date} at {lastVisit.time}
              </div>
              <div className="stat-item">
                <strong>Last Location:</strong> {lastVisit.location}
              </div>
            </>
          )}
        </div>
      </fieldset>

      
      <fieldset>
  <legend>Latest Visits ({visits.length})</legend>
  {visits.length === 0 ? (
    <p className="no-entries">No visit history yet.</p>
  ) : (
    <div className="visit-history">
      {visits.map((visit, index) => (
        <div key={visit.id} className="visit-item">
          <div className="visit-header">
            <div className="visit-info">
              <span className="visit-number">#{index + 1}</span>  {/* ✅ Changed this */}
              <span className="visit-flag">{visit.flagEmoji}</span>
              <span className="visit-location">{visit.location}</span>
            </div>
            <div className="visit-datetime">
              <span className="visit-date">📅 {visit.date}</span>
              <span className="visit-time">🕐 {visit.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</fieldset>

      {/* Sign Form */}
      <fieldset>
        <legend>Sign the Guestbook</legend>
        <form onSubmit={handleSubmit} className="guestbook-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              maxLength={500}
              rows={4}
            />
            <small>{message.length}/500</small>
          </div>

          <div className="form-group">
            <label>Your Location:</label>
            <p className="location-info">{location}</p>
          </div>

          <button type="submit" className="submit-btn">
            Sign Guestbook
          </button>
        </form>
      </fieldset>

      {/* Guestbook Entries */}
      <fieldset>
        <legend>Signatures ({visitors.length})</legend>

        {loading ? (
          <p className="no-entries">Loading signatures...</p>
        ) : visitors.length === 0 ? (
          <p className="no-entries">
            No signatures yet. Be the first to sign! 
          </p>
        ) : (
          <div className="entries-list">
            {visitors.map((visitor, index) => (
              <div key={visitor.id} className="entry-card">
                <div className="entry-header">
                  <div className="entry-info">
                    <h3 className="entry-name">#{visitors.length - index}. {visitor.name}</h3>
                    <div className="entry-meta">
                      <span className="entry-date"> {visitor.date}</span>
                      <span className="entry-time"> {visitor.time}</span>
                      <span className="entry-location"> {visitor.location}</span>
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteVisitor(visitor.id)}
                    title="Delete entry"
                  >
                    ✕
                  </button>
                </div>
                <p className="entry-message">{visitor.message}</p>
              </div>
            ))}
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default Guestbook;