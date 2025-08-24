import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { db } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';

function Home() {
  const [mission, setMission] = useState('');

  // Fetch mission statement from Firestore
//   useEffect(() => {
//     const fetchData = async () => {
//       const docRef = doc(db, 'content', 'home');
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setMission(docSnap.data().mission);
//       } else {
//         setMission('Welcome to MFNB Lab!');
//       }
//     };
//     fetchData();
//   }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero text-center text-white py-5" style={{ background: '#1a2b5e' }}>
        <Container>
          <h1 className="display-4">Welcome to MFNB Lab</h1>
          <p className="lead">
            Advancing flexible electronics and human augmentation through nanotechnology
          </p>
        </Container>
      </section>

      {/* Mission Section */}
      <Container className="py-5">
        <Row>
          <Col>
            <h2 className="mb-4">Our Mission</h2>
            <p>{mission}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;