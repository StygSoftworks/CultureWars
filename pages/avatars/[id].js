import Layout from '../../components/Layout';
import React from 'react';
//parse the incoming request


const fetchAvatarData = async (id) => {
    try {
        // Get all the avatars from the public/json/avatars.json file
        const avatars = require('../../public/json/avatars.json');

        // Filter the avatars based on the id
        const filteredAvatars = avatars.filter((avatar) => avatar.id === parseInt(id));

        if (filteredAvatars.length > 0) {
            // Return the first item in the filtered list
            return filteredAvatars[0];
        } else {
            throw new Error(`Avatar with id ${id} not found`);
        }
    } catch (error) {
        // Handle any errors, and return an error object
        return { error: error.message };
    }
};


const AvatarDetail = ({ avatarData, error }) => {

    if (error) {
        console.error(error);
        return <div>{error}</div>;
    }

    if (!avatarData) {
        return <div>Loading...</div>;
    }

    // Render your avatar details here
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* <img className="w-full" src={avatarData.image} alt={avatarData.name} /> */}
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{avatarData.name}</div>
                    <p className="text-gray-700 text-base">
                        {avatarData.description}
                    </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{avatarData.advantage}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{avatarData.disadvantage}</span>
                </div>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {

    //get the id from the context
    const { id } = context.query;

    //fetch the avatar data
    const avatarData = await fetchAvatarData(id);

    //return the avatar data as props
    return {
        props: {
            avatarData
        }
    };
}

export default AvatarDetail;
