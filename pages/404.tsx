import Navbar from '../components/common/Navbar/Navbar';
import { FooterCallToAction } from '../components/common/CallToAction/FooterCallToAction';
import Footer from '../components/common/Footer/Footer';
import React from 'react';

export default function Highlight404() {
  return (
    <>
      <Navbar />
      <main>
        <div className="m-36 gap-4 max-w-max mx-auto">
          <div className="flex items-center flex-col gap-4">
            <h3>Sorry, we could not find the page you are looking for. </h3>
          </div>
        </div>
        <FooterCallToAction />
      </main>
      <Footer />
    </>
  );
}
