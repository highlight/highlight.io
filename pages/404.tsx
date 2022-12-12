import Navbar from '../components/common/Navbar/Navbar';
import { FooterCallToAction } from '../components/common/CallToAction/FooterCallToAction';
import Footer from '../components/common/Footer/Footer';
import React from 'react';

export default function Highlight404() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex items-center m-36 gap-3.5 max-w-max mx-auto">
          <h1>404 - We could not find the page you are looking for. </h1>
        </div>
        <FooterCallToAction />
      </main>
      <Footer />
    </>
  );
}
