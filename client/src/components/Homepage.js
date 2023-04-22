import React from "react";

import styled from "styled-components";

const Homepage = () => {
  return (
    <>
      <HomePageWrapper>
        <div className="homepageTextContainer">
          <h1>Welcomt to EDME!</h1>
          <p>
            Welcome to EdMe, your go-to online resource for at-home schooling.
            As a parent, you want nothing but the best for your child, and we're
            here to help you provide just that. With our expertly curated
            collection of teaching materials, lesson plans, and educational
            games, you can confidently guide your child's education from the
            comfort of your own home.
          </p>

          <p>
            Whether you're a seasoned homeschooler or just getting started, EdMe
            has everything you need to create a customized curriculum tailored
            to your child's learning style and abilities. Our easy-to-navigate
            platform offers a wide variety of subjects, from math and science to
            art and music, so you can help your child explore their interests
            and expand their knowledge.
          </p>

          <p>
            Join the EdMe community today and discover how easy and rewarding
            at-home schooling can be. With our comprehensive resources and
            supportive community of like-minded parents, you can provide your
            child with a top-notch education that will prepare them for a
            successful future.
          </p>
        </div>
      </HomePageWrapper>
    </>
  );
};

const HomePageWrapper = styled.div`
  margin-bottom: 15vh;
`;

export default Homepage;
