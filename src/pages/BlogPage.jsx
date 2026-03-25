import React, { useEffect, useRef, useState } from 'react';
import { Calendar, User, Clock, Search, ArrowRight } from 'lucide-react';
import Footer from '@/components/mekinComponents/Footer';

// Example blog data structure - Replace with API fetch
export const BLOG_DATA = [
  {
    id: 1,
    title:
      'Essential Guide to Post-Natal Care in Nairobi: What Every New Mother Needs',
    slug: 'post-natal-care-guide-nairobi',
    excerpt:
      'Comprehensive guide to post-natal care services in Nairobi. Learn about recovery, baby care, and support available for new mothers across Kenya.',
    content: 'Full article content here...',
    author: 'Dr. Sarah Wanjiku',
    authorRole: 'Medical Director',
    date: '2026-01-10',
    readTime: '8 min read',
    category: 'Post-Natal Care',
    image:
      'https://images.unsplash.com/photo-1509099342178-e323b1717dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbW90aGVyJTIwbmV3Ym9ybiUyMGJhYnl8ZW58MXx8fHwxNzY4NTc1OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: [
      'post-natal care',
      'new mothers',
      'Nairobi',
      'baby care',
      'maternal health',
    ],
    featured: true,
    metaDescription:
      'Complete guide to post-natal care services in Nairobi. Expert advice on recovery, breastfeeding, and professional home care support for new mothers in Kenya.',
  },
  {
    id: 2,
    title:
      'Understanding Elderly Care Options in Nairobi: Home vs Facility Care',
    slug: 'elderly-care-options-nairobi',
    excerpt:
      'Explore the benefits of professional home care for elderly loved ones in Nairobi. Compare options and find the best care solution for your family.',
    content: 'Full article content here...',
    author: 'James Omondi',
    authorRole: 'Head of Nursing',
    date: '2026-01-08',
    readTime: '6 min read',
    category: 'Elderly Care',
    image:
      'https://images.unsplash.com/photo-1708461859488-2a0c081ff826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMGhlbHBpbmclMjBlbGRlcmx5JTIwcGF0aWVudHxlbnwxfHx8fDE3Njg1NzU5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['elderly care', 'senior care', 'Nairobi', 'home care', 'aging'],
    featured: true,
    metaDescription:
      'Compare elderly care options in Nairobi. Learn why home care is often the best choice for seniors in Kenya with expert insights from professional caregivers.',
  },
  {
    id: 3,
    title: '10 Signs Your Loved One Needs Home Care Support in Nairobi',
    slug: 'signs-need-home-care-nairobi',
    excerpt:
      "Recognizing when it's time to seek professional home care services. Key indicators that your family member needs additional support at home.",
    content: 'Full article content here...',
    author: 'Grace Muthoni',
    authorRole: 'Senior Physiotherapist',
    date: '2026-01-05',
    readTime: '5 min read',
    category: 'Home Care Tips',
    image:
      'https://images.unsplash.com/photo-1616291446004-b89a8453561c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbnVyc2UlMjBjYXJlZ2l2ZXIlMjBwYXRpZW50fGVufDF8fHx8MTc2ODU3NTkwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: [
      'home care',
      'family care',
      'caregiving',
      'health assessment',
      'Nairobi',
    ],
    featured: true,
    metaDescription:
      'Learn the 10 key signs that indicate your loved one needs professional home care in Nairobi. Expert guidance from Mekin Home Care specialists.',
  },
  {
    id: 4,
    title: 'Benefits of Physiotherapy at Home for Nairobi Residents',
    slug: 'physiotherapy-at-home-nairobi',
    excerpt:
      'Discover how at-home physiotherapy can accelerate recovery and improve mobility. Professional rehabilitation services delivered to your doorstep in Nairobi.',
    content: 'Full article content here...',
    author: 'Grace Muthoni',
    authorRole: 'Senior Physiotherapist',
    date: '2026-01-03',
    readTime: '7 min read',
    category: 'Physiotherapy',
    image:
      'https://images.unsplash.com/photo-1768508236664-3f294aaf7d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHlzaW90aGVyYXB5JTIwdHJlYXRtZW50JTIwc2Vzc2lvbnxlbnwxfHx8fDE3Njg1NTY3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: [
      'physiotherapy',
      'rehabilitation',
      'home therapy',
      'Nairobi',
      'mobility',
    ],
    featured: false,
    metaDescription:
      'Explore the benefits of professional physiotherapy at home in Nairobi. Expert therapists provide personalized rehabilitation and mobility support.',
  },
  {
    id: 5,
    title: 'Managing Chronic Diseases at Home: A Guide for Nairobi Families',
    slug: 'chronic-disease-management-nairobi',
    excerpt:
      'Expert tips for managing diabetes, hypertension, and other chronic conditions at home. Professional care strategies for better health outcomes in Kenya.',
    content: 'Full article content here...',
    author: 'Dr. Sarah Wanjiku',
    authorRole: 'Medical Director',
    date: '2025-12-28',
    readTime: '10 min read',
    category: 'Chronic Disease',
    image:
      'https://images.unsplash.com/photo-1654027678170-2f16d4e87787?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZW55YW4lMjBoZWFsdGhjYXJlJTIwd29ya2VyJTIwZWxkZXJseXxlbnwxfHx8fDE3Njg1NzU5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: [
      'chronic disease',
      'diabetes',
      'hypertension',
      'home care',
      'Nairobi',
      'disease management',
    ],
    featured: false,
    metaDescription:
      'Complete guide to managing chronic diseases at home in Nairobi. Professional healthcare support for diabetes, hypertension, and long-term conditions in Kenya.',
  },
];

function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  // Extract unique categories
  const categories = [
    'All',
    ...new Set(BLOG_DATA.map((post) => post.category)),
  ];

  // Filter blog posts
  const filteredPosts = BLOG_DATA.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className=' text-gray-950 py-4'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-2xl md:text-3xl font-bold mb-2 '>
              Healthcare Insights & Tips
            </h1>
            <p className='text-lg text-gray-950 max-w-2xl mx-auto mb-4'>
              Expert advice on home care, elderly support, and health management
              for Nairobi families
            </p>

            {/* Search Bar */}
            <div className='max-w-2xl mx-auto'>
              <div className='relative'>
                <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                <input
                  type='text'
                  placeholder='Search blogs, tips, and guides...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-12 pr-4 py-1 rounded-[0.3em] outline-1 outline-gray-400 text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className='border-b   bg-white flex flex-col items-center  top-14 z-10  border-gray-300 shadow-sm'>
        <div className='grid grid-cols-2 bsm:grid-cols-3 fmd:grid-cols-6 gap-3 p-2'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 text-fmd py-0.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className='mb-4'>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
              Featured Blogs
            </h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className='bg-white rounded-[0.5em] outline-1 outline-gray-300 overflow-hidden transition-shadow duration-300 group'
                >
                  <div className='relative h-64 overflow-hidden'>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-full h-full object-cover group-hover:scale-102 transition-transform duration-500'
                    />
                    <div className='absolute top-2 left-2'>
                      <span className='bg-blue-600 text-white px-2 py-0.5 rounded-full text-sm font-semibold'>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className='p-3'>
                    <div className='flex items-center gap-4 text-sm text-gray-500 mb-3'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        <span>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='w-4 h-4' />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className='text-fmd font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors'>
                      {post.title}
                    </h3>
                    <p className='text-gray-600 text-fsm mb-1 line-clamp-3'>
                      {post.excerpt}
                    </p>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-1'>
                        <User className='w-10 h-10 text-gray-400 bg-gray-100 p-2 rounded-full' />
                        <div>
                          <p className='font-medium text-gray-900'>
                            {post.author}
                          </p>
                          <p className='text-sm text-gray-500'>
                            {post.authorRole}
                          </p>
                        </div>
                      </div>
                      <button className='text-blue-600 font-semibold flex flex-row justify-center items-center group'>
                        <h2> Read More</h2>
                        <ArrowRight
                          size={24}
                          className=' pt-1  group-hover:translate-x-0.5 transform duration-300 ease-out'
                        />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-3'>
              {featuredPosts.length > 0 ? 'More Blogs' : 'All Blogs'}
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className='bg-white rounded-[0.5em] outline-1 outline-gray-300 overflow-hidden transition-shadow duration-300 group'
                >
                  <div className='relative h-64 overflow-hidden'>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-full h-full object-cover group-hover:scale-102 transition-transform duration-500'
                    />
                    <div className='absolute top-2 left-2'>
                      <span className='bg-blue-600 text-white px-2 py-0.5 rounded-full text-sm font-semibold'>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className='p-3'>
                    <div className='flex items-center gap-4 text-sm text-gray-500 mb-3'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        <span>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='w-4 h-4' />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className='text-fmd font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors'>
                      {post.title}
                    </h3>
                    <p className='text-gray-600 text-fsm mb-1 line-clamp-3'>
                      {post.excerpt}
                    </p>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-1'>
                        <User className='w-10 h-10 text-gray-400 bg-gray-100 p-2 rounded-full' />
                        <div>
                          <p className='font-medium text-gray-900'>
                            {post.author}
                          </p>
                          <p className='text-sm text-gray-500'>
                            {post.authorRole}
                          </p>
                        </div>
                      </div>
                      <button className='text-blue-600 font-semibold flex flex-row justify-center items-center group'>
                        <h2> Read More</h2>
                        <ArrowRight
                          size={24}
                          className=' pt-1  group-hover:translate-x-0.5 transform duration-300 ease-out'
                        />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className='text-center py-16'>
            <div className='bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Search className='w-12 h-12 text-gray-400' />
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-2'>
              No blogs found
            </h3>
            <p className='text-gray-600 mb-6'>
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className='text-gray-950 py-6'>
        <div className='max-w-4xl mx-auto px-4 flex flex-col items-center sm:px-6 lg:px-8 text-center'>
          <h2 className='text-2xl md:text-3xl font-bold mb-2'>
            Stay Updated with Healthcare Tips
          </h2>
          <p className='text-lg text-gray-950 mb-4'>
            Get the latest blogs and home care advice delivered to your inbox
          </p>
          <form className='flex flex-col  items-center sm:flex-row gap-4 max-w-md'>
            <input
              type='email'
              placeholder='Enter your email'
              required
              className='flex-1 pl-8 rounded-[0.3em] py-2 outline-1 outline-gray-300 w-60 text-gray-900 focus:outline-blue-600'
            />
            <button
              type='submit'
              className='bg-blue-700 h-10 w-32 px-3 text-gray-200 rounded-[0.3em] font-semibold'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* SEO Keywords Section (hidden but helps with SEO) */}
      <div className='sr-only'>
        Home care blog Nairobi, healthcare tips Kenya, elderly care advice
        Nairobi, post-natal care guide Kenya, physiotherapy tips Nairobi,
        chronic disease management Kenya, caregiving advice Nairobi, home
        healthcare blog Kenya, nursing care tips Nairobi, senior care insights
        Kenya, disability support guide Nairobi, health management tips Kenya
      </div>

      <Footer />
    </div>
  );
}

export default BlogPage;
