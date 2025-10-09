
import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        <h1 className="about-title">About Our Matchmaking Portal</h1>

        <section className="about-section">
          <h2 className="about-heading">Why Marriage is Important</h2>
          <p className="about-text">
            Marriage is one of the most significant milestones in a person's life. 
            It represents a lifelong commitment, partnership, and mutual support between two individuals. 
            Beyond emotional bonding, marriage often strengthens family ties, promotes social stability, and nurtures personal growth.
            It provides a foundation to build a loving home, raise children, and share life’s joys and challenges together.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-heading">How Our Website Finds Your Perfect Match</h2>
          <p className="about-text">
            Our matchmaking portal integrates traditional Indian astrology principles like <strong>Rashi</strong> (zodiac sign) and <strong>Nakshatra</strong> (lunar mansion) to find compatible matches.
            These astrological factors are believed to influence personality, temperament, and life paths. 
            By analyzing and matching your Rashi and Nakshatra with potential partners, we aim to provide you with highly compatible profiles, enhancing the chances of a harmonious and successful marriage.
          </p>
          <p className="about-text">
            We combine this ancient wisdom with modern technology to bring you a seamless and trustworthy matchmaking experience.
          </p>
        </section>
      </div>
    </div>
  );
}
