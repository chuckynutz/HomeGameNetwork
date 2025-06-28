'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Shield, Users, Trophy, Star, MapPin, Clock, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

// FAQ Data
const faqData = [
  {
    question:"whats for lunch",
    answer:"nothing"
  },
  {
    question: "What is The Home Game Network?",
    answer: "The Home Game Network is a platform that connects poker enthusiasts, making it easy to find and host home poker games in your local area. We provide a safe, secure environment for players to discover games, track their performance, and build a community of poker lovers."
  },
  {
    question: "How do I join a game?",
    answer: "Simply browse available games in your area, click on one that interests you, and request to join. Game hosts will review your profile and can approve or decline your request. Once approved, you'll receive all the details about the game location and time."
  },
  {
    question: "Is it safe to play with strangers?",
    answer: "We take safety seriously. All users go through a verification process, and we have a rating system where players can review each other after games. Additionally, we provide tools for hosts to screen potential players and maintain control over their games."
  },
  {
    question: "How much does it cost to use the platform?",
    answer: "The Home Game Network is free to use for finding and joining games. We offer premium features for hosts and serious players, including advanced analytics, priority listings, and enhanced profile features."
  },
  {
    question: "Can I host my own games?",
    answer: "Absolutely! Anyone can host games on our platform. Simply create a game listing with details like location, buy-in amount, max players, and game format. You'll have full control over who joins your games."
  },
  {
    question: "What types of poker games are supported?",
    answer: "We support all popular poker variants including Texas Hold'em, Omaha, Seven Card Stud, and more. Hosts can specify the game type, stakes, and format when creating their listings."
  }
];

// Testimonials Data
const testimonialsData = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Austin, TX",
    rating: 5,
    text: "I've met some of my best friends through this platform. The verification system gives me peace of mind, and I've never had a bad experience."
  },
  {
    id: 2,
    name: "Mike R.",
    location: "Denver, CO",
    rating: 5,
    text: "As a host, I love how easy it is to manage my games. The platform handles all the logistics so I can focus on providing a great experience."
  },
  {
    id: 3,
    name: "David L.",
    location: "Seattle, WA",
    rating: 5,
    text: "Finally found a reliable way to play poker with real people! The community is amazing and everyone I've met has been super friendly."
  },
  {
    id: 4,
    name: "Jennifer K.",
    location: "Miami, FL",
    rating: 5,
    text: "The safety features are incredible. I feel completely comfortable playing with new people, and the rating system really works."
  },
  {
    id: 5,
    name: "Carlos M.",
    location: "Phoenix, AZ",
    rating: 5,
    text: "Been hosting weekly games for 6 months now. The platform makes it so easy to find players and keep everything organized."
  },
  {
    id: 6,
    name: "Emma T.",
    location: "Portland, OR",
    rating: 5,
    text: "As a beginner, I was nervous about joining games, but everyone has been so welcoming. The skill level indicators are really helpful."
  },
  {
    id: 7,
    name: "James W.",
    location: "Nashville, TN",
    rating: 5,
    text: "The tracking features are game-changing. I can see my progress over time and it's motivated me to improve my skills."
  },
  {
    id: 8,
    name: "Lisa P.",
    location: "San Diego, CA",
    rating: 5,
    text: "Love the variety of games available. From casual $5 games to serious tournaments, there's something for every player."
  },
  {
    id: 9,
    name: "Robert H.",
    location: "Chicago, IL",
    rating: 5,
    text: "The mobile app is fantastic. I can browse games, join, and get notifications all from my phone. Super convenient!"
  },
  {
    id: 10,
    name: "Amanda F.",
    location: "Boston, MA",
    rating: 5,
    text: "Found my regular poker group through this platform. We've been playing together for over a year now. It's like having a second family!"
  }
];

export default function HomePage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#4B9CD3] to-transparent rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#7BB3E6] to-transparent rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-3xl p-8 mb-8 shadow-2xl shadow-[#4B9CD3]/20 backdrop-blur-sm">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] bg-clip-text text-transparent">
              The Home Game Network
            </h1>
            <p className="text-xl md:text-2xl text-[#A0A0A0] mb-8 leading-relaxed">
              Connect with poker enthusiasts in your area. Find games, host tournaments, and build lasting friendships through the game we all love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] hover:from-[#3A8BC2] hover:to-[#6AA2D5] text-black px-8 py-4 rounded-2xl text-lg font-bold transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#4B9CD3]/30 hover:shadow-xl hover:shadow-[#4B9CD3]/40 transform hover:scale-105"
                onClick={() => router.push('/signup')}
              >
                Get Started
                <ChevronRight size={20} />
              </button>
              <button 
                className="border-2 border-[#4B9CD3] text-[#4B9CD3] hover:bg-[#4B9CD3] hover:text-black px-8 py-4 rounded-2xl text-lg font-bold transition duration-300 shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transform hover:scale-105"
                onClick={() => router.push('/games')}
              >
                Browse Games
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 text-center shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-[#4B9CD3] mb-2">10,000+</div>
              <div className="text-[#A0A0A0]">Active Players</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 text-center shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-[#4B9CD3] mb-2">500+</div>
              <div className="text-[#A0A0A0]">Games Hosted</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 text-center shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-[#4B9CD3] mb-2">50+</div>
              <div className="text-[#A0A0A0]">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-3xl p-8 text-center shadow-2xl shadow-[#4B9CD3]/20 backdrop-blur-sm">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] bg-clip-text text-transparent">Our Mission</h2>
            <p className="text-xl text-[#A0A0A0] leading-relaxed mb-8">
              We believe that poker is more than just a game—it's a social experience that brings people together. 
              Our mission is to create a safe, welcoming platform where poker enthusiasts can find games, make friends, 
              and enjoy the camaraderie that makes home games special.
            </p>
            <p className="text-lg text-[#A0A0A0] leading-relaxed">
              Whether you're a seasoned pro or just learning the ropes, The Home Game Network is your gateway 
              to the vibrant poker community in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] bg-clip-text text-transparent">Why Choose The Home Game Network?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 text-center shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-[#4B9CD3] to-[#7BB3E6] rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition duration-300">
                <Shield size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#4B9CD3]">Safe & Secure</h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                All players are verified and rated. Our community guidelines ensure a safe environment for everyone.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 text-center shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-[#4B9CD3] to-[#7BB3E6] rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition duration-300">
                <Users size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#4B9CD3]">Community First</h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                Build lasting friendships with fellow poker enthusiasts. Our platform fosters a welcoming community.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 text-center shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-[#4B9CD3] to-[#7BB3E6] rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition duration-300">
                <Trophy size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#4B9CD3]">Track Progress</h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                Monitor your performance, track winnings, and improve your game with detailed statistics.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 text-center shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-[#4B9CD3] to-[#7BB3E6] rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition duration-300">
                <MapPin size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#4B9CD3]">Local Games</h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                Find games in your neighborhood. No more driving across town for a good game.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 text-center shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-[#4B9CD3] to-[#7BB3E6] rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition duration-300">
                <Clock size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#4B9CD3]">Flexible Scheduling</h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                Games available any day of the week. Find something that fits your schedule.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 text-center shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-[#4B9CD3] to-[#7BB3E6] rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition duration-300">
                <DollarSign size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#4B9CD3]">All Stakes Welcome</h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                From friendly $5 games to serious tournaments. Find the stakes that work for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] bg-clip-text text-transparent">What Our Community Says</h2>
          
          {/* Sliding Testimonials */}
          <div className="relative">
            {/* First row of testimonials */}
            <div className="flex animate-scroll-left mb-8">
              {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className="flex-shrink-0 w-80 mx-4">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#A0A0A0] mb-4 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="font-semibold text-[#4B9CD3]">- {testimonial.name}, {testimonial.location}</div>
                  </div>
                </div>
              ))}
              {/* Duplicate testimonials for seamless loop */}
              {testimonialsData.map((testimonial) => (
                <div key={`duplicate-${testimonial.id}`} className="flex-shrink-0 w-80 mx-4">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#A0A0A0] mb-4 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="font-semibold text-[#4B9CD3]">- {testimonial.name}, {testimonial.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] bg-clip-text text-transparent">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl overflow-hidden shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300">
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-800 transition duration-300"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-semibold text-[#4B9CD3]">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp size={24} className="text-[#4B9CD3]" />
                  ) : (
                    <ChevronDown size={24} className="text-[#4B9CD3]" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-[#A0A0A0] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] rounded-3xl p-8 text-center shadow-2xl shadow-[#4B9CD3]/30">
            <h2 className="text-4xl font-bold mb-6 text-black">Ready to Join the Community?</h2>
            <p className="text-xl mb-8 text-black opacity-90">
              Start finding games in your area today and become part of the fastest-growing poker community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-800 transition duration-300 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 transform hover:scale-105"
                onClick={() => router.push('/signup')}
              >
                Create Account
              </button>
              <button 
                className="border-2 border-black text-black px-8 py-4 rounded-2xl text-lg font-bold hover:bg-black hover:text-white transition duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transform hover:scale-105"
                onClick={() => router.push('/games')}
              >
                Browse Games
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-br from-black to-gray-900 border-t border-[#4B9CD3] relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#4B9CD3]">The Home Game Network</h3>
              <p className="text-[#A0A0A0] leading-relaxed">
                Connecting poker enthusiasts and building communities through the game we all love.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-[#4B9CD3]">Platform</h4>
              <ul className="space-y-2 text-[#A0A0A0]">
                <li><button onClick={() => router.push('/games')} className="hover:text-[#4B9CD3] transition duration-300">Find Games</button></li>
                <li><button onClick={() => router.push('/host')} className="hover:text-[#4B9CD3] transition duration-300">Host Games</button></li>
                <li><button onClick={() => router.push('/profile')} className="hover:text-[#4B9CD3] transition duration-300">Profile</button></li>
                <li><button onClick={() => router.push('/shop')} className="hover:text-[#4B9CD3] transition duration-300">Shop</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-[#4B9CD3]">Support</h4>
              <ul className="space-y-2 text-[#A0A0A0]">
                <li><button className="hover:text-[#4B9CD3] transition duration-300">Help Center</button></li>
                <li><button className="hover:text-[#4B9CD3] transition duration-300">Contact Us</button></li>
                <li><button className="hover:text-[#4B9CD3] transition duration-300">Safety Guidelines</button></li>
                <li><button className="hover:text-[#4B9CD3] transition duration-300">Community Rules</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-[#4B9CD3]">Legal</h4>
              <ul className="space-y-2 text-[#A0A0A0]">
                <li><button className="hover:text-[#4B9CD3] transition duration-300">Terms of Service</button></li>
                <li><button className="hover:text-[#4B9CD3] transition duration-300">Privacy Policy</button></li>
                <li><button className="hover:text-[#4B9CD3] transition duration-300">Cookie Policy</button></li>
                <li><button className="hover:text-[#4B9CD3] transition duration-300">Responsible Gaming</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#4B9CD3] mt-8 pt-8 text-center text-[#A0A0A0]">
            <p>&copy; 2024 The Home Game Network. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
