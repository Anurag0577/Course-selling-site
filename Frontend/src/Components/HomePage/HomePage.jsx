import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'
import Header from '../Header/Header'

// Programming Topics Slider Component
const ProgrammingTopicsSlider = () => {
  // Programming topics organized by category
  const frontendTopics = [
    { name: 'React' },
    { name: 'Vue.js' },
    { name: 'Angular' },
    { name: 'HTML/CSS' },
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'Next.js' },
    { name: 'Svelte' }
  ];

  const backendTopics = [
    { name: 'Node.js' },
    { name: 'Python' },
    { name: 'Java' },
    { name: 'Django' },
    { name: 'Spring Boot' },
    { name: 'Express.js' },
    { name: 'FastAPI' },
    { name: 'C#/.NET' }
  ];

  const databaseTopics = [
    { name: 'MongoDB' },
    { name: 'PostgreSQL' },
    { name: 'MySQL' },
    { name: 'Redis' },
    { name: 'GraphQL' },
    { name: 'Firebase' },
    { name: 'SQLite' },
    { name: 'Elasticsearch' }
  ];

  const TopicCard = ({ topic }) => (
    <div className="programming-topic-card">
      <span>{topic.name}</span>
    </div>
  );

  const SliderTrack = ({ topics, direction, speed }) => {
    // Duplicate topics multiple times for seamless infinite scroll
    const duplicatedTopics = [...topics, ...topics, ...topics];
    
    return (
      <div className="slider-track-container">
        <div
          className={`slider-track ${direction === 'left' ? 'scroll-left' : 'scroll-right'}`}
          style={{
            animationDuration: `${speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            width: 'fit-content'
          }}
        >
          {duplicatedTopics.map((topic, index) => (
            <TopicCard key={`${topic.name}-${index}`} topic={topic} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="programming-topics-slider">
      <div className="slider-container">
        <SliderTrack topics={frontendTopics} direction="left" speed={30} />
        <SliderTrack topics={backendTopics} direction="right" speed={25} />
        <SliderTrack topics={databaseTopics} direction="left" speed={35} />
      </div>
    </div>
  );
};

function HomePage() {
    let navigate = useNavigate();
        let [courses, setCourses] = useState([]);
    
        function viewCourse(courseId){
            navigate(`/courses/${courseId}`)
        }
    
        useEffect(() => {
            function getCourses(){
    
                try{
                    fetch('http://localhost:3000/courses', {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        setCourses(data);
                    })
                 } catch(error){
                    console.log({Error: error,
                        message: "Courses fetching failed!"
                    })
                }
                
            }
            getCourses();
        }, []
             // passing empty array as a dependency, now it will run only when dom mount, means only once.
        )

    return (
        <>
            <Header></Header>
            <div className='home-page'>
                <div className='homepage-container'>
                    <div className='intro-section'>
                        <div className='top-heading'>Learn anything, anytime, at your pace.</div>
                        <div className='top-description'>An engaging course marketplace loaded with diverse topics, interactive content, and easy progress tracking, built to empower you to explore and achieve your learning goals effortlessly.</div>
                        <div className='top-btn button' onClick={() => navigate('/courses') }>Explore Courses</div>
                    </div>
                    <div className='scrollbar-section'>
                        <ProgrammingTopicsSlider />
                    </div>
                    <div className='populerCourse-section'>
                <div className='populerCourses-heading' >Our Bestsellers</div>
                <div className='courseCardContainer'>
                   { (courses.length === 0) ? (<div> No courses available!</div>) : 
                    (courses.slice(0, 4).map((course) => {
                        return (<div className='course-card' key={course.title} >
                            <img src={course.image_link} alt="Course Thumbnail"></img>
                            <div className='course-content'>
                                <div className='courseTitle'>{course.title}</div>
                                <small className='courseDescription'>{course.description}</small>
                                <div className='price-btn'>
                                    <div className='coursePrice'>Price: ${course.price}</div>
                                            <div className='courseBuyBtn button' onClick={() => viewCourse(course._id)}>View Details</div>
                                </div>

                            </div>
                            

                            </div>)
}))
                   } 
                   
                   
                    
                </div>
            </div>

            {/* about us */}
            <div className='aboutUs-section'>
                <div className='aboutUs-heading'>About Us</div>
                <div className='aboutUs-description'>Welcome to our course selling platform, where learners and educators come together to inspire growth and unlock potential. We're passionate about making education accessible, engaging, and empowering for everyone.
For learners, we offer a vibrant marketplace filled with diverse, high-quality courses tailored to your goals. With intuitive search tools, personalized recommendations, and seamless access, you can explore new skills, advance your career, or dive into your passions—all at your own pace, from any device.
For educators, we provide a powerful, user-friendly platform to create and sell courses with ease. Our drag-and-drop builders, customizable templates, and secure payment systems let you focus on sharing your expertise while we handle the rest, helping you reach a global audience and grow your impact.
Founded with a mission to bridge knowledge and opportunity, we're here to support both learners and creators every step of the way. Join our community today and start your journey of learning or teaching!</div>
            </div>

            <div className='adminLogin_section'>
                <div className='adminLogin-heading'>Want to sell courses?</div>
                <div className='adminLoginBtn-container'>
                    <div className='adminSignupBtn' onClick={() => navigate('/admin/signup')}>
                        <h1>Register as a Tutor! 🡢 </h1>
                        <span>Become a Tutor: Start Selling Your Courses Today!</span>
                    </div>
                    <div className='adminLoginBtn'onClick={() => navigate('/admin/login')}>
                    <h1>Login to your Account 🡢</h1>
                    <span>Login to your Admin Dashboard.</span>
                    </div>
                </div>
            </div>
        </div>
                    </div>
        </>
    )
}

export default HomePage;

/* CSS for Programming Topics Slider - Add this to your HomePage.css file */
/*
.programming-topics-slider {
  background-color: black;
  min-height: 24rem;
  padding: 2rem 1rem;
}

.slider-container {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.slider-track-container {
  overflow: hidden;
  padding: 0.5rem 0;
}

.slider-track {
  display: flex;
}

.programming-topic-card {
  background-color: transparent;
  color: #d1d5db;
  border: 1px solid #374151;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  margin: 0 0.75rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
  width: fit-content;
}

.programming-topic-card:hover {
  border-color: #6b7280;
  color: #e5e7eb;
}

.programming-topic-card span {
  font-weight: normal;
  font-size: 0.875rem;
}

@keyframes scroll-left-animation {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

@keyframes scroll-right-animation {
  0% {
    transform: translateX(-33.333%);
  }
  100% {
    transform: translateX(0%);
  }
}

.scroll-left {
  animation-name: scroll-left-animation;
}

.scroll-right {
  animation-name: scroll-right-animation;
}
*/