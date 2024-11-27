import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Profile() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const profile_data = async () => {
        const email = localStorage.getItem('user');
        if (email) {
            try {
                const response = await axios.get('http://127.0.0.1:8000/userdetails/', { params: { email } });
                console.log(response);
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setUserData(response.data[0]);
                } else {
                    console.warn('Expected a non-empty array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        } else {
            console.warn('No user data found in local storage');
            navigate('/login'); // Redirect to login if no user data found
        }
    };

    useEffect(() => {
        profile_data();
    }, []);

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Full Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{userData ? `${userData.f_name} ${userData.l_name}` : 'Johnatan Smith'}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{userData ? userData.email : 'example@example.com'}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Phone</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{userData ? userData.Phone_number : '(097) 234-5678'}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Branch</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{userData ? userData.branch : '(098) 765-4321'}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Position</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{userData ? userData.position : 'Bay Area, San Francisco, CA'}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Address</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{userData ? userData.address : 'Bay Area, San Francisco, CA'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
