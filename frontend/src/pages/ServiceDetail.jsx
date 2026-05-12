import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BackButton from '../components/BackButton'

const ServiceDetail = () => {
  const { id } = useParams();

  return (
    <section>
      
      <BackButton />

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        
        {/* Image placeholder */}
        <div>
          [Service Image Placeholder]
        </div>

        {/* Content placeholder */}
        <div>
          <h1>Service Title for id: {id}</h1>
          <h3>$ Price</h3>
          
          <p>
            Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui beatae itaque aliquid repudiandae illo possimus molestias corporis eveniet amet autem, iste placeat dolore non libero praesentium alias dignissimos incidunt.
          </p>

          <div>
            {/* can click users name to direct them to their personal profile */}
            <Link to="/profile/placeholder-user-id">Student Name</Link>
          </div>

          <br />

          <button type="button">
            Hire
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServiceDetail;