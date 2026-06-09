const MembershipPlan = require('../models/MembershipPlan');
const Trainer = require('../models/Trainer');
const Testimonial = require('../models/Testimonial');
const Admin = require('../models/Admin');

const seedPlans = [
  {
    title: 'Basic', price: 29, duration: 'month',
    features: ['Gym Access (6am-8pm)', 'Locker Room Access', 'Basic Equipment', '1 Free Trainer Session', 'Locker Rental'],
    isPopular: false
  },
  {
    title: 'Pro', price: 59, duration: 'month', isPopular: true,
    features: ['Gym Access (All Hours)', 'Locker Room Access', 'Basic Equipment', 'Unlimited Group Classes', '2 Personal Trainer Sessions/Month', 'Custom Nutrition Plan', 'Progress Tracking App', '2 Guest Passes/Month']
  },
  {
    title: 'Elite', price: 99, duration: 'month',
    features: ['Gym Access (All Hours)', 'Locker Room Access', 'Basic Equipment', 'Unlimited Group Classes', 'Unlimited PT Sessions', 'Custom Nutrition Plan', 'Progress Tracking App', 'Yoga & Wellness Program', 'Recovery Zone Access', 'Priority Class Booking', '4 Guest Passes/Month', 'Protein Bar Discount']
  }
];

const seedTrainers = [
  {
    name: 'John Smith', specialization: 'Strength & Conditioning', experience: 8,
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop&crop=face',
    bio: 'John is a certified strength and conditioning specialist with a passion for helping athletes reach their peak performance.'
  },
  {
    name: 'Sarah Johnson', specialization: 'Yoga & Flexibility', experience: 6,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop&crop=face',
    bio: 'Sarah brings peace and strength together. Her yoga sessions are designed to improve flexibility, balance, and mental clarity.'
  },
  {
    name: 'Mike Williams', specialization: 'Bodybuilding', experience: 10,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=400&fit=crop&crop=face',
    bio: 'With a decade of bodybuilding experience, Mike knows exactly how to sculpt and transform physiques.'
  },
  {
    name: 'Emily Davis', specialization: 'HIIT & Cardio', experience: 5,
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face',
    bio: 'Emily high-energy HIIT classes are legendary. She will push you beyond your limits and make you love every minute.'
  }
];

const seedTestimonials = [
  { name: 'Alex Johnson', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', review: 'Titan Fitness completely transformed my life. The trainers are incredibly knowledgeable and the community is so supportive. I have never been stronger or more confident.', rating: 5 },
  { name: 'Maria Garcia', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', review: 'The best gym I have ever been to. The equipment is top-notch and the group classes are amazing. I look forward to every workout!', rating: 5 },
  { name: 'David Chen', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', review: 'After trying many gyms, Titan is by far the best. The personalized training programs helped me achieve results I never thought possible.', rating: 5 },
  { name: 'Sophie Turner', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', review: 'The yoga and wellness programs are incredible. I have found a new sense of balance and strength that goes beyond just physical fitness.', rating: 5 },
  { name: 'James Wilson', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', review: 'As a beginner, I was nervous about joining a gym. The staff made me feel welcome from day one. The personal training sessions are worth every penny.', rating: 4 }
];

const seedData = async () => {
  try {
    const planCount = await MembershipPlan.countDocuments();
    if (planCount === 0) {
      await MembershipPlan.insertMany(seedPlans);
      console.log('Seeded membership plans');
    }

    const trainerCount = await Trainer.countDocuments();
    if (trainerCount === 0) {
      await Trainer.insertMany(seedTrainers);
      console.log('Seeded trainers');
    }

    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany(seedTestimonials);
      console.log('Seeded testimonials');
    }
  } catch (error) {
    console.warn('Seed data error:', error.message);
  }
};

module.exports = seedData;
