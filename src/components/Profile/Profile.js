import React from 'react'

const Profile = props => {
    return (
        <>
        {!props.isEditingUser &&
            <div className='profile'>
                <div className='profile-header'>
                    <h2 className='trips-title'>{props.user.name}</h2>
                    <h4>{props.user.age} years old,</h4>
                    <h4>{props.user.title}</h4>
                    <button onClick={props.toggleEditUser}>Edit User</button>
                </div>
                <h4>{props.user.careerLength} as a private and professional guide</h4>
                <p>{props.user.tagline}</p>
            </div>
        }
        {props.isEditingUser &&
            <div className='editing-user'>
                <form onSubmit={(e) => props.handleEditUserSubmit(e, props.user)} className='edit-user-form'>
                    <label htmlFor='name'>Name</label>
                    <input 
                        onChange={props.handleEditUserChanges} 
                        type='text' 
                        name='name' 
                        value={props.user.name} 
                    />
                    <label htmlFor='age'>Age</label>
                    <input 
                        onChange={props.handleEditUserChanges} 
                        type='number' 
                        name='age' 
                        value={props.user.age} 
                    />
                    <label htmlFor='title'>Title</label>
                    <input 
                        onChange={props.handleEditUserChanges}  
                        type='text' 
                        name='title' 
                        value={props.user.title} 
                    />
                    <label htmlFor='careerLength'>Career Length</label>
                    <input 
                        onChange={props.handleEditUserChanges} 
                        type='text' 
                        name='careerLength' 
                        value={props.user.careerLength} 
                    />
                    <label htmlFor='tagline'>Tagline</label>
                    <textarea 
                        onChange={props.handleEditUserChanges} 
                        name='tagline' 
                        value={props.user.tagline} 
                    />
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        }
        </>
    );
}

export default Profile;