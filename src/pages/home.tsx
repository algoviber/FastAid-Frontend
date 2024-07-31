import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBar';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../types/reducer-types';

const HomePage = () => {
    const [news, setNews] = useState<any>([]);
    const [blogs, setBlogs] = useState<any>([]);
    const [requestInfo, setRequestInfo] = useState({name:'',email:'',message:''});

    const {user} = useSelector((state:{userReducer: UserReducerInitialState})=> state.userReducer);

    useEffect(() => {
        // Fetch News
        axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=18bebc7ee29a47fbbde5e1cfbca2cb0d')
            .then(response => setNews(response.data.articles))
            .catch(error => console.error('Error fetching news:', error));

        // Fetch Blogs
        axios.get('https://dev.to/api/articles?per_page=3')
            .then(response => setBlogs(response.data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRequestInfo({ ...requestInfo, [name]: value });
    };

    const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/request/message?_id=${user?._id}`,{
            requestInfo
        });

        if("data" in res){
            toast.success("Your Message Sent Successfull");
        }
        console.log('Form Submitted:', requestInfo);
        }
        catch(error){
            toast.error("Something Went Wrong");
        }
        // Handle form submission logic here
    };

    return (
    <>
      <div className="admin-container">
        <Sidebar />
      </div>
        <div className="container">
            {/* Hero Section */}
            <header className="hero">
                <h1>Welcome to FastAid</h1>
                <p>Connecting Donors, Volunteers, and Those in Need</p>
            </header>

            {/* Introduction */}
            <section className="introduction">
                <h2>About Us</h2>
                <p>We are dedicated to connecting blood donors with those in need, and providing a platform for community support and assistance.</p>
            </section>

            {/* Key Features */}
            <section className="features">
                <h2>Key Features</h2>
                <ul>
                    <li><a href="/request/blood">Find a Donor</a></li>
                    <li><a href="/register/helper">Volunteer Opportunities</a></li>
                    <li><a href="/request/help">Request Help</a></li>
                </ul>
            </section>

            {/* Helpline Numbers */}
            <section className="helplines">
                <h2>Helpline Numbers</h2>
                <ul>
                    <li>Emergency: 911</li>
                    <li>Blood Donation Helpline: 1-800-BLOOD</li>
                    <li>Community Support: 1-800-HELP</li>
                </ul>
            </section>

            {/* Latest News and Updates */}
            <section className="news-updates">
                <h2>Latest News and Updates</h2>
                <div className="news-container">
                    {news.map((article: { url: React.Key | null | undefined; urlToImage: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }) => (
                        article.urlToImage && (
                        <div className="news-item" key={article.url}>
                            <img src={article.urlToImage} alt={String(article.title)} />
                            <h3>{article.title}</h3>
                            <a href={String(article.url)} target="_blank" rel="noopener noreferrer">Read More</a>
                        </div>
                        )
                    ))}
                </div>
            </section>

            {/* Resources */}
            <section className="resources">
                <h2>Top Blogs</h2>
                <div className="blogs-container">
                    {blogs.map((blog: { url: React.Key | null | undefined; social_image: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; }) => (
                        <div className="blog-item" key={blog.url}>
                            <img src={blog.social_image} alt={String(blog.title)} />
                            <h3>{blog.title}</h3>
                            <a href={String(blog.url)} target="_blank" rel="noopener noreferrer">Read More</a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Events Calendar */}
            <section className="events-calendar">
                <h2>Upcoming Events</h2>
                <p>Check out our events calendar for blood drives and community events.</p>
                <ol>
                    <li>Blood Drive on August 15th</li>
                    <li>Community Support Meeting on September 10th</li>
                </ol>
            </section>

            {/* Contact Information */}
            <section className="contact">
                <h2>Contact Us</h2>
                <p>Have questions or want to help? Reach out to us!</p>
                <form onSubmit={(e)=>submitHandler(e)}>
                    <label>
                        Name:
                        <input type="text" name="name" onChange={changeHandler} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" onChange={changeHandler}/>
                    </label>
                    <label>
                        Message:
                        <textarea name="message" onChange={(e)=>changeHandler(e)}></textarea>
                    </label>
                    <button type="submit">Send</button>
                </form>
                <div className="social-media">
                    <a href="https://facebook.com/helphub" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com/helphub" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://instagram.com/helphub" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
            </section>

            {/* Donate and Support */}
            <footer className="donate-support">
                <h2>Support Our Mission</h2>
                <p>Learn how you can donate to help us continue our work.</p>
                <button>Donate Now</button>
            </footer>
        </div>
    </>
    );
};

export default HomePage;
