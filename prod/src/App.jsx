import React from 'react';
import './App.css';

export default function App() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="w-full h-32">
        <img className="object-cover w-full h-full" src="https://source.unsplash.com/random/200x200?sig=1" alt="Random from Unsplash" />
      </div>
      <div className="w-full h-64">
        <img className="object-cover w-full h-full" src="https://source.unsplash.com/random/200x200?sig=2" alt="Random from Unsplash" />
      </div>
      <div className="w-full h-48">
        <img className="object-cover w-full h-full" src="https://source.unsplash.com/random/200x200?sig=3" alt="Random from Unsplash" />
      </div>
      <div className="col-span-2 w-full h-32">
        <img className="object-cover w-full h-full" src="https://source.unsplash.com/random/200x200?sig=4" alt="Random from Unsplash" />
      </div>
      <div className="w-full h-64">
        <img className="object-cover w-full h-full" src="https://source.unsplash.com/random/200x200?sig=5" alt="Random from Unsplash" />
      </div>
      <div className="w-full h-48">
        <img className="object-cover w-full h-full" src="https://source.unsplash.com/random/200x200?sig=6" alt="Random from Unsplash" />
      </div>
      <div className="col-span-2 w-full h-32">
        <img className="object-cover w-full h-full" src="https://source.unsplash.com/random/200x200?sig=7" alt="Random from Unsplash" />
      </div>
    </div>
  );
}