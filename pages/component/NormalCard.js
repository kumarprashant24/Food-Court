import React from 'react';
import Link from 'next/link';

const NormalCard = ({ id, title, description, image, bgColor }) => {
  return (
    <div
      className="card shadow-sm rounded-4 d-flex flex-column justify-content-between"
      style={{
        backgroundColor: bgColor,
        // width: '220px',
        // height: '350px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        overflow: 'hidden',
      }}
    >
      <img
        src={image}
        alt={title}
        className="card-img-top"
        style={{ height: '200px', width: '100%', objectFit: 'cover' }}
      />

      <div className="card-body d-flex flex-column flex-grow-1 p-3">
        <h5 className="card-title fw-bold mb-2 text-center">{title}</h5>
        <p className="card-text text-center mb-3" style={{ fontSize: '0.9rem' }}>
          {description}
        </p>
        <Link href={`/component/BasicDetails?id=${id}`}>
          <a
            className="btn btn-light text-dark fw-semibold mt-auto w-100"
            style={{ transition: 'all 0.3s' }}
          >
            View Details
          </a>
        </Link>
      </div>

      <style jsx>{`
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default NormalCard;