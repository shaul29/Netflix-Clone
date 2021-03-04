import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { auth } from '../../firebase';
import Nav from '../../components/navBar/nav.component';
import './profileScreen.styles.css';
import PlanScreen from '../../components/planScreen/planScreen.component';

const ProfileScreen = () => {
    const user = useSelector(selectUser);
    console.log(user);
    return (
        <div className="profileScreen">
            <Nav />

            <div className="profileScreen__body">
                <h1>Edit Profile</h1>

                <div className="profileScreen__info">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="netflix-avatar"/>

                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>

                        <div className="profileScreen__plans">
                            <h3>Plans</h3>
                            <PlanScreen />
                            
                            <button className="profileScreen__signOut" onClick={() => auth.signOut()}>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen